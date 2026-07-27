import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { interviewCreateSchema, interviewUpdateSchema } from "@/lib/recruitment-operations";
import { getSupabaseAdmin } from "@/lib/supabase-server";

const fields = "id,created_at,updated_at,application_id,recruiter_id,starts_at,duration_minutes,timezone,format,location,meeting_url,status,notes";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { data, error } = await getSupabaseAdmin().from("interviews").select(fields).order("starts_at", { ascending: true });
  if (error) return NextResponse.json({ error: "Unable to load interviews." }, { status: 500 });
  return NextResponse.json({ interviews: data ?? [] });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const parsed = interviewCreateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please check the interview details." }, { status: 400 });
  const value = parsed.data;
  const { data, error } = await getSupabaseAdmin().from("interviews").insert({
    application_id: value.applicationId,
    recruiter_id: value.recruiterId || null,
    starts_at: value.startsAt,
    duration_minutes: value.durationMinutes,
    timezone: value.timezone,
    format: value.format,
    location: value.location || null,
    meeting_url: value.meetingUrl || null,
    notes: value.notes || null,
  }).select(fields).single();
  if (error) return NextResponse.json({ error: "Unable to schedule interview." }, { status: 500 });
  return NextResponse.json({ interview: data }, { status: 201 });
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const parsed = interviewUpdateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please check the interview update." }, { status: 400 });
  const { id, applicationId, recruiterId, startsAt, durationMinutes, meetingUrl, ...rest } = parsed.data;
  const updates: Record<string, unknown> = { updated_at: new Date().toISOString(), ...rest };
  if (applicationId !== undefined) updates.application_id = applicationId;
  if (recruiterId !== undefined) updates.recruiter_id = recruiterId;
  if (startsAt !== undefined) updates.starts_at = startsAt;
  if (durationMinutes !== undefined) updates.duration_minutes = durationMinutes;
  if (meetingUrl !== undefined) updates.meeting_url = meetingUrl || null;
  if (rest.location !== undefined) updates.location = rest.location || null;
  if (rest.notes !== undefined) updates.notes = rest.notes || null;
  const { data, error } = await getSupabaseAdmin().from("interviews").update(updates).eq("id", id).select(fields).single();
  if (error) return NextResponse.json({ error: "Unable to update interview." }, { status: 500 });
  return NextResponse.json({ interview: data });
}
