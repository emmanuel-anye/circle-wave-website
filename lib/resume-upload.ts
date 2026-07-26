import { randomUUID } from "node:crypto";

export const maxResumeBytes = 5 * 1024 * 1024;

const allowedResumeTypes = new Map([
  ["application/pdf", "pdf"],
  ["application/msword", "doc"],
  [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "docx",
  ],
]);

export function validateResumeFile(value: unknown) {
  if (!(value instanceof File)) return "Please upload a résumé.";
  if (value.size === 0 || value.size > maxResumeBytes) {
    return "Résumé must be a PDF, DOC, or DOCX file under 5 MB.";
  }

  const expectedExtension = allowedResumeTypes.get(value.type);
  const actualExtension = value.name.split(".").pop()?.toLowerCase();
  if (!expectedExtension || actualExtension !== expectedExtension) {
    return "Résumé must be a PDF, DOC, or DOCX file under 5 MB.";
  }

  return null;
}

export function createPrivateResumePath(
  namespace: "applications" | "talent-network",
  now = new Date(),
  id: string = randomUUID()
) {
  return `${namespace}/${now.getUTCFullYear()}/${id}`;
}

export function getResumeExtension(file: File) {
  return allowedResumeTypes.get(file.type) ?? "bin";
}
