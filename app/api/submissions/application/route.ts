import { NextResponse } from "next/server";
import { processJobApplication } from "@/lib/application-submission";
import { deliverApplicationConfirmation } from "@/lib/candidate-delivery";
import { sendApplicantConfirmation } from "@/lib/notifications";
import { isRateLimited } from "@/lib/request-security";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { notifyAdmin } from "@/lib/submission-notifications";

export async function POST(request: Request) {
  if (isRateLimited(request, "application", 3)) {
    return NextResponse.json(
      { error: "Too many submissions. Try again shortly." },
      { status: 429 }
    );
  }

  const form = await request.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const rawFields = {
    full_name: form.get("full_name"),
    email: form.get("email"),
    phone: form.get("phone"),
    location: form.get("location"),
    availability: form.get("availability"),
    experience_level: form.get("experience_level"),
    languages: form.get("languages"),
    technical_skills: form.get("technical_skills"),
    cover_letter: form.get("cover_letter"),
    job_id: form.get("job_id"),
    submission_token: form.get("submission_token"),
    website: form.get("website"),
  };
  const supabase = getSupabaseAdmin();
  const result = await processJobApplication(rawFields, form.get("resume"), {
    getJob: async (id) => {
      const { data } = await supabase
        .from("job_postings")
        .select("id,title,status,application_deadline")
        .eq("id", id)
        .maybeSingle();
      return data;
    },
    findExisting: async (submissionToken, jobId) => {
      const { data } = await supabase
        .from("job_applications")
        .select("application_reference")
        .eq("submission_token", submissionToken)
        .eq("job_id", jobId)
        .maybeSingle();
      return data;
    },
    upload: async (path, file) => {
      const { error } = await supabase.storage
        .from("resumes")
        .upload(path, file, { contentType: file.type, upsert: false });
      return { error };
    },
    insert: async (payload) => {
      const { error } = await supabase.from("job_applications").insert(payload);
      return { error };
    },
    remove: async (path) => {
      await supabase.storage.from("resumes").remove([path]);
    },
    notify: async (payload) => {
      const { resume_path: _resumePath, ...notificationFields } = payload;
      void _resumePath;
      await Promise.allSettled([
        notifyAdmin("New job application", notificationFields),
        deliverApplicationConfirmation(
          {
            email: payload.email,
            name: payload.full_name,
            jobTitle: payload.job_title_snapshot,
            applicationReference: payload.application_reference,
          },
          {
            sendApplicationConfirmation: (message) =>
              sendApplicantConfirmation({
                to: message.email,
                name: message.name,
                jobTitle: message.jobTitle,
                applicationReference: message.applicationReference,
              }),
          }
        ),
      ]);
    },
  });

  return NextResponse.json(result.body, { status: result.status });
}
