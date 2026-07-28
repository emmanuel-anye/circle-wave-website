import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
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
  const deadline = formatJobDeadline(job.application_deadline);

  const facts = [
    job.location && { label: "Location", value: job.location, icon: MapPin },
    job.work_model && { label: "Workplace", value: job.work_model, icon: Building2 },
    job.employment_type && {
      label: "Employment type",
      value: job.employment_type,
      icon: BriefcaseBusiness,
    },
    job.department && { label: "Department", value: job.department, icon: Building2 },
    job.industry && { label: "Industry", value: job.industry, icon: BriefcaseBusiness },
    salary && { label: "Salary", value: salary, icon: WalletCards },
    { label: "Application deadline", value: deadline, icon: CalendarDays },
  ].filter(Boolean) as Array<{
    label: string;
    value: string;
    icon: LucideIcon;
  }>;

  return (
    <PageTransition>
      <JobViewTracker hasSalary={Boolean(salary)} />
      <main className="overflow-hidden bg-white">
        <section className="relative isolate bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 text-white">
          <div className="absolute inset-0 -z-10 opacity-70 [background:radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.28),transparent_30%),radial-gradient(circle_at_15%_85%,rgba(59,130,246,0.32),transparent_34%)]" />
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
            <Reveal className="max-w-5xl">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-100 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to all jobs
              </Link>
              <div className="mt-7">
                <JobBadges job={job} />
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {job.title}
              </h1>
              {job.short_summary && (
                <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100 sm:text-xl">
                  {job.short_summary}
                </p>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/careers?jobId=${job.id}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-blue-950 shadow-lg transition hover:-translate-y-0.5"
                >
                  Apply for this role
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <ShareJobButton title={job.title ?? "Circle Wave opportunity"} />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {facts.slice(0, 4).map((fact) => (
                <Meta key={fact.label} {...fact} />
              ))}
            </dl>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
            <div className="space-y-8">
              <JobSection
                title="Role overview"
                text={job.description}
                eyebrow="What you will be joining"
              />
              <JobSection
                title="Responsibilities"
                text={job.responsibilities}
                eyebrow="What you will do"
              />
              <JobSection
                title="Requirements"
                text={job.requirements}
                eyebrow="What you will bring"
              />
              {job.preferred_qualifications && (
                <JobSection
                  title="Preferred qualifications"
                  text={job.preferred_qualifications}
                  eyebrow="Helpful experience"
                />
              )}
            </div>

            <aside className="lg:sticky lg:top-28">
              <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-6 shadow-sm sm:p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Ready to apply?
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                  Take the next step
                </h2>
                <p className="mt-3 leading-7 text-slate-600">
                  Complete a short, secure application and upload your résumé for review.
                </p>
                <Link
                  href={`/careers?jobId=${job.id}`}
                  className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Start application
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <div className="mt-6 space-y-3 border-t border-blue-100 pt-6">
                  <div className="flex items-start gap-3">
                    <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
                    <p className="text-sm leading-6 text-slate-600">Three guided application steps</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
                    <p className="text-sm leading-6 text-slate-600">Private résumé upload and confirmation reference</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Role details</h2>
                <dl className="mt-5 space-y-5">
                  {facts.slice(4).map((fact) => (
                    <Meta key={fact.label} {...fact} compact />
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </section>

        {relatedJobs.length > 0 && (
          <section className="bg-slate-50 py-16 sm:py-20" aria-labelledby="related-jobs-heading">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <Reveal className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Keep exploring
                </p>
                <h2
                  id="related-jobs-heading"
                  className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
                >
                  Related open positions
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  These roles share similarities in department, industry, workplace, employment type, or location.
                </p>
              </Reveal>
              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                {relatedJobs.map(({ job: relatedJob, reasons }) => (
                  <JobCard
                    key={relatedJob.id}
                    job={relatedJob}
                    relatedReason={reasons.slice(0, 2).join(" and ")}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </PageTransition>
  );
}

function Meta({
  label,
  value,
  icon: Icon,
  compact = false,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "flex gap-3" : "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"}>
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div>
        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
        <dd className="mt-1 text-sm font-medium text-slate-800">{value}</dd>
      </div>
    </div>
  );
}

function JobSection({
  title,
  text,
  eyebrow,
}: {
  title: string;
  text?: string | null;
  eyebrow: string;
}) {
  if (!text) return null;

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
      <div className="mt-5 space-y-4">{formatMultiline(text)}</div>
    </section>
  );
}
