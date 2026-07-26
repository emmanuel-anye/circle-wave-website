"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  applicationStatuses,
  employerStatuses,
  humanizeStatus,
  talentStatuses,
  type RecruitmentEntityType,
} from "@/lib/recruitment-operations";

type Job = {
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

type RecruitmentRecord = {
  id: string;
  created_at?: string | null;
  status?: string | null;
  internal_notes?: string | null;
  status_updated_at?: string | null;
  full_name?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  experience_level?: string | null;
  job_title_snapshot?: string | null;
  application_reference?: string | null;
  resume_url?: string | null;
  company_name?: string | null;
  contact_name?: string | null;
  job_roles?: string | null;
  hiring_timeline?: string | null;
  target_roles?: string | null;
  registration_reference?: string | null;
};

type Activity = {
  id: string;
  created_at?: string | null;
  entity_type?: string | null;
  entity_id?: string | null;
  action?: string | null;
  previous_value?: string | null;
  new_value?: string | null;
  note?: string | null;
};

type Message = {
  id: string;
  created_at?: string | null;
  full_name?: string | null;
  email?: string | null;
  company?: string | null;
  subject?: string | null;
  message?: string | null;
};

type Section = "overview" | "jobs" | "candidates" | "employers" | "talent" | "activity" | "messages" | "settings";
type Drawer =
  | { kind: "job"; record: Job | null }
  | { kind: "record"; entity: RecruitmentEntityType; record: RecruitmentRecord }
  | null;

type Props = {
  jobs: Job[];
  applications: RecruitmentRecord[];
  employers: RecruitmentRecord[];
  talent: RecruitmentRecord[];
  activity: Activity[];
  messages: Message[];
};

const emptyJob = {
  title: "",
  slug: "",
  department: "",
  industry: "",
  location: "",
  work_model: "",
  employment_type: "",
  salary_range: "",
  short_summary: "",
  description: "",
  responsibilities: "",
  requirements: "",
  preferred_qualifications: "",
  application_deadline: "",
  status: "closed",
  featured: false,
};

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

function date(value?: string | null) {
  return value ? new Date(value).toLocaleDateString() : "—";
}

function dateTime(value?: string | null) {
  return value ? new Date(value).toLocaleString() : "—";
}

function isExpired(job: Job) {
  return Boolean(job.application_deadline && job.application_deadline < new Date().toISOString().slice(0, 10));
}

function jobForm(job: Job | null) {
  if (!job) return { ...emptyJob };
  return {
    title: job.title ?? "",
    slug: job.slug ?? "",
    department: job.department ?? "",
    industry: job.industry ?? "",
    location: job.location ?? "",
    work_model: job.work_model ?? "",
    employment_type: job.employment_type ?? "",
    salary_range: job.salary_range ?? "",
    short_summary: job.short_summary ?? "",
    description: job.description ?? "",
    responsibilities: job.responsibilities ?? "",
    requirements: job.requirements ?? "",
    preferred_qualifications: job.preferred_qualifications ?? "",
    application_deadline: job.application_deadline ?? "",
    status: job.status === "open" ? "open" : "closed",
    featured: Boolean(job.featured),
  };
}

export default function AdminWorkspaceClient({ jobs, applications, employers, talent, activity, messages }: Props) {
  const [section, setSection] = useState<Section>("overview");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [jobRows, setJobRows] = useState(jobs);
  const [applicationRows, setApplicationRows] = useState(applications);
  const [employerRows, setEmployerRows] = useState(employers);
  const [talentRows, setTalentRows] = useState(talent);
  const [drawer, setDrawer] = useState<Drawer>(null);
  const [candidateView, setCandidateView] = useState<"table" | "board">("table");
  const [statusFilter, setStatusFilter] = useState("");

  const q = query.trim().toLowerCase();
  const activeJobs = jobRows.filter((job) => job.status === "open" && !isExpired(job));
  const inactiveJobs = jobRows.filter((job) => job.status !== "open");
  const expiredJobs = jobRows.filter(isExpired);
  const newApplications = applicationRows.filter((item) => (item.status || "new") === "new");
  const newEmployers = employerRows.filter((item) => (item.status || "new") === "new");
  const newTalent = talentRows.filter((item) => (item.status || "new") === "new");

  const nav = [
    ["overview", "Overview", 0],
    ["jobs", "Jobs", expiredJobs.length],
    ["candidates", "Candidates", newApplications.length],
    ["employers", "Employer requests", newEmployers.length],
    ["talent", "Talent network", newTalent.length],
    ["activity", "Activity", 0],
    ["messages", "Messages", messages.length],
    ["settings", "Settings", 0],
  ] as const;

  function selectSection(next: Section) {
    setSection(next);
    setStatusFilter("");
    setMobileMenu(false);
  }

  const globalMatches = useMemo(() => {
    if (!q) return [];
    const results: Array<{ section: Section; label: string; detail: string }> = [];
    jobRows.forEach((job) => {
      if ([job.title, job.slug, job.location, job.department].join(" ").toLowerCase().includes(q)) {
        results.push({ section: "jobs", label: job.title || "Untitled job", detail: job.location || "Job posting" });
      }
    });
    applicationRows.forEach((item) => {
      if ([item.full_name, item.email, item.job_title_snapshot].join(" ").toLowerCase().includes(q)) {
        results.push({ section: "candidates", label: item.full_name || "Candidate", detail: item.job_title_snapshot || item.email || "Application" });
      }
    });
    employerRows.forEach((item) => {
      if ([item.company_name, item.contact_name, item.email, item.job_roles].join(" ").toLowerCase().includes(q)) {
        results.push({ section: "employers", label: item.company_name || "Employer", detail: item.job_roles || item.contact_name || "Request" });
      }
    });
    talentRows.forEach((item) => {
      if ([item.full_name, item.email, item.target_roles].join(" ").toLowerCase().includes(q)) {
        results.push({ section: "talent", label: item.full_name || "Talent profile", detail: item.target_roles || item.email || "Profile" });
      }
    });
    return results.slice(0, 8);
  }, [q, jobRows, applicationRows, employerRows, talentRows]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside className={`${mobileMenu ? "fixed inset-0 z-50 flex" : "hidden"} lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:w-72`}>
        <button aria-label="Close navigation" className="absolute inset-0 bg-slate-950/40 lg:hidden" onClick={() => setMobileMenu(false)} />
        <div className="relative flex h-full w-72 flex-col bg-slate-950 px-5 py-6 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Circle Wave</p>
              <p className="mt-1 text-xl font-bold">Admin workspace</p>
            </div>
            <button className="rounded-lg p-2 text-slate-300 hover:bg-white/10 lg:hidden" onClick={() => setMobileMenu(false)}>×</button>
          </div>
          <nav className="mt-8 grid gap-1">
            {nav.map(([key, label, badge]) => (
              <button key={key} onClick={() => selectSection(key)} className={`flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${section === key ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}>
                <span>{label}</span>
                {badge > 0 && <span className="min-w-6 rounded-full bg-white/15 px-2 py-0.5 text-center text-xs">{badge}</span>}
              </button>
            ))}
          </nav>
          <div className="mt-auto grid gap-2 border-t border-white/10 pt-5">
            <Link href="/" className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white">View website</Link>
            <button onClick={async () => { await fetch("/api/admin-logout", { method: "POST" }); window.location.href = "/admin/login"; }} className="rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white">Log out</button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex min-h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
            <button className="rounded-xl border border-slate-200 px-3 py-2 font-semibold lg:hidden" onClick={() => setMobileMenu(true)}>Menu</button>
            <div className="relative flex-1">
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search jobs, candidates, companies, emails…" className="input w-full max-w-2xl" />
              {q && globalMatches.length > 0 && (
                <div className="absolute left-0 top-full z-30 mt-2 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  {globalMatches.map((item, index) => (
                    <button key={`${item.section}-${index}`} onClick={() => { selectSection(item.section); setQuery(""); }} className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left hover:bg-slate-50">
                      <span><strong className="block text-sm">{item.label}</strong><span className="text-xs text-slate-500">{item.detail}</span></span>
                      <span className="text-xs font-semibold uppercase text-blue-600">{item.section}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="relative rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold" title="Action items">Alerts<span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700">{expiredJobs.length + newApplications.length + newEmployers.length}</span></button>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          {section === "overview" && <Overview jobs={jobRows} applications={applicationRows} employers={employerRows} talent={talentRows} activity={activity} onNavigate={selectSection} />}
          {section === "jobs" && <JobsWorkspace rows={jobRows} setRows={setJobRows} query={q} statusFilter={statusFilter} setStatusFilter={setStatusFilter} openEditor={(record) => setDrawer({ kind: "job", record })} />}
          {section === "candidates" && <RecruitmentWorkspace title="Candidates" entity="job_application" rows={applicationRows} statuses={applicationStatuses} query={q} statusFilter={statusFilter} setStatusFilter={setStatusFilter} view={candidateView} setView={setCandidateView} openRecord={(record) => setDrawer({ kind: "record", entity: "job_application", record })} />}
          {section === "employers" && <RecruitmentWorkspace title="Employer requests" entity="employer_request" rows={employerRows} statuses={employerStatuses} query={q} statusFilter={statusFilter} setStatusFilter={setStatusFilter} openRecord={(record) => setDrawer({ kind: "record", entity: "employer_request", record })} />}
          {section === "talent" && <RecruitmentWorkspace title="Talent network" entity="talent_network" rows={talentRows} statuses={talentStatuses} query={q} statusFilter={statusFilter} setStatusFilter={setStatusFilter} openRecord={(record) => setDrawer({ kind: "record", entity: "talent_network", record })} />}
          {section === "activity" && <ActivityWorkspace rows={activity} />}
          {section === "messages" && <MessagesWorkspace rows={messages} query={q} />}
          {section === "settings" && <SettingsWorkspace />}
        </main>
      </div>

      {drawer?.kind === "job" && <JobDrawer record={drawer.record} onClose={() => setDrawer(null)} onSaved={(record) => { setJobRows((current) => { const exists = current.some((item) => item.id === record.id); return exists ? current.map((item) => item.id === record.id ? record : item) : [record, ...current]; }); setDrawer(null); }} />}
      {drawer?.kind === "record" && <RecordDrawer entity={drawer.entity} record={drawer.record} onClose={() => setDrawer(null)} onSaved={(updated) => { const setter = drawer.entity === "job_application" ? setApplicationRows : drawer.entity === "employer_request" ? setEmployerRows : setTalentRows; setter((current) => current.map((item) => item.id === updated.id ? updated : item)); setDrawer(null); }} />}
    </div>
  );
}

function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">{eyebrow}</p><h1 className="mt-2 text-3xl font-bold tracking-tight">{title}</h1><p className="mt-2 max-w-3xl text-slate-600">{description}</p></div>{action}</div>;
}

function Stat({ label, value, hint }: { label: string; value: number; hint: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p><p className="mt-1 text-xs text-slate-500">{hint}</p></div>;
}

function Overview({ jobs, applications, employers, talent, activity, onNavigate }: { jobs: Job[]; applications: RecruitmentRecord[]; employers: RecruitmentRecord[]; talent: RecruitmentRecord[]; activity: Activity[]; onNavigate: (section: Section) => void }) {
  const active = jobs.filter((item) => item.status === "open" && !isExpired(item)).length;
  const actionItems = [
    { label: "Applications awaiting screening", value: applications.filter((item) => (item.status || "new") === "new").length, section: "candidates" as Section },
    { label: "Employer requests not contacted", value: employers.filter((item) => (item.status || "new") === "new").length, section: "employers" as Section },
    { label: "Expired job deadlines", value: jobs.filter(isExpired).length, section: "jobs" as Section },
    { label: "Talent profiles awaiting review", value: talent.filter((item) => (item.status || "new") === "new").length, section: "talent" as Section },
  ];
  return <div className="grid gap-8"><PageHeading eyebrow="Overview" title="Good to see you" description="Monitor recruitment activity, publishing health, and the queues that need attention." action={<button onClick={() => onNavigate("jobs")} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">Create or manage jobs</button>} />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Stat label="Active jobs" value={active} hint="Visible on the public jobs page" /><Stat label="New applications" value={applications.filter((item) => (item.status || "new") === "new").length} hint="Awaiting first review" /><Stat label="Open employer requests" value={employers.filter((item) => !["closed", "lost"].includes(item.status || "new")).length} hint="Across the employer pipeline" /><Stat label="Talent profiles" value={talent.length} hint="Registered candidates" /></div>
    <div className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]"><section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">Needs attention</h2><div className="mt-4 divide-y divide-slate-100">{actionItems.map((item) => <button key={item.label} onClick={() => onNavigate(item.section)} className="flex w-full items-center justify-between py-4 text-left hover:text-blue-700"><span className="font-medium">{item.label}</span><span className={`rounded-full px-3 py-1 text-sm font-bold ${item.value ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>{item.value}</span></button>)}</div></section>
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">Recent activity</h2><div className="mt-4 grid gap-4">{activity.slice(0, 6).map((item) => <div key={item.id} className="border-l-2 border-blue-200 pl-4"><p className="text-sm font-semibold">{item.note || item.action || "Recruitment update"}</p><p className="mt-1 text-xs text-slate-500">{dateTime(item.created_at)} · {item.entity_type || "record"}</p></div>)}{activity.length === 0 && <p className="text-sm text-slate-500">No activity recorded yet.</p>}</div></section></div>
  </div>;
}

function JobsWorkspace({ rows, setRows, query, statusFilter, setStatusFilter, openEditor }: { rows: Job[]; setRows: React.Dispatch<React.SetStateAction<Job[]>>; query: string; statusFilter: string; setStatusFilter: (value: string) => void; openEditor: (job: Job | null) => void }) {
  const filtered = rows.filter((job) => {
    const text = [job.title, job.location, job.department, job.slug].join(" ").toLowerCase();
    const status = isExpired(job) ? "expired" : job.status === "open" ? "active" : "inactive";
    return (!query || text.includes(query)) && (!statusFilter || status === statusFilter);
  });
  async function toggle(job: Job) {
    const next = job.status === "open" ? "closed" : "open";
    const response = await fetch("/api/job-postings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...jobForm(job), id: job.id, status: next, slug: slugify(job.slug || job.title || "") }) });
    const result = await response.json().catch(() => null);
    if (!response.ok) return window.alert(result?.error || "Unable to update job visibility.");
    setRows((current) => current.map((item) => item.id === job.id ? { ...item, status: next } : item));
  }
  return <div className="grid gap-6"><PageHeading eyebrow="Publishing" title="Jobs" description="Manage published, inactive, and expired roles without leaving the list." action={<div className="flex gap-3"><Link href="/jobs" target="_blank" className="rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold">View public jobs</Link><button onClick={() => openEditor(null)} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">+ Create job</button></div>} />
    <div className="flex flex-wrap gap-2">{[["", "All"], ["active", "Active"], ["inactive", "Inactive"], ["expired", "Expired"]].map(([value, label]) => <button key={value} onClick={() => setStatusFilter(value)} className={`rounded-full px-4 py-2 text-sm font-semibold ${statusFilter === value ? "bg-slate-900 text-white" : "border border-slate-200 bg-white"}`}>{label}</button>)}</div>
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="overflow-x-auto"><table className="min-w-full text-sm"><thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4">Job</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Location</th><th className="px-5 py-4">Deadline</th><th className="px-5 py-4">Featured</th><th className="px-5 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{filtered.map((job) => { const expired = isExpired(job); const active = job.status === "open" && !expired; return <tr key={job.id} className="hover:bg-slate-50"><td className="px-5 py-4"><p className="font-semibold">{job.title || "Untitled job"}</p><p className="text-xs text-slate-500">/{job.slug}</p></td><td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-bold ${expired ? "bg-red-100 text-red-700" : active ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-700"}`}>{expired ? "Expired" : active ? "Active" : "Inactive"}</span></td><td className="px-5 py-4">{job.location || "—"}</td><td className="px-5 py-4">{date(job.application_deadline)}</td><td className="px-5 py-4">{job.featured ? "Yes" : "No"}</td><td className="px-5 py-4"><div className="flex justify-end gap-2"><button onClick={() => openEditor(job)} className="rounded-lg border border-slate-300 px-3 py-2 font-semibold">Edit</button>{job.status === "open" && !expired && job.slug && <Link href={`/jobs/${job.slug}`} target="_blank" className="rounded-lg border border-slate-300 px-3 py-2 font-semibold">View</Link>}<button onClick={() => toggle(job)} className={`rounded-lg px-3 py-2 font-semibold text-white ${job.status === "open" ? "bg-slate-700" : "bg-green-600"}`}>{job.status === "open" ? "Set inactive" : "Set active"}</button></div></td></tr>; })}</tbody></table></div>{filtered.length === 0 && <p className="p-8 text-center text-slate-500">No jobs match the current filters.</p>}</div>
  </div>;
}

function RecruitmentWorkspace({ title, entity, rows, statuses, query, statusFilter, setStatusFilter, view = "table", setView, openRecord }: { title: string; entity: RecruitmentEntityType; rows: RecruitmentRecord[]; statuses: readonly string[]; query: string; statusFilter: string; setStatusFilter: (value: string) => void; view?: "table" | "board"; setView?: (value: "table" | "board") => void; openRecord: (record: RecruitmentRecord) => void }) {
  const filtered = rows.filter((item) => { const text = [item.full_name, item.email, item.company_name, item.contact_name, item.job_title_snapshot, item.job_roles, item.target_roles].join(" ").toLowerCase(); return (!query || text.includes(query)) && (!statusFilter || (item.status || "new") === statusFilter); });
  const primary = (item: RecruitmentRecord) => item.company_name || item.full_name || "Untitled record";
  const secondary = (item: RecruitmentRecord) => item.job_roles || item.job_title_snapshot || item.target_roles || item.email || "—";
  return <div className="grid gap-6"><PageHeading eyebrow="Recruitment operations" title={title} description={`Search, review, update status, and record private notes for ${title.toLowerCase()}.`} action={setView && <div className="rounded-xl border border-slate-200 bg-white p-1"><button onClick={() => setView("table")} className={`rounded-lg px-4 py-2 text-sm font-semibold ${view === "table" ? "bg-slate-900 text-white" : ""}`}>Table</button><button onClick={() => setView("board")} className={`rounded-lg px-4 py-2 text-sm font-semibold ${view === "board" ? "bg-slate-900 text-white" : ""}`}>Board</button></div>} />
    <div className="flex flex-wrap gap-2"><button onClick={() => setStatusFilter("")} className={`rounded-full px-4 py-2 text-sm font-semibold ${!statusFilter ? "bg-slate-900 text-white" : "border border-slate-200 bg-white"}`}>All</button>{statuses.map((status) => <button key={status} onClick={() => setStatusFilter(status)} className={`rounded-full px-4 py-2 text-sm font-semibold ${statusFilter === status ? "bg-slate-900 text-white" : "border border-slate-200 bg-white"}`}>{humanizeStatus(status)}</button>)}</div>
    {view === "board" ? <div className="grid gap-4 overflow-x-auto pb-4" style={{ gridTemplateColumns: `repeat(${statuses.length}, minmax(260px, 1fr))` }}>{statuses.map((status) => <section key={status} className="rounded-2xl bg-slate-200/70 p-3"><div className="flex items-center justify-between px-1 py-2"><h2 className="font-bold">{humanizeStatus(status)}</h2><span className="rounded-full bg-white px-2 py-1 text-xs font-bold">{filtered.filter((item) => (item.status || "new") === status).length}</span></div><div className="grid gap-3">{filtered.filter((item) => (item.status || "new") === status).map((item) => <button key={item.id} onClick={() => openRecord(item)} className="rounded-xl bg-white p-4 text-left shadow-sm hover:shadow-md"><p className="font-semibold">{primary(item)}</p><p className="mt-1 text-sm text-slate-500">{secondary(item)}</p><p className="mt-3 text-xs text-slate-400">{date(item.created_at)}</p></button>)}</div></section>)}</div> : <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="overflow-x-auto"><table className="min-w-full text-sm"><thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4">Name</th><th className="px-5 py-4">Role / request</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Received</th><th className="px-5 py-4 text-right">Action</th></tr></thead><tbody className="divide-y divide-slate-100">{filtered.map((item) => <tr key={item.id} className="hover:bg-slate-50"><td className="px-5 py-4"><p className="font-semibold">{primary(item)}</p><p className="text-xs text-slate-500">{item.email || item.contact_name || "—"}</p></td><td className="px-5 py-4">{secondary(item)}</td><td className="px-5 py-4"><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{humanizeStatus(item.status || "new")}</span></td><td className="px-5 py-4">{date(item.created_at)}</td><td className="px-5 py-4 text-right"><button onClick={() => openRecord(item)} className="rounded-lg border border-slate-300 px-3 py-2 font-semibold">Open</button></td></tr>)}</tbody></table></div>{filtered.length === 0 && <p className="p-8 text-center text-slate-500">No matching records.</p>}</div>}
  </div>;
}

function ActivityWorkspace({ rows }: { rows: Activity[] }) {
  return <div className="grid gap-6"><PageHeading eyebrow="Audit history" title="Activity" description="Review recent pipeline and note changes across recruitment operations." /><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="grid gap-5">{rows.map((item) => <div key={item.id} className="grid gap-2 border-l-2 border-blue-200 pl-4 sm:grid-cols-[1fr_auto]"><div><p className="font-semibold">{item.note || item.action || "Recruitment update"}</p><p className="mt-1 text-sm text-slate-500">{item.entity_type} · {item.entity_id}</p>{item.previous_value !== item.new_value && <p className="mt-1 text-sm text-slate-600">{item.previous_value || "—"} → {item.new_value || "—"}</p>}</div><time className="text-xs text-slate-500">{dateTime(item.created_at)}</time></div>)}{rows.length === 0 && <p className="text-slate-500">No activity recorded yet.</p>}</div></div></div>;
}

function MessagesWorkspace({ rows, query }: { rows: Message[]; query: string }) {
  const filtered = rows.filter((item) => !query || [item.full_name, item.email, item.company, item.subject, item.message].join(" ").toLowerCase().includes(query));
  return <div className="grid gap-6"><PageHeading eyebrow="Inbox" title="Messages" description="Review contact-form messages and follow up from your preferred email client." /><div className="grid gap-4">{filtered.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><h2 className="text-lg font-bold">{item.subject || "Contact message"}</h2><p className="mt-1 text-sm text-slate-500">{item.full_name || "Unknown sender"} · {item.company || "No company"}</p></div><div className="flex gap-2"><a href={`mailto:${item.email || ""}`} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Reply by email</a></div></div><p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">{item.message || "—"}</p><p className="mt-4 text-xs text-slate-400">{dateTime(item.created_at)} · {item.email}</p></article>)}{filtered.length === 0 && <p className="rounded-2xl bg-white p-8 text-center text-slate-500">No matching messages.</p>}</div></div>;
}

function SettingsWorkspace() {
  return <div className="grid gap-6"><PageHeading eyebrow="Administration" title="Settings" description="Quick links for the current single-admin configuration." /><div className="grid gap-4 md:grid-cols-2"><section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-bold">Public website</h2><p className="mt-2 text-sm text-slate-600">Review the candidate-facing experience and published openings.</p><div className="mt-5 flex flex-wrap gap-3"><Link href="/" target="_blank" className="rounded-xl border border-slate-300 px-4 py-2 font-semibold">Open homepage</Link><Link href="/jobs" target="_blank" className="rounded-xl border border-slate-300 px-4 py-2 font-semibold">Open jobs</Link></div></section><section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-bold">Session</h2><p className="mt-2 text-sm text-slate-600">The dashboard currently uses the secure single-admin session.</p><button onClick={async () => { await fetch("/api/admin-logout", { method: "POST" }); window.location.href = "/admin/login"; }} className="mt-5 rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white">Log out</button></section></div></div>;
}

function DrawerShell({ title, subtitle, onClose, children }: { title: string; subtitle: string; onClose: () => void; children: React.ReactNode }) {
  return <div className="fixed inset-0 z-50 flex justify-end"><button aria-label="Close drawer" className="absolute inset-0 bg-slate-950/45" onClick={onClose} /><aside className="relative h-full w-full max-w-2xl overflow-y-auto bg-white shadow-2xl"><header className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white px-6 py-5"><div><h2 className="text-2xl font-bold">{title}</h2><p className="mt-1 text-sm text-slate-500">{subtitle}</p></div><button onClick={onClose} className="rounded-xl border border-slate-200 px-3 py-2 font-bold">×</button></header><div className="p-6">{children}</div></aside></div>;
}

function JobDrawer({ record, onClose, onSaved }: { record: Job | null; onClose: () => void; onSaved: (record: Job) => void }) {
  const [form, setForm] = useState(jobForm(record));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  function change(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) { const { name, value, type } = event.target; const checked = event.target instanceof HTMLInputElement ? event.target.checked : false; setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value, ...(name === "title" && !current.slug ? { slug: slugify(value) } : {}) })); }
  async function submit(event: React.FormEvent) { event.preventDefault(); setSaving(true); setError(""); const response = await fetch("/api/job-postings", { method: record ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, ...(record ? { id: record.id } : {}), slug: slugify(form.slug || form.title) }) }); const result = await response.json().catch(() => null); setSaving(false); if (!response.ok) return setError(result?.error || "Unable to save job."); onSaved({ ...(record || { id: crypto.randomUUID(), created_at: new Date().toISOString() }), ...form, slug: slugify(form.slug || form.title) }); }
  return <DrawerShell title={record ? "Edit job" : "Create job"} subtitle="Update role details and publishing visibility without leaving the jobs list." onClose={onClose}><form onSubmit={submit} className="grid gap-5"><div className="grid gap-5 sm:grid-cols-2"><Field label="Job title"><input className="input" name="title" value={form.title} onChange={change} required /></Field><Field label="Slug"><input className="input" name="slug" value={form.slug} onChange={change} required /></Field><Field label="Department"><input className="input" name="department" value={form.department} onChange={change} /></Field><Field label="Industry"><input className="input" name="industry" value={form.industry} onChange={change} /></Field><Field label="Location"><input className="input" name="location" value={form.location} onChange={change} /></Field><Field label="Work model"><select className="input" name="work_model" value={form.work_model} onChange={change}><option value="">Select</option><option>Remote</option><option>Hybrid</option><option>On-site</option></select></Field><Field label="Employment type"><select className="input" name="employment_type" value={form.employment_type} onChange={change}><option value="">Select</option><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Temporary</option></select></Field><Field label="Salary range"><input className="input" name="salary_range" value={form.salary_range} onChange={change} /></Field><Field label="Application deadline"><input className="input" type="date" name="application_deadline" value={form.application_deadline} onChange={change} /></Field><Field label="Visibility"><select className="input" name="status" value={form.status} onChange={change}><option value="closed">Inactive — hidden publicly</option><option value="open">Active — visible publicly</option></select></Field></div><label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" name="featured" checked={form.featured} onChange={change} /> Featured job</label><TextArea label="Short summary" name="short_summary" value={form.short_summary} onChange={change} rows={3} /><TextArea label="Description" name="description" value={form.description} onChange={change} rows={6} required /><TextArea label="Responsibilities" name="responsibilities" value={form.responsibilities} onChange={change} rows={5} /><TextArea label="Requirements" name="requirements" value={form.requirements} onChange={change} rows={5} /><TextArea label="Preferred qualifications" name="preferred_qualifications" value={form.preferred_qualifications} onChange={change} rows={4} />{error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}<div className="sticky bottom-0 -mx-6 mt-4 flex justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4"><button type="button" onClick={onClose} className="rounded-xl border border-slate-300 px-5 py-3 font-semibold">Cancel</button><button disabled={saving} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-60">{saving ? "Saving…" : form.status === "open" ? "Save and activate" : "Save as inactive"}</button></div></form></DrawerShell>;
}

function RecordDrawer({ entity, record, onClose, onSaved }: { entity: RecruitmentEntityType; record: RecruitmentRecord; onClose: () => void; onSaved: (record: RecruitmentRecord) => void }) {
  const statuses = entity === "job_application" ? applicationStatuses : entity === "employer_request" ? employerStatuses : talentStatuses;
  const [status, setStatus] = useState(record.status || "new");
  const [notes, setNotes] = useState(record.internal_notes || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  async function save() { setSaving(true); setError(""); const response = await fetch("/api/admin/recruitment", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ entityType: entity, id: record.id, status, internalNotes: notes }) }); const result = await response.json().catch(() => null); setSaving(false); if (!response.ok) return setError(result?.error || "Unable to save update."); onSaved({ ...record, status, internal_notes: notes, status_updated_at: new Date().toISOString() }); }
  const title = record.company_name || record.full_name || "Recruitment record";
  return <DrawerShell title={title} subtitle={record.job_roles || record.job_title_snapshot || record.target_roles || record.email || "Recruitment detail"} onClose={onClose}><div className="grid gap-6"><div className="grid gap-4 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2"><Detail label="Email" value={record.email} /><Detail label="Phone" value={record.phone} /><Detail label="Location" value={record.location} /><Detail label="Received" value={dateTime(record.created_at)} /><Detail label="Reference" value={record.application_reference || record.registration_reference} /><Detail label="Last updated" value={dateTime(record.status_updated_at)} /></div><Field label="Pipeline status"><select className="input" value={status} onChange={(event) => setStatus(event.target.value)}>{statuses.map((item) => <option key={item} value={item}>{humanizeStatus(item)}</option>)}</select></Field><TextArea label="Private internal notes" value={notes} onChange={(event) => setNotes(event.target.value)} rows={8} maxLength={4000} placeholder="Screening observations, follow-up context, or next action." />{record.resume_url && <a href={record.resume_url} target="_blank" rel="noreferrer" className="w-fit rounded-xl border border-slate-300 px-4 py-3 font-semibold">Download résumé</a>}{record.email && <a href={`mailto:${record.email}`} className="w-fit rounded-xl border border-slate-300 px-4 py-3 font-semibold">Email contact</a>}{error && <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}<div className="sticky bottom-0 -mx-6 flex justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4"><button onClick={onClose} className="rounded-xl border border-slate-300 px-5 py-3 font-semibold">Cancel</button><button onClick={save} disabled={saving} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-60">{saving ? "Saving…" : "Save update"}</button></div></div></DrawerShell>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="grid gap-2 text-sm font-semibold text-slate-700"><span>{label}</span>{children}</label>; }
function TextArea({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) { return <label className="grid gap-2 text-sm font-semibold text-slate-700"><span>{label}</span><textarea {...props} className="input min-h-28 resize-y" /></label>; }
function Detail({ label, value }: { label: string; value?: string | null }) { return <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-1 break-words text-sm text-slate-800">{value || "—"}</p></div>; }
