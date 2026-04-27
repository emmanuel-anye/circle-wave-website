import { Resend } from "resend";

export function getResend() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  return new Resend(apiKey);
}

// Email config (safe to expose at runtime)
export const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Circle Wave <noreply@circleswave.net>";

export const ADMIN_NOTIFICATION_EMAIL =
  process.env.ADMIN_NOTIFICATION_EMAIL || "info@circleswave.net";