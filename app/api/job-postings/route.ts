import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-server";

const allowedStatuses = new Set(["open", "closed"]);

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function buildPayload(body: Record<string, unknown>) {
  const title = cleanText(body.title);
  const slug = cleanText(body.slug);
  const description = cleanText(body.description);
  const status = cleanText(body.status) || "closed";
  const applicationDeadline = cleanText(body.application_deadline) || null;

  if (!title || !slug || !description) {
    return { error: "Title, slug, and description are required." } as const;
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { error: "Slug must contain lowercase letters, numbers, and hyphens only." } as const;
  }

  if (!allowedStatuses.has(status)) {
    return { error: "Status must be active or inactive." } as const;
  }

  if (status === "open" && applicationDeadline) {
    const today = new Date().toISOString().slice(0, 10);
    if (applicationDeadline < today) {
      return {
        error: "Update or clear the expired application deadline before activating this job.",
      } as const;
    }
  }

  return {
    payload: {
      title,
      slug,
      department: cleanText(body.department) || null,
      industry: cleanText(body.industry) || null,
      location: cleanText(body.location) || null,
      work_model: cleanText(body.work_model) || null,
      employment_type: cleanText(body.employment_type) || null,
      salary_range: cleanText(body.salary_range) || null,
      short_summary: cleanText(body.short_summary) || null,
      description,
      responsibilities: cleanText(body.responsibilities) || null,
      requirements: cleanText(body.requirements) || null,
      preferred_qualifications: cleanText(body.preferred_qualifications) || null,
      application_deadline: applicationDeadline,
      status,
      featured: Boolean(body.featured),
    },
  } as const;
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const result = buildPayload(body as Record<string, unknown>);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { error } = await getSupabaseAdmin()
    .from("job_postings")
    .insert([result.payload]);

  if (error) {
    const message = error.code === "23505" ? "That job slug is already in use." : "Failed to create job posting.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const id = cleanText((body as Record<string, unknown>).id);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    return NextResponse.json({ error: "Invalid job posting ID." }, { status: 400 });
  }

  const result = buildPayload(body as Record<string, unknown>);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from("job_postings")
    .update(result.payload)
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    const message = error.code === "23505" ? "That job slug is already in use." : "Failed to update job posting.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Job posting not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}