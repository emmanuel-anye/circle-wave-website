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
  })
  .refine(
    (value) => value.status !== undefined || value.internalNotes !== undefined,
    { message: "Provide a status or internal note update." }
  );

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
