import Link from "next/link";
import { redirect } from "next/navigation";
import AdminWorkspaceClient from "@/components/admin/AdminWorkspaceClient";
import {
  getContactMessages,
  getEmployerRequests,
  getJobApplications,
  getJobPostings,
  getRecruitmentActivity,
  getTalentNetworkRegistrations,
} from "@/lib/admin-data";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import "./admin-polish.css";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const [jobs, applications, employers, talent, activity, messages] = await Promise.all([
    getJobPostings(),
    getJobApplications(),
    getEmployerRequests(),
    getTalentNetworkRegistrations(),
    getRecruitmentActivity(),
    getContactMessages(),
  ]);

  return (
    <div className="admin-workspace">
      <div className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:pl-[20rem] lg:pr-8">
        <div className="flex justify-end">
          <Link
            href="/admin/operations"
            className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
          >
            Recruitment operations
          </Link>
        </div>
      </div>
      <AdminWorkspaceClient
        jobs={jobs}
        applications={applications}
        employers={employers}
        talent={talent}
        activity={activity}
        messages={messages}
      />
    </div>
  );
}
