import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_TTL_SECONDS,
  createAdminSession,
  passwordsMatch,
} from "@/lib/admin-auth";
import { isRateLimited } from "@/lib/request-security";

export async function POST(request: Request) {
  if (isRateLimited(request, "admin-login", 8)) {
    return NextResponse.json({ error: "Too many attempts. Try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const password = body?.password;
  const expectedPassword = process.env.ADMIN_DASHBOARD_PASSWORD;

  if (
    typeof password !== "string" ||
    !expectedPassword ||
    !passwordsMatch(password, expectedPassword)
  ) {
    return NextResponse.json(
      { error: "Invalid password." },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, createAdminSession(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  });

  return NextResponse.json({ ok: true });
}
