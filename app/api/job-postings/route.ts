import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const isAuthed = cookieStore.get("cw_admin_auth")?.value === "authenticated";

  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);

  if (!body?.title || !body?.slug || !body?.description) {
    return NextResponse.json(
      { error: "Title, slug, and description are required." },
      { status: 400 }
    );
  }

  const payload = {
    title: body.title,
    slug: body.slug,
    department: body.department || null,
    location: body.location || null,
    work_model: body.work_model || null,
    employment_type: body.employment_type || null,
    salary_range: body.salary_range || null,
    short_summary: body.short_summary || null,
    description: body.description,
    responsibilities: body.responsibilities || null,
    requirements: body.requirements || null,
    preferred_qualifications: body.preferred_qualifications || null,
    application_deadline: body.application_deadline || null,
    status: body.status || "open",
    featured: Boolean(body.featured),
  };

  const { error } = await supabase.from("job_postings").insert([payload]);

  if (error) {
    return NextResponse.json(
      { error: error.message || "Failed to create job posting." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}