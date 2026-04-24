import { NextResponse } from "next/server";
import { sendApplicantConfirmation } from "@/lib/notifications";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.email) {
      return NextResponse.json(
        { error: "Missing email" },
        { status: 400 }
      );
    }

    await sendApplicantConfirmation({
      to: body.email,
      name: body.name,
      jobTitle: body.jobTitle,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send confirmation" },
      { status: 500 }
    );
  }
}