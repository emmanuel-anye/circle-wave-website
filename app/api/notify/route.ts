import { NextResponse } from "next/server";
import { sendAdminNotification } from "@/lib/notifications";

type NotifyType = "employer-request" | "job-application" | "contact-message";

function formatRows(data: Record<string, unknown>) {
  return Object.entries(data)
    .filter(([, value]) => value !== null && value !== undefined && value !== "")
    .map(([key, value]) => {
      const label = key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      return `
        <tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #334155;">
            ${label}
          </td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; color: #475569;">
            ${String(value)}
          </td>
        </tr>
      `;
    })
    .join("");
}

function getSubject(type: NotifyType) {
  switch (type) {
    case "employer-request":
      return "New employer staffing request";
    case "job-application":
      return "New job application submitted";
    case "contact-message":
      return "New contact message";
    default:
      return "New website submission";
  }
}

function getHeading(type: NotifyType) {
  switch (type) {
    case "employer-request":
      return "New Employer Staffing Request";
    case "job-application":
      return "New Job Application";
    case "contact-message":
      return "New Contact Message";
    default:
      return "New Website Submission";
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body?.type || !body?.data) {
      return NextResponse.json(
        { error: "Missing notification type or data." },
        { status: 400 }
      );
    }

    const type = body.type as NotifyType;
    const data = body.data as Record<string, unknown>;

    await sendAdminNotification({
      subject: getSubject(type),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
          <h2 style="margin-bottom: 8px;">${getHeading(type)}</h2>
          <p style="margin-bottom: 20px; color: #475569;">
            A new submission was received from the Circle Wave website.
          </p>

          <table style="border-collapse: collapse; width: 100%; max-width: 720px; border: 1px solid #e5e7eb;">
            <tbody>
              ${formatRows(data)}
            </tbody>
          </table>

          <p style="margin-top: 20px; color: #64748b; font-size: 13px;">
            Log in to the admin dashboard to review the full submission.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Notification error:", error);
    return NextResponse.json(
      { error: "Failed to send notification." },
      { status: 500 }
    );
  }
}