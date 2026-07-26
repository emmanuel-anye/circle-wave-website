import { NextResponse } from "next/server";
import { isRateLimited } from "@/lib/request-security";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { notifyAdmin } from "@/lib/submission-notifications";
import { processTalentNetworkRegistration } from "@/lib/talent-network-submission";

export async function POST(request: Request) {
  if (isRateLimited(request, "talent-network", 3)) {
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
    target_roles: form.get("target_roles"),
    core_skills: form.get("core_skills"),
    location: form.get("location"),
    work_preference: form.get("work_preference"),
    relocation_preference: form.get("relocation_preference"),
    work_authorization: form.get("work_authorization"),
    availability: form.get("availability"),
    salary_expectations: form.get("salary_expectations"),
    consent: form.get("consent"),
    website: form.get("website"),
  };
  const supabase = getSupabaseAdmin();
  const result = await processTalentNetworkRegistration(
    rawFields,
    form.get("resume"),
    {
      upload: async (path, file) => {
        const { error } = await supabase.storage
          .from("resumes")
          .upload(path, file, { contentType: file.type, upsert: false });
        return { error };
      },
      insert: async (payload) => {
        const { error } = await supabase
          .from("talent_network_registrations")
          .insert(payload);
        return { error };
      },
      remove: async (path) => {
        await supabase.storage.from("resumes").remove([path]);
      },
      notify: async (payload) => {
        const { resume_path: _resumePath, ...notificationFields } = payload;
        void _resumePath;
        await notifyAdmin("New talent network registration", notificationFields);
      },
    }
  );

  return NextResponse.json(result.body, { status: result.status });
}
