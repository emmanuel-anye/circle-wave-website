import PageTransition from "@/components/ui/PageTransition";
import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import HoverCard from "@/components/ui/HoverCard";
import AdminSection from "@/components/ui/AdminSection";
import AdminField from "@/components/ui/AdminField";
import {
  getEmployerRequests,
  getJobApplications,
  getContactMessages,
} from "@/lib/admin-data";

export default async function AdminPage() {
  const [employerRequests, jobApplications, contactMessages] = await Promise.all([
    getEmployerRequests(),
    getJobApplications(),
    getContactMessages(),
  ]);

  return (
    <PageTransition>
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Admin Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Submissions overview
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Review employer requests, job applications, and contact messages
              submitted through the website.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Employer Requests
              </p>
              <p className="mt-3 text-3xl font-bold text-slate-900">
                {employerRequests.length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Job Applications
              </p>
              <p className="mt-3 text-3xl font-bold text-slate-900">
                {jobApplications.length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Contact Messages
              </p>
              <p className="mt-3 text-3xl font-bold text-slate-900">
                {contactMessages.length}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-8">
            <AdminSection
              title="Employer Requests"
              description="Latest staffing and employer intake submissions."
            >
              {employerRequests.length === 0 ? (
                <p className="text-sm text-slate-600">No employer requests yet.</p>
              ) : (
                <StaggerGroup className="grid gap-4">
                  {employerRequests.map((request) => (
                    <StaggerItem key={request.id}>
                      <HoverCard className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                          <AdminField label="Company" value={request.company_name} />
                          <AdminField label="Contact Name" value={request.contact_name} />
                          <AdminField label="Email" value={request.email} />
                          <AdminField label="Phone" value={request.phone} />
                          <AdminField label="Industry" value={request.industry} />
                          <AdminField label="Headcount" value={request.headcount} />
                          <AdminField label="Engagement Type" value={request.engagement_type} />
                          <AdminField label="Work Model" value={request.work_model} />
                          <AdminField label="Duration" value={request.duration} />
                          <AdminField label="Location" value={request.location} />
                        </div>

                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                          <AdminField label="Job Roles Needed" value={request.job_roles} />
                          <AdminField
                            label="Compliance Requirements"
                            value={request.compliance_requirements}
                          />
                        </div>

                        <div className="mt-5">
                          <AdminField
                            label="Additional Notes"
                            value={request.additional_notes}
                          />
                        </div>

                        <p className="mt-5 text-xs text-slate-500">
                          Submitted:{" "}
                          {request.created_at
                            ? new Date(request.created_at).toLocaleString()
                            : "—"}
                        </p>
                      </HoverCard>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              )}
            </AdminSection>

            <AdminSection
              title="Job Applications"
              description="Latest candidate applications and resume uploads."
            >
              {jobApplications.length === 0 ? (
                <p className="text-sm text-slate-600">No job applications yet.</p>
              ) : (
                <StaggerGroup className="grid gap-4">
                  {jobApplications.map((application) => (
                    <StaggerItem key={application.id}>
                      <HoverCard className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                          <AdminField label="Full Name" value={application.full_name} />
                          <AdminField label="Email" value={application.email} />
                          <AdminField label="Phone" value={application.phone} />
                          <AdminField label="Location" value={application.location} />
                          <AdminField
                            label="Availability"
                            value={application.availability}
                          />
                          <AdminField
                            label="Experience Level"
                            value={application.experience_level}
                          />
                          <AdminField label="Languages" value={application.languages} />
                          <AdminField
                            label="Technical Skills"
                            value={application.technical_skills}
                          />
                        </div>

                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                          <AdminField
                            label="Resume Path"
                            value={application.resume_path || application.resume_link}
                          />
                          <AdminField
                            label="Cover Letter"
                            value={application.cover_letter}
                          />
                        </div>

                        <p className="mt-5 text-xs text-slate-500">
                          Submitted:{" "}
                          {application.created_at
                            ? new Date(application.created_at).toLocaleString()
                            : "—"}
                        </p>
                      </HoverCard>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              )}
            </AdminSection>

            <AdminSection
              title="Contact Messages"
              description="Messages submitted from the general contact page."
            >
              {contactMessages.length === 0 ? (
                <p className="text-sm text-slate-600">No contact messages yet.</p>
              ) : (
                <StaggerGroup className="grid gap-4">
                  {contactMessages.map((message) => (
                    <StaggerItem key={message.id}>
                      <HoverCard className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                          <AdminField label="Full Name" value={message.full_name} />
                          <AdminField label="Email" value={message.email} />
                          <AdminField label="Company" value={message.company} />
                          <AdminField label="Subject" value={message.subject} />
                        </div>

                        <div className="mt-5">
                          <AdminField label="Message" value={message.message} />
                        </div>

                        <p className="mt-5 text-xs text-slate-500">
                          Submitted:{" "}
                          {message.created_at
                            ? new Date(message.created_at).toLocaleString()
                            : "—"}
                        </p>
                      </HoverCard>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              )}
            </AdminSection>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}