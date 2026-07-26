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

type RecordBase = {
  id: string;
  created_at?: string | null;
  status?: string | null;
  internal_notes?: string | null;
  status_updated_at?: string | null;
};

type Application = RecordBase & {
  full_name?: string | null;
  email?: string | null;
  location?: string | null;
  experience_level?: string | null;
  job_title_snapshot?: string | null;
  application_reference?: string | null;
};

type Employer = RecordBase & {
  company_name?: string | null;
  contact_name?: string | null;
  email?: string | null;
  job_roles?: string | null;
  hiring_timeline?: string | null;
};

type Talent = RecordBase & {
  full_name?: string | null;
  email?: string | null;
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

function valueOrDash(value?: string | null) {
  return value?.trim() || "—";
}

function formatDate(value?: string | null) {
  return value ? new Date(value).toLocaleString() : "—";
}

function csvEscape(value: unknown) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function downloadCsv(filename: string, rows: Record<string, unknown>[]) {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.map(csvEscape).join(","),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(",")),
  ].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function PipelineCard({
  entityType,
  record,
  title,
  subtitle,
  details,
  statuses,
  onSaved,
}: {
  entityType: RecruitmentEntityType;
  record: RecordBase;
  title: string;
  subtitle: string;
  details: Array<[string, string | null | undefined]>;
  statuses: readonly string[];
  onSaved: (id: string, status: string, internalNotes: string) => void;
}) {
  const [status, setStatus] = useState(record.status || "new");
  const [internalNotes, setInternalNotes] = useState(record.internal_notes || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/recruitment", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entityType, id: record.id, status, internalNotes }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "Unable to save update.");
      onSaved(record.id, status, internalNotes);
      setMessage("Saved");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save update.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        </div>
        <div className="min-w-48">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Pipeline status
          </label>
          <select className="input mt-2" value={status} onChange={(event) => setStatus(event.target.value)}>
            {statuses.map((item) => (
              <option key={item} value={item}>{humanizeStatus(item)}</option>
            ))}
          </select>
        </div>
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {details.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
            <dd className="mt-1 break-words text-sm text-slate-700">{valueOrDash(value)}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6">
        <label className="text-sm font-semibold text-slate-800" htmlFor={`notes-${record.id}`}>
          Private internal notes
        </label>
        <textarea
          id={`notes-${record.id}`}
          className="input mt-2 min-h-28"
          maxLength={4000}
          value={internalNotes}
          onChange={(event) => setInternalNotes(event.target.value)}
          placeholder="Screening observations, follow-up context, or next action."
        />
      </div>

      <div className="mt-4 flex items-center gap-4">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save update"}
        </button>
        <p role="status" className="text-sm text-slate-600">{message}</p>
      </div>
    </article>
  );
}

export default function RecruitmentOperationsClient({ applications, employers, talent, activity }: Props) {
  const [tab, setTab] = useState<Tab>("applications");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [applicationRows, setApplicationRows] = useState(applications);
  const [employerRows, setEmployerRows] = useState(employers);
  const [talentRows, setTalentRows] = useState(talent);

  const currentStatuses = tab === "applications" ? applicationStatuses : tab === "employers" ? employerStatuses : talentStatuses;

  const filteredApplications = useMemo(() => applicationRows.filter((item) => {
    const text = [item.full_name, item.email, item.location, item.job_title_snapshot, item.application_reference].join(" ").toLowerCase();
    return (!query || text.includes(query.toLowerCase())) && (!statusFilter || item.status === statusFilter);
  }), [applicationRows, query, statusFilter]);

  const filteredEmployers = useMemo(() => employerRows.filter((item) => {
    const text = [item.company_name, item.contact_name, item.email, item.job_roles, item.hiring_timeline].join(" ").toLowerCase();
    return (!query || text.includes(query.toLowerCase())) && (!statusFilter || item.status === statusFilter);
  }), [employerRows, query, statusFilter]);

  const filteredTalent = useMemo(() => talentRows.filter((item) => {
    const text = [item.full_name, item.email, item.location, item.target_roles, item.registration_reference].join(" ").toLowerCase();
    return (!query || text.includes(query.toLowerCase())) && (!statusFilter || item.status === statusFilter);
  }), [talentRows, query, statusFilter]);

  function selectTab(next: Tab) {
    setTab(next);
    setStatusFilter("");
  }

  function updateRow(entity: RecruitmentEntityType, id: string, status: string, internal_notes: string) {
    const updater = <T extends RecordBase>(rows: T[]) => rows.map((item) => item.id === id ? { ...item, status, internal_notes } : item);
    if (entity === "job_application") setApplicationRows(updater);
    if (entity === "employer_request") setEmployerRows(updater);
    if (entity === "talent_network") setTalentRows(updater);
  }

  const visibleRows = tab === "applications" ? filteredApplications : tab === "employers" ? filteredEmployers : filteredTalent;

  return (
    <div className="mt-10">
      <div className="grid gap-4 sm:grid-cols-3">
        <Summary label="Applications" value={applicationRows.length} />
        <Summary label="Employer opportunities" value={employerRows.length} />
        <Summary label="Talent profiles" value={talentRows.length} />
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap gap-3">
          {(["applications", "employers", "talent", "activity"] as Tab[]).map((item) => (
            <button key={item} type="button" onClick={() => selectTab(item)} className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${tab === item ? "bg-blue-600 text-white" : "border border-slate-200 bg-white text-slate-700"}`}>
              {item === "applications" ? "Applications" : item === "employers" ? "Employer pipeline" : item === "talent" ? "Talent network" : "Activity"}
            </button>
          ))}
          <Link href="/admin" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700">Submissions dashboard</Link>
        </div>

        {tab !== "activity" && (
          <div className="mt-5 grid gap-4 md:grid-cols-[1fr_220px_auto]">
            <input className="input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search names, email, role, company, or reference" />
            <select className="input" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="">All statuses</option>
              {currentStatuses.map((status) => <option key={status} value={status}>{humanizeStatus(status)}</option>)}
            </select>
            <button type="button" onClick={() => downloadCsv(`circle-wave-${tab}.csv`, visibleRows as unknown as Record<string, unknown>[])} className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">Export CSV</button>
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-5">
        {tab === "applications" && filteredApplications.map((item) => (
          <PipelineCard key={item.id} entityType="job_application" record={item} title={valueOrDash(item.full_name)} subtitle={valueOrDash(item.application_reference)} statuses={applicationStatuses} onSaved={(id, status, notes) => updateRow("job_application", id, status, notes)} details={[["Email", item.email], ["Role", item.job_title_snapshot], ["Location", item.location], ["Experience", item.experience_level], ["Received", formatDate(item.created_at)], ["Status updated", formatDate(item.status_updated_at)]]} />
        ))}
        {tab === "employers" && filteredEmployers.map((item) => (
          <PipelineCard key={item.id} entityType="employer_request" record={item} title={valueOrDash(item.company_name)} subtitle={valueOrDash(item.contact_name)} statuses={employerStatuses} onSaved={(id, status, notes) => updateRow("employer_request", id, status, notes)} details={[["Email", item.email], ["Roles", item.job_roles], ["Timeline", item.hiring_timeline], ["Received", formatDate(item.created_at)], ["Status updated", formatDate(item.status_updated_at)]]} />
        ))}
        {tab === "talent" && filteredTalent.map((item) => (
          <PipelineCard key={item.id} entityType="talent_network" record={item} title={valueOrDash(item.full_name)} subtitle={valueOrDash(item.registration_reference)} statuses={talentStatuses} onSaved={(id, status, notes) => updateRow("talent_network", id, status, notes)} details={[["Email", item.email], ["Target roles", item.target_roles], ["Location", item.location], ["Received", formatDate(item.created_at)], ["Status updated", formatDate(item.status_updated_at)]]} />
        ))}
        {tab !== "activity" && visibleRows.length === 0 && <p className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-600">No records match the current filters.</p>}
        {tab === "activity" && activity.map((item) => (
          <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-semibold text-slate-900">{humanizeStatus(item.action)}</p>
              <time className="text-sm text-slate-500">{formatDate(item.created_at)}</time>
            </div>
            <p className="mt-2 text-sm text-slate-600">{humanizeStatus(item.entity_type)} · {item.entity_id}</p>
            {item.action === "status_changed" ? <p className="mt-3 text-sm text-slate-700">{humanizeStatus(item.previous_value)} → {humanizeStatus(item.new_value)}</p> : <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{item.note || "Notes updated"}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: number }) {
  return <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-3 text-3xl font-bold text-slate-900">{value}</p></div>;
}
