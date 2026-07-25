import "server-only";

import { sendAdminNotification } from "@/lib/notifications";

function escapeHtml(value: unknown) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function notifyAdmin(subject: string, data: Record<string, unknown>) {
  const rows = Object.entries(data)
    .filter(([, value]) => value !== null && value !== undefined && value !== "")
    .map(([key, value]) => `<tr><td style="padding:8px 12px;font-weight:600">${escapeHtml(key.replaceAll("_", " "))}</td><td style="padding:8px 12px">${escapeHtml(value)}</td></tr>`)
    .join("");

  await sendAdminNotification({
    subject,
    html: `<div style="font-family:Arial,sans-serif"><h2>${escapeHtml(subject)}</h2><table>${rows}</table><p>Review the submission in the Circle Wave admin dashboard.</p></div>`,
  });
}
