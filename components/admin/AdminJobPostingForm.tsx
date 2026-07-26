"use client";

import { useMemo, useState } from "react";

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

const emptyForm = {
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
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function formFromJob(job: JobPosting) {
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

export default function AdminJobPostingForm({ jobPostings }: { jobPostings: JobPosting[] }) {
  const [rows, setRows] = useState(jobPostings);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const editingJob = useMemo(
    () => rows.find((job) => job.id === editingId) ?? null,
    [editingId, rows]
  );

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = event.target;
    const checked = event.target instanceof HTMLInputElement ? event.target.checked : false;

    setFormData((previous) => {
      const updated = {
        ...previous,
        [name]: type === "checkbox" ? checked : value,
      };
      if (name === "title" && !previous.slug) updated.slug = slugify(value);
      return updated;
    });
  }

  function beginEdit(job: JobPosting) {
    setEditingId(job.id);
    setFormData(formFromJob(job));
    setSuccess("");
    setErrorMsg("");
    document.getElementById("job-editor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function resetEditor() {
    setEditingId(null);
    setFormData(emptyForm);
    setSuccess("");
    setErrorMsg("");
  }

  async function save(payload = formData, id = editingId) {
    const response = await fetch("/api/job-postings", {
      method: id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        ...(id ? { id } : {}),
        slug: slugify(payload.slug || payload.title),
      }),
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) throw new Error(data?.error || "Unable to save job posting.");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setSuccess("");
    setErrorMsg("");

    try {
      await save();
      setSuccess(editingId ? "Job posting updated successfully." : "Job posting created successfully.");
      window.location.reload();
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function toggleVisibility(job: JobPosting) {
    const nextStatus = job.status === "open" ? "closed" : "open";
    setLoading(true);
    setSuccess("");
    setErrorMsg("");

    try {
      await save({ ...formFromJob(job), status: nextStatus }, job.id);
      setRows((current) =>
        current.map((item) => (item.id === job.id ? { ...item, status: nextStatus } : item))
      );
      setSuccess(nextStatus === "open" ? "Job activated and published." : "Job deactivated and hidden.");
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Unable to change job visibility.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="job-editor" className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            {editingJob ? `Edit ${editingJob.title || "job posting"}` : "Create Job Posting"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Active jobs appear on the public open-roles page. Inactive jobs remain available here but are hidden publicly.
          </p>
        </div>
        {editingJob && (
          <button type="button" onClick={resetEditor} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Cancel editing
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Job Title"><input name="title" value={formData.title} onChange={handleChange} required className="input" /></Field>
          <Field label="Slug"><input name="slug" value={formData.slug} onChange={handleChange} required className="input" /></Field>
          <Field label="Department"><input name="department" value={formData.department} onChange={handleChange} className="input" /></Field>
          <Field label="Industry"><input name="industry" value={formData.industry} onChange={handleChange} className="input" /></Field>
          <Field label="Location"><input name="location" value={formData.location} onChange={handleChange} className="input" /></Field>
          <Field label="Work Model">
            <select name="work_model" value={formData.work_model} onChange={handleChange} className="input">
              <option value="">Select work model</option><option value="Remote">Remote</option><option value="Hybrid">Hybrid</option><option value="On-site">On-site</option>
            </select>
          </Field>
          <Field label="Employment Type">
            <select name="employment_type" value={formData.employment_type} onChange={handleChange} className="input">
              <option value="">Select employment type</option><option value="Full-time">Full-time</option><option value="Part-time">Part-time</option><option value="Contract">Contract</option><option value="Temporary">Temporary</option>
            </select>
          </Field>
          <Field label="Salary Range"><input name="salary_range" value={formData.salary_range} onChange={handleChange} className="input" /></Field>
          <Field label="Application Deadline"><input type="date" name="application_deadline" value={formData.application_deadline} onChange={handleChange} className="input" /></Field>
          <Field label="Visibility">
            <select name="status" value={formData.status} onChange={handleChange} className="input">
              <option value="open">Active — visible publicly</option>
              <option value="closed">Inactive — hidden publicly</option>
            </select>
          </Field>
          <label className="flex items-end gap-3 text-sm font-medium text-slate-700">
            <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="h-4 w-4 rounded border-slate-300" /> Featured job
          </label>
        </div>

        <TextArea label="Short Summary" name="short_summary" value={formData.short_summary} onChange={handleChange} rows={3} />
        <TextArea label="Description" name="description" value={formData.description} onChange={handleChange} rows={5} required />
        <TextArea label="Responsibilities" name="responsibilities" value={formData.responsibilities} onChange={handleChange} rows={5} />
        <TextArea label="Requirements" name="requirements" value={formData.requirements} onChange={handleChange} rows={5} />
        <TextArea label="Preferred Qualifications" name="preferred_qualifications" value={formData.preferred_qualifications} onChange={handleChange} rows={4} />

        <button type="submit" disabled={loading} className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60">
          {loading ? "Saving..." : editingJob ? "Save Job Changes" : "Create Job Posting"}
        </button>
      </form>

      {(success || errorMsg) && (
        <div role={errorMsg ? "alert" : "status"} className={`mt-5 rounded-xl border px-4 py-3 text-sm ${errorMsg ? "border-red-200 bg-red-50 text-red-700" : "border-green-200 bg-green-50 text-green-700"}`}>
          {errorMsg || success}
        </div>
      )}

      <div className="mt-10 border-t border-slate-200 pt-8">
        <h3 className="text-xl font-semibold text-slate-900">Manage Existing Jobs</h3>
        <div className="mt-5 grid gap-4">
          {rows.map((job) => {
            const active = job.status === "open";
            return (
              <article key={job.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h4 className="font-semibold text-slate-900">{job.title || "Untitled job"}</h4>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${active ? "bg-green-100 text-green-800" : "bg-slate-200 text-slate-700"}`}>
                        {active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      {job.location || "No location"} · Deadline: {job.application_deadline || "No deadline"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={() => beginEdit(job)} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Edit</button>
                    <button type="button" disabled={loading} onClick={() => toggleVisibility(job)} className={`rounded-xl px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 ${active ? "bg-slate-700 hover:bg-slate-800" : "bg-green-600 hover:bg-green-700"}`}>
                      {active ? "Set Inactive" : "Set Active"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
          {rows.length === 0 && <p className="text-sm text-slate-600">No job postings have been created yet.</p>}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-medium text-slate-700"><span>{label}</span>{children}</label>;
}

function TextArea({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return <label className="grid gap-2 text-sm font-medium text-slate-700"><span>{label}</span><textarea {...props} className="input min-h-[140px] resize-y" /></label>;
}