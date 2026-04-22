import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = body?.password;

  if (!password || password !== process.env.ADMIN_DASHBOARD_PASSWORD) {
    return NextResponse.json(
      { error: "Invalid password." },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set("cw_admin_auth", "authenticated", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return NextResponse.json({ ok: true });
}