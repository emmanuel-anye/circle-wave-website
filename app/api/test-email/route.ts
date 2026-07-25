import { NextResponse } from "next/server";
import { sendAdminNotification } from "@/lib/notifications";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    await sendAdminNotification({
      subject: "Circle Wave test email",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Test email successful</h2>
          <p>Your Circle Wave website can now send notification emails.</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Failed to send test email." },
      { status: 500 }
    );
  }
}
