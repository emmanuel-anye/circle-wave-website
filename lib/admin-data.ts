import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getResumePublicUrl(path?: string | null) {
  if (!path) return null;

  const { data } = supabase.storage.from("resumes").getPublicUrl(path);
  return data.publicUrl;
}

export async function getEmployerRequests() {
  const { data, error } = await supabase
    .from("employer_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching employer requests:", error);
    return [];
  }

  return data ?? [];
}

export async function getJobApplications() {
  const { data, error } = await supabase
    .from("job_applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching job applications:", error);
    return [];
  }

  return (data ?? []).map((item) => ({
    ...item,
    resume_url: getResumePublicUrl(item.resume_path),
  }));
}

export async function getContactMessages() {
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contact messages:", error);
    return [];
  }

  return data ?? [];
}