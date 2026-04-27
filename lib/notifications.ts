import {
  getResend,
  RESEND_FROM_EMAIL,
  ADMIN_NOTIFICATION_EMAIL,
} from "@/lib/resend";

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

  const resend = getResend();

  await resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to: ADMIN_NOTIFICATION_EMAIL,
    subject,
    html,
  });
}

type ApplicantConfirmationParams = {
  to: string;
  name?: string | null;
  jobTitle?: string | null;
};

export async function sendApplicantConfirmation({
  to,
  name,
  jobTitle,
}: ApplicantConfirmationParams) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set. Skipping confirmation email.");
    return;
  }

  const resend = getResend();

  const subject = jobTitle
    ? `Your application for ${jobTitle}`
    : "Your application has been received";

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2 style="margin-bottom: 8px;">Application received</h2>

      <p style="margin-bottom: 16px;">
        ${name ? `Hi ${name},` : "Hello,"}
      </p>

      <p style="margin-bottom: 16px;">
        Thank you for applying ${
          jobTitle
            ? `for the role of <strong>${jobTitle}</strong>`
            : "with Circle Wave"
        }.
      </p>

      <p style="margin-bottom: 16px;">
        Our team will review your application and reach out if your profile
        matches our current or upcoming opportunities.
      </p>

      <p style="margin-bottom: 16px;">
        If you have any questions, feel free to contact us at
        <a href="mailto:info@circleswave.net">info@circleswave.net</a>.
      </p>

      <p style="margin-top: 24px;">
        — Circle Wave Team
      </p>
    </div>
  `;

  await resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to,
    subject,
    html,
  });
}