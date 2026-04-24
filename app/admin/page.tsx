import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PageTransition from "@/components/ui/PageTransition";
import Reveal from "@/components/ui/Reveal";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";
import AdminJobPostingForm from "@/components/admin/AdminJobPostingForm";
import {
  getEmployerRequests,
  getJobApplications,
  getContactMessages,
  getJobPostings,
} from "@/lib/admin-data";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthed = cookieStore.get("cw_admin_auth")?.value === "authenticated";

  if (!isAuthed) {
    redirect("/admin/login");
  }

  const [employerRequests, jobApplications, contactMessages, jobPostings] =
    await Promise.all([
      getEmployerRequests(),
      getJobApplications(),
      getContactMessages(),
      getJobPostings(),
    ]);

  return (
    <PageTransition>
      <section className="bg-slate-50 section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Admin Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Submissions overview
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Review employer requests, job applications, contact messages,
              and manage open job postings.
            </p>
          </Reveal>

          <div className="mt-10">
            <AdminJobPostingForm />
          </div>

          <AdminDashboardClient
            employerRequests={employerRequests}
            jobApplications={jobApplications}
            contactMessages={contactMessages}
            jobPostings={jobPostings}
          />
        </div>
      </section>
    </PageTransition>
  );
}