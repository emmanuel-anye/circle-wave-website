import { z } from "zod";

export const applicationStatuses = [
  "new",
  "screening",
  "shortlisted",
  "interview",
  "offer",
  "hired",
  "rejected",
  "withdrawn",
] as const;

export const employerStatuses = [
  "new",
  "contacted",
  "qualified",
  "proposal",
  "active",
  "closed",
  "lost",
] as const;

export const talentStatuses = ["new", "reviewing", "matched", "archived"] as const;
export const interviewStatuses = ["scheduled", "completed", "cancelled", "no_show"] as const;
export const interviewFormats = ["video", "phone", "in_person"] as const;

export const recruitmentEntityTypes = [
  "job_application",
  "employer_request",
  "talent_network",
] as const;

export type RecruitmentEntityType = (typeof recruitmentEntityTypes)[number];

export const recruitmentUpdateSchema = z
  .object({
    entityType: z.enum(recruitmentEntityTypes),
    id: z.uuid(),
    status: z.string().trim().min(1).max(40).optional(),
    internalNotes: z.string().trim().max(4000).optional(),
    assignedRecruiterId: z.union([z.uuid(), z.null()]).optional(),
  })
  .refine(
    (value) =>
      value.status !== undefined ||
      value.internalNotes !== undefined ||
      value.assignedRecruiterId !== undefined,
    { message: "Provide a status, note, or recruiter assignment update." }
  );

export const recruiterCreateSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.email().max(320),
  role: z.string().trim().max(120).optional().default(""),
});

export const recruiterUpdateSchema = z.object({
  id: z.uuid(),
  name: z.string().trim().min(1).max(120).optional(),
  email: z.email().max(320).optional(),
  role: z.string().trim().max(120).nullable().optional(),
  active: z.boolean().optional(),
});

export const interviewCreateSchema = z.object({
  applicationId: z.uuid(),
  recruiterId: z.union([z.uuid(), z.null()]).optional(),
  startsAt: z.iso.datetime({ offset: true }),
  durationMinutes: z.number().int().min(10).max(480),
  timezone: z.string().trim().min(1).max(80),
  format: z.enum(interviewFormats),
  location: z.string().trim().max(500).optional().default(""),
  meetingUrl: z.union([z.url().max(2000), z.literal("")]).optional().default(""),
  notes: z.string().trim().max(4000).optional().default(""),
});

export const interviewUpdateSchema = interviewCreateSchema.partial().extend({
  id: z.uuid(),
  status: z.enum(interviewStatuses).optional(),
});

export function statusesForEntity(entityType: RecruitmentEntityType) {
  if (entityType === "job_application") return applicationStatuses;
  if (entityType === "employer_request") return employerStatuses;
  return talentStatuses;
}

export function isAllowedStatus(
  entityType: RecruitmentEntityType,
  status: string
) {
  return (statusesForEntity(entityType) as readonly string[]).includes(status);
}

export function tableForEntity(entityType: RecruitmentEntityType) {
  if (entityType === "job_application") return "job_applications";
  if (entityType === "employer_request") return "employer_requests";
  return "talent_network_registrations";
}

export function humanizeStatus(status?: string | null) {
  if (!status) return "New";
  return status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
