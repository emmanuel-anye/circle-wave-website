import { randomUUID } from "node:crypto";
import { z } from "zod";
import {
  candidateAvailabilityOptions,
  candidateWorkPreferences,
  relocationPreferences,
} from "@/lib/talent-network-options";
import {
  createPrivateResumePath,
  getResumeExtension,
  validateResumeFile,
} from "@/lib/resume-upload";

const optional = (max: number) =>
  z.string().trim().max(max).optional().default("");

export const talentNetworkSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  phone: optional(40),
  target_roles: z.string().trim().min(2).max(1000),
  core_skills: z.string().trim().min(2).max(2000),
  location: z.string().trim().min(2).max(160),
  work_preference: z.enum(candidateWorkPreferences),
  relocation_preference: z.enum(relocationPreferences),
  work_authorization: z.string().trim().min(2).max(500),
  availability: z.enum(candidateAvailabilityOptions),
  salary_expectations: optional(300),
  consent: z.literal("true").transform(() => true),
  website: optional(200),
});

export type TalentNetworkFields = z.input<typeof talentNetworkSchema>;
export type TalentNetworkRecord = Omit<
  z.output<typeof talentNetworkSchema>,
  "website"
> & {
  registration_reference: string;
  resume_path: string;
};

type SubmissionDependencies = {
  upload: (
    path: string,
    file: File
  ) => Promise<{ error: { message?: string } | null }>;
  insert: (
    payload: TalentNetworkRecord
  ) => Promise<{ error: { message?: string } | null }>;
  remove: (path: string) => Promise<void>;
  notify: (payload: TalentNetworkRecord) => Promise<void>;
  now?: () => Date;
  randomId?: () => string;
};

export function createTalentNetworkReference(
  now = new Date(),
  id: string = randomUUID()
) {
  const year = now.getUTCFullYear();
  return `TN-${year}-${id.replaceAll("-", "").slice(0, 12).toUpperCase()}`;
}

export type TalentNetworkSubmissionResult =
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

export async function processTalentNetworkRegistration(
  input: unknown,
  resume: unknown,
  dependencies: SubmissionDependencies
): Promise<TalentNetworkSubmissionResult> {
  const parsed = talentNetworkSchema.safeParse(input);
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
        error: resumeError ?? "Please check the submitted information and consent.",
      },
    };
  }

  const now = dependencies.now?.() ?? new Date();
  const referenceId = dependencies.randomId?.() ?? randomUUID();
  const storageId = dependencies.randomId?.() ?? randomUUID();
  const reference = createTalentNetworkReference(now, referenceId);
  const resumePath = `${createPrivateResumePath("talent-network", now, storageId)}.${getResumeExtension(resume)}`;
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
  const payload: TalentNetworkRecord = {
    ...fields,
    registration_reference: reference,
    resume_path: resumePath,
  };
  const insert = await dependencies.insert(payload);

  if (insert.error) {
    await dependencies.remove(resumePath).catch(() => undefined);
    return {
      ok: false,
      status: 500,
      body: { error: "Unable to register your profile. Please try again." },
    };
  }

  await dependencies.notify(payload).catch(() => undefined);

  return {
    ok: true,
    status: 200,
    body: { ok: true, reference },
  };
}
