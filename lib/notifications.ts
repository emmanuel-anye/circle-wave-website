import { resend, RESEND_FROM_EMAIL, ADMIN_NOTIFICATION_EMAIL } from "@/lib/resend";

type NotificationParams = {
  subject: string;
  html: string;
};

export async function sendAdminNotification({
  subject,
  html,
}: NotificationParams) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not set. Skipping email notification.");
    return;
  }

  await resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to: ADMIN_NOTIFICATION_EMAIL,
    subject,
    html,
  });
}