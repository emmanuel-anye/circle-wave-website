import { NextResponse } from "next/server";
import { z } from "zod";
import { isHoneypotFilled, isRateLimited } from "@/lib/request-security";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { notifyAdmin } from "@/lib/submission-notifications";

const schema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  company: z.string().trim().max(160).optional().default(""),
  subject: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(10).max(5000),
  website: z.string().optional(),
});

export async function POST(request: Request) {
  if (isRateLimited(request, "contact")) {
    return NextResponse.json({ error: "Too many submissions. Try again shortly." }, { status: 429 });
  }
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || isHoneypotFilled(parsed.data?.website)) {
    return NextResponse.json({ error: "Please check the submitted information." }, { status: 400 });
  }
  const payload = { ...parsed.data };
  delete payload.website;
  const { error } = await getSupabaseAdmin().from("contact_messages").insert(payload);
  if (error) return NextResponse.json({ error: "Unable to send your message." }, { status: 500 });
  await notifyAdmin("New contact message", payload).catch(console.error);
  return NextResponse.json({ ok: true });
}
