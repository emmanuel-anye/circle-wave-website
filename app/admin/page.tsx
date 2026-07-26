import Link from "next/link";
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
  getTalentNetworkRegistrations,
} from "@/lib/admin-data";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const [
    employerRequests,
    jobApplications,
    talentNetworkRegistrations,
    contactMessages,
    jobPostings,
  ] = await Promise.all([
    getEmployerRequests(),
    getJobApplications(),
    getTalentNetworkRegistrations(),
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
              Review employer requests, job applications, talent profiles,
              contact messages, and manage job postings.
            </p>
            <Link
              href="/admin/operations"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Open recruitment operations
            </Link>
          </Reveal>

          <div className="mt-10">
            <AdminJobPostingForm jobPostings={jobPostings} />
          </div>

          <AdminDashboardClient
            employerRequests={employerRequests}
            jobApplications={jobApplications}
            talentNetworkRegistrations={talentNetworkRegistrations}
            contactMessages={contactMessages}
            jobPostings={jobPostings}
          />
        </div>
      </section>
    </PageTransition>
  );
}