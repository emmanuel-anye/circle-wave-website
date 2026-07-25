import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { isHoneypotFilled, isRateLimited } from "@/lib/request-security";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { notifyAdmin } from "@/lib/submission-notifications";
import { sendApplicantConfirmation } from "@/lib/notifications";

const fieldsSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  phone: z.string().trim().max(40),
  location: z.string().trim().max(160),
  availability: z.string().trim().max(120),
  experience_level: z.string().trim().max(120),
  languages: z.string().trim().max(500),
  technical_skills: z.string().trim().max(2000),
  cover_letter: z.string().trim().max(8000),
  job_id: z.string().uuid().nullable(),
  website: z.string().optional(),
});

const allowedTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export async function POST(request: Request) {
  if (isRateLimited(request, "application", 3)) {
    return NextResponse.json({ error: "Too many submissions. Try again shortly." }, { status: 429 });
  }
  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Invalid form data." }, { status: 400 });

  const resume = form.get("resume");
  const rawJobId = String(form.get("job_id") || "").trim();
  const parsed = fieldsSchema.safeParse({
    full_name: form.get("full_name"),
    email: form.get("email"),
    phone: form.get("phone"),
    location: form.get("location"),
    availability: form.get("availability"),
    experience_level: form.get("experience_level"),
    languages: form.get("languages"),
    technical_skills: form.get("technical_skills"),
    cover_letter: form.get("cover_letter"),
    job_id: rawJobId || null,
    website: form.get("website"),
  });
  if (!parsed.success || isHoneypotFilled(parsed.data?.website) || !(resume instanceof File)) {
    return NextResponse.json({ error: "Please check the submitted information." }, { status: 400 });
  }
  if (!allowedTypes.has(resume.type) || resume.size === 0 || resume.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Resume must be a PDF, DOC, or DOCX file under 5 MB." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  let jobTitle: string | null = null;
  if (parsed.data.job_id) {
    const { data: job } = await supabase.from("job_postings").select("id,title,status,application_deadline").eq("id", parsed.data.job_id).maybeSingle();
    const expired = job?.application_deadline && new Date(job.application_deadline) < new Date();
    if (!job || job.status !== "open" || expired) {
      return NextResponse.json({ error: "This job is no longer accepting applications." }, { status: 400 });
    }
    jobTitle = job.title;
  }

  const extension = resume.name.split(".").pop()?.toLowerCase() || "bin";
  const resumePath = `${new Date().getUTCFullYear()}/${randomUUID()}.${extension}`;
  const upload = await supabase.storage.from("resumes").upload(resumePath, resume, {
    contentType: resume.type,
    upsert: false,
  });
  if (upload.error) return NextResponse.json({ error: "Unable to upload the resume." }, { status: 500 });

  const fields = { ...parsed.data };
  delete fields.website;
  const { error } = await supabase.from("job_applications").insert({
    ...fields,
    resume_path: resumePath,
    job_title_snapshot: jobTitle,
  });
  if (error) {
    await supabase.storage.from("resumes").remove([resumePath]);
    return NextResponse.json({ error: "Unable to submit the application." }, { status: 500 });
  }

  await Promise.allSettled([
    notifyAdmin("New job application", { ...fields, job_title_snapshot: jobTitle }),
    sendApplicantConfirmation({ to: fields.email, name: fields.full_name, jobTitle }),
  ]);
  return NextResponse.json({ ok: true });
}
