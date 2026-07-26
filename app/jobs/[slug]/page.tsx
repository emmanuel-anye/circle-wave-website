import Link from "next/link";
import { notFound } from "next/navigation";
import JobBadges from "@/components/jobs/JobBadges";
import JobCard from "@/components/jobs/JobCard";
import JobViewTracker from "@/components/jobs/JobViewTracker";
import ShareJobButton from "@/components/jobs/ShareJobButton";
import PageTransition from "@/components/ui/PageTransition";
import Reveal from "@/components/ui/Reveal";
import { getPublicJobBySlug, getPublicJobPostings } from "@/lib/admin-data";
import {
  formatJobDeadline,
  getRelatedJobs,
  type JobPosting,
} from "@/lib/jobs";

type JobPageProps = {
  params: Promise<{ slug: string }>;
};

function formatMultiline(text?: string | null) {
  if (!text) return null;

  return text
    .split("\n")
    .filter(Boolean)
    .map((line, index) => (
      <p key={index} className="leading-8 text-slate-600">
        {line}
      </p>
    ));
}

export default async function JobDetailPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = (await getPublicJobBySlug(slug)) as JobPosting | null;

  if (!job) notFound();

  const jobs = (await getPublicJobPostings()) as JobPosting[];
  const relatedJobs = getRelatedJobs(job, jobs);
  const salary = job.salary_range?.trim();

  return (
    <PageTransition>
      <JobViewTracker hasSalary={Boolean(job.salary_range?.trim())} />
      <section className="bg-slate-50 section">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal className="max-w-4xl">
            <JobBadges job={job} />
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              {job.title}
            </h1>
            {job.short_summary && (
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                {job.short_summary}
              </p>
            )}

            <dl className="mt-8 grid gap-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:grid-cols-2 lg:grid-cols-3">
              {job.department && <Meta label="Department" value={job.department} />}
              {job.industry && <Meta label="Industry" value={job.industry} />}
              {job.location && <Meta label="Location" value={job.location} />}
              {job.work_model && <Meta label="Workplace" value={job.work_model} />}
              {job.employment_type && (
                <Meta label="Employment type" value={job.employment_type} />
              )}
              {salary && <Meta label="Salary" value={salary} />}
              <Meta
                label="Application deadline"
                value={formatJobDeadline(job.application_deadline)}
              />
            </dl>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start">
              <Link
                href={`/careers?jobId=${job.id}`}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
              >
                Apply for this role
              </Link>
              <ShareJobButton title={job.title ?? "Circle Wave opportunity"} />
              <Link
                href="/jobs"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-300 px-6 py-3.5 font-semibold text-slate-900 transition hover:bg-slate-50 sm:w-auto"
              >
                Back to jobs
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8">
            <JobSection title="Role description" text={job.description} />
            <JobSection title="Responsibilities" text={job.responsibilities} />
            <JobSection title="Requirements" text={job.requirements} />
            {job.preferred_qualifications && (
              <JobSection
                title="Preferred qualifications"
                text={job.preferred_qualifications}
              />
            )}
          </div>

          {relatedJobs.length > 0 && (
            <section className="mt-16" aria-labelledby="related-jobs-heading">
              <h2
                id="related-jobs-heading"
                className="text-3xl font-bold tracking-tight text-slate-900"
              >
                Related open positions
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Matched using shared job metadata such as department, industry,
                work arrangement, employment type, and location.
              </p>
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                {relatedJobs.map(({ job: relatedJob, reasons }) => (
                  <JobCard
                    key={relatedJob.id}
                    job={relatedJob}
                    relatedReason={reasons.slice(0, 2).join(" and ")}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </PageTransition>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-slate-700">{value}</dd>
    </div>
  );
}

function JobSection({ title, text }: { title: string; text?: string | null }) {
  if (!text) return null;

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <div className="mt-4 space-y-4">{formatMultiline(text)}</div>
    </section>
  );
}
