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
    <AdminWorkspaceClient
      jobs={jobs}
      applications={applications}
      employers={employers}
      talent={talent}
      activity={activity}
      messages={messages}
    />
  );
}
