import { NextResponse } from "next/server";
import { z } from "zod";
import { isHoneypotFilled, isRateLimited } from "@/lib/request-security";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { notifyAdmin } from "@/lib/submission-notifications";

const optional = z.string().trim().max(2000).optional().default("");
const schema = z.object({
  company_name: z.string().trim().min(2).max(160),
  contact_name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  phone: z.string().trim().max(40).optional().default(""),
  industry: z.string().trim().min(2).max(120),
  job_roles: optional,
  headcount: z.string().trim().min(1).max(40),
  engagement_type: z.string().trim().min(2).max(80),
  work_model: z.string().trim().min(2).max(80),
  duration: optional,
  location: optional,
  compliance_requirements: optional,
  additional_notes: optional,
  website: z.string().optional(),
});

export async function POST(request: Request) {
  if (isRateLimited(request, "employer")) {
    return NextResponse.json({ error: "Too many submissions. Try again shortly." }, { status: 429 });
  }
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || isHoneypotFilled(parsed.data?.website)) {
    return NextResponse.json({ error: "Please check the submitted information." }, { status: 400 });
  }
  const payload = { ...parsed.data };
  delete payload.website;
  const { error } = await getSupabaseAdmin().from("employer_requests").insert(payload);
  if (error) return NextResponse.json({ error: "Unable to submit your request." }, { status: 500 });
  await notifyAdmin("New employer staffing request", payload).catch(console.error);
  return NextResponse.json({ ok: true });
}
