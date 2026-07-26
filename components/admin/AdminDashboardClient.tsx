"use client";

import { useMemo, useState } from "react";

type EmployerRequest = {
  id: string;
  created_at?: string | null;
  company_name?: string | null;
  contact_name?: string | null;
  email?: string | null;
  phone?: string | null;
  preferred_contact_method?: string | null;
  industry?: string | null;
  job_roles?: string | null;
  headcount?: string | null;
  hiring_timeline?: string | null;
  engagement_type?: string | null;
  work_model?: string | null;
  duration?: string | null;
  location?: string | null;
  primary_goal?: string | null;
  compliance_requirements?: string | null;
  additional_notes?: string | null;
  source_page?: string | null;
};

type JobApplication = {
  id: string;
  created_at?: string | null;
  full_name?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  availability?: string | null;
  experience_level?: string | null;
  languages?: string | null;
  technical_skills?: string | null;
  resume_path?: string | null;
  resume_link?: string | null;
  resume_url?: string | null;
  cover_letter?: string | null;
  job_title_snapshot?: string | null;
  application_reference?: string | null;
};

type TalentNetworkRegistration = {
  id: string;
  created_at?: string | null;
  full_name?: string | null;
  email?: string | null;
  phone?: string | null;
  target_roles?: string | null;
  core_skills?: string | null;
  location?: string | null;
  work_preference?: string | null;
  relocation_preference?: string | null;
  work_authorization?: string | null;
  availability?: string | null;
  salary_expectations?: string | null;
  consent?: boolean | null;
  registration_reference?: string | null;
  status?: string | null;
  resume_path?: string | null;
  resume_url?: string | null;
};

type JobPosting = {
  id: string;
  created_at?: string | null;
  title?: string | null;
  slug?: string | null;
  department?: string | null;
  industry?: string | null;
  location?: string | null;
  work_model?: string | null;
  employment_type?: string | null;
  salary_range?: string | null;
  short_summary?: string | null;
  description?: string | null;
  responsibilities?: string | null;
  requirements?: string | null;
  preferred_qualifications?: string | null;
  application_deadline?: string | null;
  status?: string | null;
  featured?: boolean | null;
};

type ContactMessage = {
  id: string;
  created_at?: string | null;
  full_name?: string | null;
  email?: string | null;
  company?: string | null;
  subject?: string | null;
  message?: string | null;
};

type Props = {
  employerRequests: EmployerRequest[];
  jobApplications: JobApplication[];
  talentNetworkRegistrations: TalentNetworkRegistration[];
  contactMessages: ContactMessage[];
  jobPostings: JobPosting[];
};

function formatDate(value?: string | null) {
  return value ? new Date(value).toLocaleString() : "—";
}

function Field({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 break-words text-sm leading-6 text-slate-700">
        {value && value.trim() !== "" ? value : "—"}
      </p>
    </div>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
        active
          ? "bg-blue-600 text-white shadow-sm"
          : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}

export default function AdminDashboardClient({
  employerRequests,
  jobApplications,
  talentNetworkRegistrations,
  contactMessages,
  jobPostings,
}: Props) {
  const [activeTab, setActiveTab] = useState<
    "postings" | "employers" | "jobs" | "talent" | "contacts"
  >("postings");
  const [query, setQuery] = useState("");

  const filteredEmployerRequests = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return employerRequests;

    return employerRequests.filter((item) =>
      [
        item.company_name,
        item.contact_name,
        item.email,
        item.industry,
        item.location,
        item.job_roles,
        item.primary_goal,
        item.hiring_timeline,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(q))
    );
  }, [employerRequests, query]);

  const filteredJobApplications = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return jobApplications;

    return jobApplications.filter((item) =>
      [
        item.full_name,
        item.email,
        item.location,
        item.languages,
        item.technical_skills,
        item.experience_level,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(q))
    );
  }, [jobApplications, query]);

  const filteredTalentNetworkRegistrations = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return talentNetworkRegistrations;

    return talentNetworkRegistrations.filter((item) =>
      [
        item.full_name,
        item.email,
        item.location,
        item.target_roles,
        item.core_skills,
        item.registration_reference,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(q))
    );
  }, [query, talentNetworkRegistrations]);

  const filteredJobPostings = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return jobPostings;

    return jobPostings.filter((item) =>
      [
        item.title,
        item.slug,
        item.department,
        item.location,
        item.work_model,
        item.employment_type,
        item.status,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(q))
    );
  }, [jobPostings, query]);

  const filteredContactMessages = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return contactMessages;

    return contactMessages.filter((item) =>
      [item.full_name, item.email, item.company, item.subject, item.message]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(q))
    );
  }, [contactMessages, query]);

  return (
    <div className="mt-10">
      <div className="mb-6 flex justify-end">
        <button
          type="button"
          onClick={async () => {
            await fetch("/api/admin-logout", { method: "POST" });
            window.location.href = "/admin/login";
          }}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Log Out
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        <SummaryCard label="Job Postings" value={jobPostings.length} />
        <SummaryCard label="Employer Requests" value={employerRequests.length} />
        <SummaryCard label="Job Applications" value={jobApplications.length} />
        <SummaryCard
          label="Talent Network"
          value={talentNetworkRegistrations.length}
        />
        <SummaryCard label="Contact Messages" value={contactMessages.length} />
      </div>

      <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            <TabButton
              active={activeTab === "postings"}
              onClick={() => setActiveTab("postings")}
            >
              Job Postings
            </TabButton>
            <TabButton
              active={activeTab === "employers"}
              onClick={() => setActiveTab("employers")}
            >
              Employer Requests
            </TabButton>
            <TabButton
              active={activeTab === "jobs"}
              onClick={() => setActiveTab("jobs")}
            >
              Job Applications
            </TabButton>
            <TabButton
              active={activeTab === "talent"}
              onClick={() => setActiveTab("talent")}
            >
              Talent Network
            </TabButton>
            <TabButton
              active={activeTab === "contacts"}
              onClick={() => setActiveTab("contacts")}
            >
              Contact Messages
            </TabButton>
          </div>

          <div className="w-full lg:w-[340px]">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, company, subject..."
              className="input"
            />
          </div>
        </div>
      </div>

      {activeTab === "postings" && (
        <section className="mt-8 grid gap-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-slate-900">
                Job Postings
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Create and review open positions that will appear on the public jobs pages.
              </p>
            </div>

            {/* Form will be inserted from page wrapper */}
            <div id="job-posting-form-anchor" />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-900">
                Existing Job Postings
              </h3>
            </div>

            {filteredJobPostings.length === 0 ? (
              <p className="text-sm text-slate-600">No matching job postings.</p>
            ) : (
              <div className="grid gap-4">
                {filteredJobPostings.map((job) => (
                  <div
                    key={job.id}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                  >
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <Field label="Title" value={job.title} />
                      <Field label="Slug" value={job.slug} />
                      <Field label="Department" value={job.department} />
                      <Field label="Industry" value={job.industry} />
                      <Field label="Location" value={job.location} />
                      <Field label="Work Model" value={job.work_model} />
                      <Field label="Employment Type" value={job.employment_type} />
                      <Field label="Salary Range" value={job.salary_range} />
                      <Field label="Status" value={job.status} />
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <Field label="Short Summary" value={job.short_summary} />
                      <Field
                        label="Application Deadline"
                        value={job.application_deadline}
                      />
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <Field label="Description" value={job.description} />
                      <Field label="Responsibilities" value={job.responsibilities} />
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <Field label="Requirements" value={job.requirements} />
                      <Field
                        label="Preferred Qualifications"
                        value={job.preferred_qualifications}
                      />
                    </div>

                    <p className="mt-5 text-xs text-slate-500">
                      Submitted: {formatDate(job.created_at)} · Featured: {" "}
                      {job.featured ? "Yes" : "No"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === "employers" && (
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Employer Requests
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Latest staffing and employer intake submissions.
            </p>
          </div>

          {filteredEmployerRequests.length === 0 ? (
            <p className="text-sm text-slate-600">No matching employer requests.</p>
          ) : (
            <div className="grid gap-4">
              {filteredEmployerRequests.map((request) => (
                <div
                  key={request.id}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                >
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Field label="Company" value={request.company_name} />
                    <Field label="Contact Name" value={request.contact_name} />
                    <Field label="Email" value={request.email} />
                    <Field label="Phone" value={request.phone} />
                    <Field
                      label="Preferred Contact"
                      value={request.preferred_contact_method}
                    />
                    <Field label="Industry" value={request.industry} />
                    <Field label="Headcount" value={request.headcount} />
                    <Field
                      label="Hiring Timeline"
                      value={request.hiring_timeline}
                    />
                    <Field label="Engagement Type" value={request.engagement_type} />
                    <Field label="Work Model" value={request.work_model} />
                    <Field label="Duration" value={request.duration} />
                    <Field label="Location" value={request.location} />
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <Field label="Job Roles Needed" value={request.job_roles} />
                    <Field label="Primary Hiring Goal" value={request.primary_goal} />
                    <Field
                      label="Compliance Requirements"
                      value={request.compliance_requirements}
                    />
                  </div>

                  <div className="mt-5">
                    <Field
                      label="Additional Notes"
                      value={request.additional_notes}
                    />
                  </div>

                  <p className="mt-5 text-xs text-slate-500">
                    Submitted: {formatDate(request.created_at)}
                    {request.source_page ? ` · Source: ${request.source_page}` : ""}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === "jobs" && (
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Job Applications
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Latest candidate applications and resume uploads.
            </p>
          </div>

          {filteredJobApplications.length === 0 ? (
            <p className="text-sm text-slate-600">No matching job applications.</p>
          ) : (
            <div className="grid gap-4">
              {filteredJobApplications.map((application) => (
                <div
                  key={application.id}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                >
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Field label="Full Name" value={application.full_name} />
                    <Field label="Applied Role" value={application.job_title_snapshot} />
                    <Field
                      label="Application Reference"
                      value={application.application_reference}
                    />
                    <Field label="Email" value={application.email} />
                    <Field label="Phone" value={application.phone} />
                    <Field label="Location" value={application.location} />
                    <Field label="Availability" value={application.availability} />
                    <Field
                      label="Experience Level"
                      value={application.experience_level}
                    />
                    <Field label="Languages" value={application.languages} />
                    <Field
                      label="Technical Skills"
                      value={application.technical_skills}
                    />
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Resume
                      </p>

                      {application.resume_url ? (
                        <a
                          href={application.resume_url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 inline-block break-all text-sm leading-6 text-blue-600 hover:text-blue-700"
                        >
                          Open uploaded resume
                        </a>
                      ) : application.resume_link ? (
                        <a
                          href={application.resume_link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 inline-block break-all text-sm leading-6 text-blue-600 hover:text-blue-700"
                        >
                          Open resume link
                        </a>
                      ) : (
                        <p className="mt-1 text-sm leading-6 text-slate-700">—</p>
                      )}
                    </div>

                    <Field label="Cover Letter" value={application.cover_letter} />
                  </div>

                  <p className="mt-5 text-xs text-slate-500">
                    Submitted: {formatDate(application.created_at)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === "talent" && (
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Talent Network
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Private candidate profiles submitted for future recruitment
              consideration.
            </p>
          </div>

          {filteredTalentNetworkRegistrations.length === 0 ? (
            <p className="text-sm text-slate-600">
              No matching talent network registrations.
            </p>
          ) : (
            <div className="grid gap-4">
              {filteredTalentNetworkRegistrations.map((registration) => (
                <div
                  key={registration.id}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                >
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Field label="Name" value={registration.full_name} />
                    <Field label="Email" value={registration.email} />
                    <Field label="Phone" value={registration.phone} />
                    <Field label="Location" value={registration.location} />
                    <Field
                      label="Reference"
                      value={registration.registration_reference}
                    />
                    <Field label="Status" value={registration.status} />
                    <Field
                      label="Work Preference"
                      value={registration.work_preference}
                    />
                    <Field
                      label="Relocation"
                      value={registration.relocation_preference}
                    />
                    <Field
                      label="Availability"
                      value={registration.availability}
                    />
                    <Field
                      label="Salary Expectations"
                      value={registration.salary_expectations}
                    />
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <Field label="Target Roles" value={registration.target_roles} />
                    <Field label="Core Skills" value={registration.core_skills} />
                    <Field
                      label="Work Authorization"
                      value={registration.work_authorization}
                    />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Résumé
                      </p>
                      {registration.resume_url ? (
                        <a
                          href={registration.resume_url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 inline-block text-sm text-blue-600 hover:text-blue-700"
                        >
                          Open private résumé
                        </a>
                      ) : (
                        <p className="mt-1 text-sm text-slate-700">—</p>
                      )}
                    </div>
                  </div>

                  <p className="mt-5 text-xs text-slate-500">
                    Submitted: {formatDate(registration.created_at)} · Consent:{" "}
                    {registration.consent ? "Yes" : "No"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === "contacts" && (
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Contact Messages
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Messages submitted from the general contact page.
            </p>
          </div>

          {filteredContactMessages.length === 0 ? (
            <p className="text-sm text-slate-600">No matching contact messages.</p>
          ) : (
            <div className="grid gap-4">
              {filteredContactMessages.map((message) => (
                <div
                  key={message.id}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                >
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Field label="Full Name" value={message.full_name} />
                    <Field label="Email" value={message.email} />
                    <Field label="Company" value={message.company} />
                    <Field label="Subject" value={message.subject} />
                  </div>

                  <div className="mt-5">
                    <Field label="Message" value={message.message} />
                  </div>

                  <p className="mt-5 text-xs text-slate-500">
                    Submitted: {formatDate(message.created_at)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
