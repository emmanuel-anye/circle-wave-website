"use client";

import { trackConversion } from "@/lib/analytics";
import type { JobFilters } from "@/lib/jobs";

type Options = {
  locations: string[];
  employmentTypes: string[];
  workModels: string[];
  industries: string[];
};

export default function JobSearchForm({
  filters,
  options,
}: {
  filters: JobFilters;
  options: Options;
}) {
  return (
    <form
      action="/jobs"
      method="get"
      onSubmit={(event) => {
        const formData = new FormData(event.currentTarget);
        trackConversion({
          name: "job_search",
          properties: {
            has_keyword: Boolean(String(formData.get("q") ?? "").trim()),
            filter_count: Array.from(formData.values()).filter((value) =>
              Boolean(String(value).trim())
            ).length,
          },
        });
      }}
      className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2 lg:grid-cols-5"
      aria-label="Filter open positions"
    >
      <div className="lg:col-span-2">
        <label htmlFor="job-keyword" className="mb-2 block text-sm font-medium text-slate-700">
          Keyword
        </label>
        <input
          id="job-keyword"
          name="q"
          type="search"
          defaultValue={filters.q}
          placeholder="Title, skill, or department"
          className="input"
        />
      </div>
      <FilterSelect
        id="job-location"
        name="location"
        label="Location"
        value={filters.location}
        options={options.locations}
      />
      <FilterSelect
        id="job-type"
        name="type"
        label="Employment type"
        value={filters.employmentType}
        options={options.employmentTypes}
      />
      <FilterSelect
        id="job-work"
        name="work"
        label="Workplace"
        value={filters.workModel}
        options={options.workModels}
      />
      {options.industries.length > 0 && (
        <FilterSelect
          id="job-industry"
          name="industry"
          label="Industry"
          value={filters.industry}
          options={options.industries}
        />
      )}
      <div className="flex items-end lg:col-span-2">
        <button
          type="submit"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
        >
          Search jobs
        </button>
      </div>
    </form>
  );
}

function FilterSelect({
  id,
  name,
  label,
  value,
  options,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  options: string[];
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <select id={id} name={name} defaultValue={value} className="input">
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
