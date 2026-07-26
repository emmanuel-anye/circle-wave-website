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

  const body = await request.json().catch(() => null);
  const parsed = recruitmentUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the requested update." },
      { status: 400 }
    );
  }

  const { entityType, id, status, internalNotes } = parsed.data;
  if (status && !isAllowedStatus(entityType, status)) {
    return NextResponse.json({ error: "Invalid pipeline status." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const table = tableForEntity(entityType);
  const { data: current, error: readError } = await supabase
    .from(table)
    .select("id,status,internal_notes")
    .eq("id", id)
    .maybeSingle();

  if (readError || !current) {
    return NextResponse.json({ error: "Record not found." }, { status: 404 });
  }

  const updates: Record<string, string> = {};
  if (status !== undefined && status !== current.status) {
    updates.status = status;
    updates.status_updated_at = new Date().toISOString();
  }
  if (internalNotes !== undefined && internalNotes !== (current.internal_notes ?? "")) {
    updates.internal_notes = internalNotes;
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

  const activity = [];
  if (updates.status) {
    activity.push({
      entity_type: entityType,
      entity_id: id,
      action: "status_changed",
      previous_value: current.status ?? null,
      new_value: updates.status,
      note: null,
    });
  }
  if (updates.internal_notes !== undefined) {
    activity.push({
      entity_type: entityType,
      entity_id: id,
      action: "notes_updated",
      previous_value: null,
      new_value: null,
      note: updates.internal_notes || "Notes cleared",
    });
  }

  const { error: activityError } = await supabase
    .from("recruitment_activity")
    .insert(activity);

  if (activityError) {
    console.error("Unable to write recruitment activity:", activityError);
  }

  return NextResponse.json({ ok: true });
}
