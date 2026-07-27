import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  isAllowedStatus,
  recruitmentUpdateSchema,
  tableForEntity,
} from "@/lib/recruitment-operations";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const parsed = recruitmentUpdateSchema.safeParse(
    await request.json().catch(() => null)
  );
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the requested update." },
      { status: 400 }
    );
  }

  const { entityType, id, status, internalNotes, assignedRecruiterId } = parsed.data;
  if (status && !isAllowedStatus(entityType, status)) {
    return NextResponse.json({ error: "Invalid pipeline status." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const table = tableForEntity(entityType);
  const { data: current, error: readError } = await supabase
    .from(table)
    .select("id,status,internal_notes,assigned_recruiter_id")
    .eq("id", id)
    .maybeSingle();

  if (readError || !current) {
    return NextResponse.json({ error: "Record not found." }, { status: 404 });
  }

  if (assignedRecruiterId) {
    const { data: recruiter } = await supabase
      .from("recruiters")
      .select("id,active")
      .eq("id", assignedRecruiterId)
      .maybeSingle();
    if (!recruiter?.active) {
      return NextResponse.json(
        { error: "Choose an active recruiter." },
        { status: 400 }
      );
    }
  }

  const updates: Record<string, string | null> = {};
  if (status !== undefined && status !== current.status) {
    updates.status = status;
    updates.status_updated_at = new Date().toISOString();
  }
  if (internalNotes !== undefined && internalNotes !== (current.internal_notes ?? "")) {
    updates.internal_notes = internalNotes;
  }
  if (
    assignedRecruiterId !== undefined &&
    assignedRecruiterId !== current.assigned_recruiter_id
  ) {
    updates.assigned_recruiter_id = assignedRecruiterId;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ ok: true, unchanged: true });
  }

  const { error: updateError } = await supabase
    .from(table)
    .update(updates)
    .eq("id", id);

  if (updateError) {
    return NextResponse.json(
      { error: "Unable to save the recruitment update." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
