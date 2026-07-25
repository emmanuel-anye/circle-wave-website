import { getSupabaseAdmin, getSupabasePublic } from "@/lib/supabase-server";

async function getResumeSignedUrl(path?: string | null) {
  if (!path) return null;
  const { data } = await getSupabaseAdmin().storage.from("resumes").createSignedUrl(path, 300);
  return data?.signedUrl ?? null;
}

export async function getEmployerRequests() {
  const { data, error } = await getSupabaseAdmin()
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
  const { data, error } = await getSupabaseAdmin()
    .from("job_applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching job applications:", error);
    return [];
  }

  return Promise.all((data ?? []).map(async (item) => ({
    ...item,
    resume_url: await getResumeSignedUrl(item.resume_path),
  })));
}

export async function getContactMessages() {
  const { data, error } = await getSupabaseAdmin()
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contact messages:", error);
    return [];
  }

  return data ?? [];
}

export async function getJobPostings() {
  const { data, error } = await getSupabaseAdmin()
    .from("job_postings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching job postings:", error);
    return [];
  }

  return data ?? [];
}

export async function getPublicJobPostings() {
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await getSupabasePublic()
    .from("job_postings")
    .select("*")
    .eq("status", "open")
    .or(`application_deadline.is.null,application_deadline.gte.${today}`)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching public job postings:", error);
    return [];
  }

  return data ?? [];
}

export async function getPublicJobBySlug(slug: string) {
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await getSupabasePublic()
    .from("job_postings")
    .select("*")
    .eq("slug", slug)
    .eq("status", "open")
    .or(`application_deadline.is.null,application_deadline.gte.${today}`)
    .maybeSingle();

  if (error) {
    console.error("Error fetching job by slug:", error);
    return null;
  }

  return data;
}
