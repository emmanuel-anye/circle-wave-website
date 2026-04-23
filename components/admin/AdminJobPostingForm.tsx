"use client";

import { useState } from "react";

const initialForm = {
  title: "",
  slug: "",
  department: "",
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
  status: "open",
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

export default function AdminJobPostingForm() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    const checked =
      e.target instanceof HTMLInputElement ? e.target.checked : false;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "title" && !prev.slug) {
        updated.slug = slugify(value);
      }

      return updated;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setErrorMsg("");

    try {
      const response = await fetch("/api/job-postings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          slug: slugify(formData.slug || formData.title),
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Failed to create job posting.");
      }

      setSuccess("Job posting created successfully.");
      setFormData(initialForm);
    } catch (error) {
      setErrorMsg(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">Create Job Posting</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Publish a new open position that can later appear on the public jobs page.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Job Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="input"
              placeholder="Customer Support Specialist"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Slug
            </label>
            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="input"
              placeholder="customer-support-specialist"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Department
            </label>
            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="input"
              placeholder="Customer Support"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Location
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input"
              placeholder="Remote / Rwanda / Cameroon"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Work Model
            </label>
            <select
              name="work_model"
              value={formData.work_model}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select work model</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Employment Type
            </label>
            <select
              name="employment_type"
              value={formData.employment_type}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select employment type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Salary Range
            </label>
            <input
              name="salary_range"
              value={formData.salary_range}
              onChange={handleChange}
              className="input"
              placeholder="$800 - $1,200/month"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Application Deadline
            </label>
            <input
              type="date"
              name="application_deadline"
              value={formData.application_deadline}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input"
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="flex items-end">
            <label className="inline-flex items-center gap-3 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300"
              />
              Featured job
            </label>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Short Summary
          </label>
          <textarea
            name="short_summary"
            value={formData.short_summary}
            onChange={handleChange}
            rows={3}
            className="input min-h-[120px] resize-y"
            placeholder="Short summary that appears in job listings."
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            required
            className="input min-h-[160px] resize-y"
            placeholder="Describe the role, team, and purpose of the position."
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Responsibilities
          </label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            rows={5}
            className="input min-h-[160px] resize-y"
            placeholder="List main responsibilities."
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Requirements
          </label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows={5}
            className="input min-h-[160px] resize-y"
            placeholder="List required qualifications and experience."
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Preferred Qualifications
          </label>
          <textarea
            name="preferred_qualifications"
            value={formData.preferred_qualifications}
            onChange={handleChange}
            rows={4}
            className="input min-h-[140px] resize-y"
            placeholder="List preferred or bonus qualifications."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Job Posting"}
        </button>

        {success && (
          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {errorMsg && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMsg}
          </div>
        )}
      </form>
    </section>
  );
}