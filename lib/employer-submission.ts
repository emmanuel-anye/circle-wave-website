import { z } from "zod";
import {
  engagementTypes,
  headcountBands,
  hiringTimelines,
  preferredContactMethods,
  workModels,
} from "@/lib/employer-brief-options";

const optional = (max: number) =>
  z.string().trim().max(max).optional().default("");

export const employerRequestSchema = z
  .object({
    company_name: z.string().trim().min(2).max(160),
    contact_name: z.string().trim().min(2).max(120),
    email: z.email().max(254),
    phone: optional(40),
    preferred_contact_method: z.enum(preferredContactMethods),
    industry: optional(120),
    job_roles: z.string().trim().min(2).max(2000),
    headcount: z.enum(headcountBands),
    hiring_timeline: z.enum(hiringTimelines),
    engagement_type: z.enum(engagementTypes),
    work_model: z.enum(workModels),
    location: optional(2000),
    primary_goal: optional(2000),
    compliance_requirements: optional(2000),
    website: optional(200),
  })
  .superRefine((value, context) => {
    if (value.preferred_contact_method === "Phone" && !value.phone) {
      context.addIssue({
        code: "custom",
        path: ["phone"],
        message: "A phone number is required when phone is preferred.",
      });
    }
  });

export type EmployerRequestInput = z.infer<typeof employerRequestSchema>;
export type EmployerRequestRecord = Omit<EmployerRequestInput, "website"> & {
  source_page: "employers";
};

type SubmissionDependencies = {
  insert: (
    payload: EmployerRequestRecord
  ) => Promise<{ error: { message?: string } | null }>;
  notify: (payload: EmployerRequestRecord) => Promise<void>;
};

export type EmployerSubmissionResult =
  | {
      ok: true;
      status: 200;
      body: { ok: true };
    }
  | {
      ok: false;
      status: 400 | 500;
      body: { error: string };
    };

export async function processEmployerSubmission(
  input: unknown,
  dependencies: SubmissionDependencies
): Promise<EmployerSubmissionResult> {
  const parsed = employerRequestSchema.safeParse(input);

  if (!parsed.success || parsed.data.website.trim().length > 0) {
    return {
      ok: false,
      status: 400,
      body: { error: "Please check the submitted information." },
    };
  }

  const { website, ...brief } = parsed.data;
  void website;
  const payload: EmployerRequestRecord = {
    ...brief,
    source_page: "employers",
  };

  const { error } = await dependencies.insert(payload);
  if (error) {
    return {
      ok: false,
      status: 500,
      body: { error: "Unable to submit your hiring brief." },
    };
  }

  await dependencies.notify(payload).catch(() => undefined);

  return {
    ok: true,
    status: 200,
    body: { ok: true },
  };
}
