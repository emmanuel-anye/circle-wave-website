import { randomUUID } from "node:crypto";
import { z } from "zod";
import {
  createPrivateResumePath,
  getResumeExtension,
  validateResumeFile,
} from "@/lib/resume-upload";

const optional = (max: number) =>
  z.string().trim().max(max).optional().default("");

export const applicationFieldsSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  phone: optional(40),
  location: optional(160),
  availability: z.string().trim().min(2).max(120),
  experience_level: z.string().trim().min(2).max(120),
  languages: optional(500),
  technical_skills: optional(2000),
  cover_letter: optional(8000),
  job_id: z.uuid(),
  submission_token: z.uuid(),
  website: optional(200),
});

export type ApplicationFields = z.infer<typeof applicationFieldsSchema>;
export type ApplicationRecord = Omit<ApplicationFields, "website"> & {
  application_reference: string;
  job_title_snapshot: string;
  resume_path: string;
};

type OpenJob = {
  id: string;
  title: string;
  status?: string | null;
  application_deadline?: string | null;
};

type SubmissionDependencies = {
  getJob: (id: string) => Promise<OpenJob | null>;
  findExisting: (
    submissionToken: string,
    jobId: string
  ) => Promise<{ application_reference: string } | null>;
  upload: (
    path: string,
    file: File
  ) => Promise<{ error: { message?: string } | null }>;
  insert: (
    payload: ApplicationRecord
  ) => Promise<{ error: { message?: string } | null }>;
  remove: (path: string) => Promise<void>;
  notify: (payload: ApplicationRecord) => Promise<void>;
  now?: () => Date;
  randomId?: () => string;
};

export function createApplicationReference(
  now = new Date(),
  id: string = randomUUID()
) {
  const date = [
    now.getUTCFullYear(),
    String(now.getUTCMonth() + 1).padStart(2, "0"),
    String(now.getUTCDate()).padStart(2, "0"),
  ].join("");
  const suffix = id.replaceAll("-", "").slice(0, 12).toUpperCase();
  return `CW-${date}-${suffix}`;
}

export type ApplicationSubmissionResult =
  | {
      ok: true;
      status: 200;
      body: { ok: true; reference: string };
    }
  | {
      ok: false;
      status: 400 | 500;
      body: { error: string };
    };

export async function processJobApplication(
  input: unknown,
  resume: unknown,
  dependencies: SubmissionDependencies
): Promise<ApplicationSubmissionResult> {
  const parsed = applicationFieldsSchema.safeParse(input);
  const resumeError = validateResumeFile(resume);

  if (
    !parsed.success ||
    parsed.data.website.trim().length > 0 ||
    resumeError ||
    !(resume instanceof File)
  ) {
    return {
      ok: false,
      status: 400,
      body: {
        error: resumeError ?? "Please check the submitted information.",
      },
    };
  }

  const existing = await dependencies.findExisting(
    parsed.data.submission_token,
    parsed.data.job_id
  );
  if (existing?.application_reference) {
    return {
      ok: true,
      status: 200,
      body: { ok: true, reference: existing.application_reference },
    };
  }

  const job = await dependencies.getJob(parsed.data.job_id);
  const today = (dependencies.now?.() ?? new Date()).toISOString().slice(0, 10);
  if (
    !job ||
    job.status !== "open" ||
    (job.application_deadline && job.application_deadline < today)
  ) {
    return {
      ok: false,
      status: 400,
      body: { error: "This job is no longer accepting applications." },
    };
  }

  const now = dependencies.now?.() ?? new Date();
  const referenceId = dependencies.randomId?.() ?? randomUUID();
  const storageId = dependencies.randomId?.() ?? randomUUID();
  const reference = createApplicationReference(now, referenceId);
  const resumePath = `${createPrivateResumePath("applications", now, storageId)}.${getResumeExtension(resume)}`;
  const upload = await dependencies.upload(resumePath, resume);

  if (upload.error) {
    return {
      ok: false,
      status: 500,
      body: { error: "Unable to upload the résumé. Please try again." },
    };
  }

  const { website, ...fields } = parsed.data;
  void website;
  const payload: ApplicationRecord = {
    ...fields,
    application_reference: reference,
    job_title_snapshot: job.title,
    resume_path: resumePath,
  };
  const insert = await dependencies.insert(payload);

  if (insert.error) {
    await dependencies.remove(resumePath).catch(() => undefined);
    const racedExisting = await dependencies
      .findExisting(parsed.data.submission_token, parsed.data.job_id)
      .catch(() => null);
    if (racedExisting?.application_reference) {
      return {
        ok: true,
        status: 200,
        body: { ok: true, reference: racedExisting.application_reference },
      };
    }
    return {
      ok: false,
      status: 500,
      body: { error: "Unable to submit the application. Please try again." },
    };
  }

  await dependencies.notify(payload).catch(() => undefined);

  return {
    ok: true,
    status: 200,
    body: { ok: true, reference },
  };
}
