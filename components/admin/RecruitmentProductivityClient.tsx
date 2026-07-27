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

type BaseRecord = {
  id: string;
  created_at?: string | null;
  status?: string | null;
  internal_notes?: string | null;
  status_updated_at?: string | null;
  email?: string | null;
};

type Application = BaseRecord & {
  full_name?: string | null;
  location?: string | null;
  experience_level?: string | null;
  job_title_snapshot?: string | null;
  application_reference?: string | null;
};

type Employer = BaseRecord & {
  company_name?: string | null;
  contact_name?: string | null;
  job_roles?: string | null;
  hiring_timeline?: string | null;
};

type Talent = BaseRecord & {
  full_name?: string | null;
  location?: string | null;
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

type Props = {
  applications: Application[];
  employers: Employer[];
  talent: Talent[];
  activity: Activity[];
};

type Tab = "applications" | "employers" | "talent" | "activity";
type View = "table" | "board";
type TemplateKey = "screening" | "interview" | "rejection" | "employer_follow_up";

type Template = {
  label: string;
  subject: string;
  body: (name: string, context: string) => string;
};

const emailTemplates: Record<TemplateKey, Template> = {
  screening: {
    label: "Screening invitation",
    subject: "Next step with Circle Wave",
    body: (name, context) => `Hello ${name},\n\nThank you for your interest in ${context}. We would like to schedule an initial screening conversation. Please reply with your availability over the next few business days.\n\nBest,\nCircle Wave`,
  },
  interview: {
    label: "Interview invitation",
    subject: "Interview invitation from Circle Wave",
    body: (name, context) => `Hello ${name},\n\nWe would like to invite you to interview for ${context}. Please reply with your preferred times and timezone.\n\nBest,\nCircle Wave`,
  },
  rejection: {
    label: "Application update",
    subject: "Update on your Circle Wave application",
    body: (name, context) => `Hello ${name},\n\nThank you for taking the time to apply for ${context}. We will not be progressing your application at this stage, but we appreciate your interest and will keep your profile in mind for relevant opportunities.\n\nBest,\nCircle Wave`,
  },
  employer_follow_up: {
    label: "Employer follow-up",
    subject: "Following up on your hiring request",
    body: (name, context) => `Hello ${name},\n\nThank you for contacting Circle Wave about ${context}. We would like to confirm your priorities, hiring timeline, and next steps. Please share a convenient time for a brief follow-up.\n\nBest,\nCircle Wave`,
  },
};

function formatDate(value?: string | null) {
  return value ? new Date(value).toLocaleString() : "—";
}

function primaryName(tab: Tab, item: Application | Employer | Talent) {
  if (tab === "employers") return (item as Employer).company_name || (item as Employer).contact_name || "Employer";
  return (item as Application | Talent).full_name || "Candidate";
}

function contextLabel(tab: Tab, item: Application | Employer | Talent) {
  if (tab === "applications") return (item as Application).job_title_snapshot || "this opportunity";
  if (tab === "employers") return (item as Employer).job_roles || "your hiring request";
  return (item as Talent).target_roles || "future opportunities";
}

function mailto(item: Application | Employer | Talent, tab: Tab, templateKey: TemplateKey) {
  const template = emailTemplates[templateKey];
  const name = tab === "employers"
    ? (item as Employer).contact_name || (item as Employer).company_name || "there"
    : (item as Application | Talent).full_name || "there";
  const subject = encodeURIComponent(template.subject);
  const body = encodeURIComponent(template.body(name, contextLabel(tab, item)));
  return `mailto:${item.email || ""}?subject=${subject}&body=${body}`;
}

export default function RecruitmentProductivityClient({ applications, employers, talent, activity }: Props) {
  const [tab, setTab] = useState<Tab>("applications");
  const [view, setView] = useState<View>("table");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState("");
  const [bulkSaving, setBulkSaving] = useState(false);
  const [templateKey, setTemplateKey] = useState<TemplateKey>("screening");
  const [applicationRows, setApplicationRows] = useState(applications);
  const [employerRows, setEmployerRows] = useState(employers);
  const [talentRows, setTalentRows] = useState(talent);
  const [message, setMessage] = useState("");

  const statuses = tab === "applications" ? applicationStatuses : tab === "employers" ? employerStatuses : talentStatuses;
  const rows = tab === "applications" ? applicationRows : tab === "employers" ? employerRows : talentRows;
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = useMemo(() => rows.filter((item) => {
    const text = JSON.stringify(item).toLowerCase();
    return (!normalizedQuery || text.includes(normalizedQuery)) && (!statusFilter || (item.status || "new") === statusFilter);
  }), [rows, normalizedQuery, statusFilter]);

  function changeTab(next: Tab) {
    setTab(next);
    setStatusFilter("");
    setSelected([]);
    setMessage("");
    if (next === "activity") return;
    setView(next === "employers" ? "board" : "table");
    setTemplateKey(next === "employers" ? "employer_follow_up" : "screening");
  }

  function updateLocal(entity: RecruitmentEntityType, ids: string[], status: string) {
    const updater = <T extends BaseRecord>(current: T[]) => current.map((item) => ids.includes(item.id) ? { ...item, status, status_updated_at: new Date().toISOString() } : item);
    if (entity === "job_application") setApplicationRows(updater);
    if (entity === "employer_request") setEmployerRows(updater);
    if (entity === "talent_network") setTalentRows(updater);
  }

  async function bulkUpdate() {
    if (!bulkStatus || selected.length === 0 || tab === "activity") return;
    if (!window.confirm(`Move ${selected.length} selected record${selected.length === 1 ? "" : "s"} to ${humanizeStatus(bulkStatus)}?`)) return;
    setBulkSaving(true);
    setMessage("");
    const entityType: RecruitmentEntityType = tab === "applications" ? "job_application" : tab === "employers" ? "employer_request" : "talent_network";
    const results = await Promise.all(selected.map(async (id) => {
      const source = rows.find((item) => item.id === id);
      const response = await fetch("/api/admin/recruitment", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entityType, id, status: bulkStatus, internalNotes: source?.internal_notes || "" }),
      });
      return response.ok;
    }));
    setBulkSaving(false);
    const successfulIds = selected.filter((_, index) => results[index]);
    updateLocal(entityType, successfulIds, bulkStatus);
    setSelected(selected.filter((id) => !successfulIds.includes(id)));
    setMessage(results.every(Boolean) ? `${successfulIds.length} records updated.` : `${successfulIds.length} updated; ${results.length - successfulIds.length} failed.`);
  }

  const allVisibleSelected = filtered.length > 0 && filtered.every((item) => selected.includes(item.id));
  function toggleAll() {
    setSelected(allVisibleSelected ? selected.filter((id) => !filtered.some((item) => item.id === id)) : Array.from(new Set([...selected, ...filtered.map((item) => item.id)])));
  }

  return (
    <div className="mt-8 grid gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Summary label="Applications" value={applicationRows.length} />
        <Summary label="Employer opportunities" value={employerRows.length} />
        <Summary label="Talent profiles" value={talentRows.length} />
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {(["applications", "employers", "talent", "activity"] as Tab[]).map((item) => (
              <button key={item} onClick={() => changeTab(item)} className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${tab === item ? "bg-blue-600 text-white" : "border border-slate-200"}`}>
                {item === "applications" ? "Applications" : item === "employers" ? "Employer pipeline" : item === "talent" ? "Talent network" : "Activity"}
              </button>
            ))}
          </div>
          <Link href="/admin" className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold">Dashboard</Link>
        </div>

        {tab !== "activity" && (
          <>
            <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_210px_auto_auto]">
              <input className="input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search names, email, role, company, or reference" />
              <select className="input" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="">All statuses</option>
                {statuses.map((status) => <option key={status} value={status}>{humanizeStatus(status)}</option>)}
              </select>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-1">
                <button onClick={() => setView("table")} className={`rounded-lg px-4 py-2 text-sm font-semibold ${view === "table" ? "bg-slate-900 text-white" : ""}`}>Table</button>
                <button onClick={() => setView("board")} className={`rounded-lg px-4 py-2 text-sm font-semibold ${view === "board" ? "bg-slate-900 text-white" : ""}`}>Board</button>
              </div>
              <select className="input" value={templateKey} onChange={(event) => setTemplateKey(event.target.value as TemplateKey)}>
                {Object.entries(emailTemplates).filter(([key]) => tab === "employers" ? key === "employer_follow_up" : key !== "employer_follow_up").map(([key, template]) => <option key={key} value={key}>{template.label}</option>)}
              </select>
            </div>

            {selected.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl bg-blue-50 p-4">
                <strong className="text-sm text-blue-900">{selected.length} selected</strong>
                <select className="input max-w-xs" value={bulkStatus} onChange={(event) => setBulkStatus(event.target.value)}>
                  <option value="">Choose new status</option>
                  {statuses.map((status) => <option key={status} value={status}>{humanizeStatus(status)}</option>)}
                </select>
                <button disabled={!bulkStatus || bulkSaving} onClick={bulkUpdate} className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">{bulkSaving ? "Updating…" : "Apply status"}</button>
                <button onClick={() => setSelected([])} className="rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm font-semibold">Clear selection</button>
              </div>
            )}
            {message && <p role="status" className="mt-3 text-sm font-semibold text-slate-600">{message}</p>}
          </>
        )}
      </section>

      {tab === "activity" ? (
        <div className="grid gap-4">
          {activity.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-wrap justify-between gap-3"><strong>{humanizeStatus(item.action)}</strong><time className="text-sm text-slate-500">{formatDate(item.created_at)}</time></div><p className="mt-2 text-sm text-slate-600">{humanizeStatus(item.entity_type)} · {item.entity_id}</p><p className="mt-3 text-sm">{item.action === "status_changed" ? `${humanizeStatus(item.previous_value)} → ${humanizeStatus(item.new_value)}` : item.note || "Notes updated"}</p></article>)}
        </div>
      ) : view === "board" ? (
        <div className="grid auto-cols-[minmax(280px,1fr)] grid-flow-col gap-4 overflow-x-auto pb-4">
          {statuses.map((status) => {
            const lane = filtered.filter((item) => (item.status || "new") === status);
            return <section key={status} className="min-h-56 rounded-2xl border border-slate-200 bg-slate-200/70 p-3"><div className="flex items-center justify-between px-1 py-2"><h2 className="font-bold">{humanizeStatus(status)}</h2><span className="rounded-full bg-white px-2 py-1 text-xs font-bold">{lane.length}</span></div><div className="grid gap-3">{lane.map((item) => <RecordCard key={item.id} tab={tab} item={item} checked={selected.includes(item.id)} templateKey={templateKey} onToggle={() => setSelected((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id])} />)}{lane.length === 0 && <p className="rounded-xl border border-dashed border-slate-300 p-4 text-center text-xs text-slate-500">No records in this stage</p>}</div></section>;
          })}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3"><input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} aria-label="Select all visible records" /></th><th className="px-4 py-3">Name</th><th className="px-4 py-3">Context</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Received</th><th className="px-4 py-3 text-right">Actions</th></tr></thead>
              <tbody className="divide-y divide-slate-100">{filtered.map((item) => <tr key={item.id} className="hover:bg-slate-50"><td className="px-4 py-3"><input type="checkbox" checked={selected.includes(item.id)} onChange={() => setSelected((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id])} aria-label={`Select ${primaryName(tab, item)}`} /></td><td className="px-4 py-3"><p className="font-semibold">{primaryName(tab, item)}</p><p className="text-xs text-slate-500">{item.email || "—"}</p></td><td className="px-4 py-3">{contextLabel(tab, item)}</td><td className="px-4 py-3"><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{humanizeStatus(item.status || "new")}</span></td><td className="px-4 py-3">{formatDate(item.created_at)}</td><td className="px-4 py-3 text-right"><a href={mailto(item, tab, templateKey)} className="rounded-lg border border-slate-300 px-3 py-2 font-semibold">Email template</a></td></tr>)}</tbody>
            </table>
          </div>
          {filtered.length === 0 && <p className="p-8 text-center text-slate-500">No records match the current filters.</p>}
        </div>
      )}
    </div>
  );
}

function RecordCard({ tab, item, checked, templateKey, onToggle }: { tab: Tab; item: Application | Employer | Talent; checked: boolean; templateKey: TemplateKey; onToggle: () => void }) {
  return <article className="rounded-xl bg-white p-4 shadow-sm"><div className="flex items-start gap-3"><input type="checkbox" checked={checked} onChange={onToggle} aria-label={`Select ${primaryName(tab, item)}`} /><div className="min-w-0 flex-1"><p className="font-semibold">{primaryName(tab, item)}</p><p className="mt-1 text-sm text-slate-500">{contextLabel(tab, item)}</p><p className="mt-3 text-xs text-slate-400">{formatDate(item.created_at)}</p><a href={mailto(item, tab, templateKey)} className="mt-3 inline-block rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold">Email template</a></div></div></article>;
}

function Summary({ label, value }: { label: string; value: number }) {
  return <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-3 text-3xl font-bold">{value}</p></div>;
}
