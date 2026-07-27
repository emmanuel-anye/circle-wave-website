import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Search, Sparkles } from "lucide-react";
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
      <main className="overflow-hidden bg-white">
        <section className="relative isolate bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 text-white">
          <div className="absolute inset-0 -z-10 opacity-80 [background:radial-gradient(circle_at_15%_25%,rgba(37,99,235,0.4),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(34,211,238,0.28),transparent_26%)]" />
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Open opportunities</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Find work that moves your career forward.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
                Explore current Circle Wave opportunities across customer service, operations, leadership, and support roles.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#open-roles"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-950 shadow-lg transition hover:-translate-y-0.5"
                >
                  Browse open roles
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="/talent-network"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
                >
                  Join the talent network
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[2rem] border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur-xl sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200">
                    <Sparkles className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="font-semibold text-white">A clearer path from search to application</p>
                </div>
                <div className="mt-6 space-y-4">
                  {["Search by role, location, and workplace", "Review clear job details before applying", "Complete a guided three-step application"].map(
                    (item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" aria-hidden="true" />
                        <span className="text-sm leading-6 text-blue-50">{item}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="open-roles" className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <Search className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Search current vacancies</p>
              </div>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Narrow the list to the roles that fit you best
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Filter by keyword, location, working arrangement, employment type, and industry.
              </p>
            </Reveal>

            <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <JobSearchForm filters={filters} options={options} />
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="font-semibold text-slate-800" aria-live="polite">
                  {filteredJobs.length} {filteredJobs.length === 1 ? "open position" : "open positions"}
                </p>
              </div>
              {activeFilters.length > 0 && (
                <Link href="/jobs" className="text-sm font-semibold text-blue-700 underline underline-offset-4">
                  Reset all filters
                </Link>
              )}
            </div>

            {activeFilters.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2" aria-label="Active job filters">
                {activeFilters.map(([key, label]) => (
                  <Link
                    key={key}
                    href={buildJobSearchParams(filters, key)}
                    className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-2 text-sm font-medium text-blue-900 transition hover:bg-blue-100"
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

            <aside className="mt-14 overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white shadow-xl sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-9">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Stay visible</p>
                <h2 className="mt-3 text-2xl font-semibold">No suitable vacancy yet?</h2>
                <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                  Join the talent network to share your recruitment profile for future relevant opportunities.
                </p>
              </div>
              <Link
                href="/talent-network"
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-100 sm:mt-0"
              >
                Join the talent network
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </section>
      </main>
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
    <div className="mt-10 rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm sm:p-12">
      <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
        <Search className="h-6 w-6" aria-hidden="true" />
      </span>
      <h2 className="mt-5 text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-600">{description}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {showReset && (
          <Link
            href="/jobs"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-300 px-5 py-3 font-semibold text-slate-900 hover:bg-slate-50"
          >
            Reset filters
          </Link>
        )}
        <Link
          href="/talent-network"
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Join the talent network
        </Link>
      </div>
    </div>
  );
}
