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
      <AdminWorkspaceClient
        jobs={jobs}
        applications={applications}
        employers={employers}
        talent={talent}
        activity={activity}
        messages={messages}
      />
      <Link
        href="/admin/operations"
        className="fixed bottom-5 left-5 z-40 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 lg:left-80"
      >
        Recruitment operations
      </Link>
    </div>
  );
}
