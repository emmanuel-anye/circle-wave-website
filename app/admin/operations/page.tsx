import { redirect } from "next/navigation";
import PageTransition from "@/components/ui/PageTransition";
import RecruitmentOperationsClient from "@/components/admin/RecruitmentOperationsClient";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export default async function RecruitmentOperationsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const supabase = getSupabaseAdmin();
  const [applications, employers, talent, activity] = await Promise.all([
    supabase
      .from("job_applications")
      .select("id,created_at,full_name,email,location,experience_level,job_title_snapshot,application_reference,status,internal_notes,status_updated_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("employer_requests")
      .select("id,created_at,company_name,contact_name,email,job_roles,hiring_timeline,status,internal_notes,status_updated_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("talent_network_registrations")
      .select("id,created_at,full_name,email,location,target_roles,registration_reference,status,internal_notes,status_updated_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("recruitment_activity")
      .select("id,created_at,entity_type,entity_id,action,previous_value,new_value,note")
      .order("created_at", { ascending: false })
      .limit(100),
  ]);

  return (
    <PageTransition>
      <section className="bg-slate-50 section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Internal recruitment operations
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Recruitment pipeline
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Track candidates and employer opportunities, record private notes,
            review activity, and export operational data.
          </p>

          <RecruitmentOperationsClient
            applications={applications.data ?? []}
            employers={employers.data ?? []}
            talent={talent.data ?? []}
            activity={activity.data ?? []}
          />
        </div>
      </section>
    </PageTransition>
  );
}
