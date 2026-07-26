import Link from "next/link";
import JobCard from "@/components/jobs/JobCard";
import JobSearchForm from "@/components/jobs/JobSearchForm";
import PageTransition from "@/components/ui/PageTransition";
import Reveal from "@/components/ui/Reveal";
import { getPublicJobPostings } from "@/lib/admin-data";
import {
  buildJobSearchParams,
  filterJobs,
  getJobFilterOptions,
  parseJobFilters,
  type JobFilters,
  type JobPosting,
} from "@/lib/jobs";

type JobsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const filterLabels: Array<[keyof JobFilters, string]> = [
  ["q", "Keyword"],
  ["location", "Location"],
  ["employmentType", "Employment type"],
  ["workModel", "Workplace"],
  ["industry", "Industry"],
];

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const jobs = (await getPublicJobPostings()) as JobPosting[];
  const filters = parseJobFilters(await searchParams);
  const filteredJobs = filterJobs(jobs, filters);
  const options = getJobFilterOptions(jobs);
  const activeFilters = filterLabels.filter(([key]) => filters[key]);

  return (
    <PageTransition>
      <section className="bg-slate-50 section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Open positions
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Find an opportunity that fits
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Search Circle Wave’s current openings by role, location, working
              arrangement, and employment type.
            </p>
          </Reveal>

          <div className="mt-10">
            <JobSearchForm filters={filters} options={options} />
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold text-slate-800" aria-live="polite">
              {filteredJobs.length}{" "}
              {filteredJobs.length === 1 ? "open position" : "open positions"}
            </p>
            {activeFilters.length > 0 && (
              <Link
                href="/jobs"
                className="text-sm font-semibold text-blue-700 underline underline-offset-4"
              >
                Reset all filters
              </Link>
            )}
          </div>

          {activeFilters.length > 0 && (
            <div
              className="mt-4 flex flex-wrap gap-2"
              aria-label="Active job filters"
            >
              {activeFilters.map(([key, label]) => (
                <Link
                  key={key}
                  href={buildJobSearchParams(filters, key)}
                  className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-900 hover:bg-blue-100"
                  aria-label={`Remove ${label} filter: ${filters[key]}`}
                >
                  {label}: {filters[key]} <span aria-hidden="true">×</span>
                </Link>
              ))}
            </div>
          )}

          {jobs.length === 0 ? (
            <EmptyState
              title="No open positions right now"
              description="There are no active vacancies to display. You can register your profile for consideration when relevant opportunities become available."
            />
          ) : filteredJobs.length === 0 ? (
            <EmptyState
              title="No positions match these filters"
              description="Try removing a filter or register for the talent network if none of the current roles fit."
              showReset
            />
          ) : (
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}

          <aside className="mt-12 rounded-[2rem] border border-blue-100 bg-blue-50 p-7 sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                No suitable vacancy?
              </h2>
              <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                Join the talent network to share your recruitment profile for
                future relevant opportunities.
              </p>
            </div>
            <Link
              href="/talent-network"
              className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 sm:mt-0"
            >
              Join the talent network
            </Link>
          </aside>
        </div>
      </section>
    </PageTransition>
  );
}

function EmptyState({
  title,
  description,
  showReset = false,
}: {
  title: string;
  description: string;
  showReset?: boolean;
}) {
  return (
    <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-4 max-w-2xl leading-8 text-slate-600">{description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {showReset && (
          <Link
            href="/jobs"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-900 hover:bg-slate-50"
          >
            Reset filters
          </Link>
        )}
        <Link
          href="/talent-network"
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Join the talent network
        </Link>
      </div>
    </div>
  );
}
