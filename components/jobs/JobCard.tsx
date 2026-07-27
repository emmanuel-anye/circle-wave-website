import Link from "next/link";
import { ArrowUpRight, Building2, CalendarClock, MapPin, WalletCards } from "lucide-react";
import JobBadges from "@/components/jobs/JobBadges";
import type { JobPosting } from "@/lib/jobs";
import { formatJobDeadline } from "@/lib/jobs";

export default function JobCard({
  job,
  relatedReason,
}: {
  job: JobPosting;
  relatedReason?: string;
}) {
  const salary = job.salary_range?.trim();

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[2rem] border shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        job.featured
          ? "border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex h-full flex-col p-7 sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <JobBadges job={job} />
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition group-hover:border-blue-200 group-hover:bg-blue-600 group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>

        <h2 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.7rem]">
          <Link
            href={`/jobs/${job.slug}`}
            className="rounded-sm transition hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          >
            {job.title}
          </Link>
        </h2>

        {relatedReason && (
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
            Related by {relatedReason}
          </p>
        )}

        {job.short_summary && (
          <p className="mt-4 line-clamp-3 leading-7 text-slate-600">{job.short_summary}</p>
        )}

        <dl className="mt-7 grid gap-3 sm:grid-cols-2">
          {job.location && <Meta icon={MapPin} label="Location" value={job.location} />}
          {job.department && <Meta icon={Building2} label="Department" value={job.department} />}
          {salary && <Meta icon={WalletCards} label="Salary" value={salary} />}
          <Meta
            icon={CalendarClock}
            label="Deadline"
            value={formatJobDeadline(job.application_deadline)}
          />
        </dl>

        <div className="mt-auto pt-8">
          <Link
            href={`/jobs/${job.slug}`}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
          >
            View role
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-3">
      <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {label}
      </dt>
      <dd className="mt-1.5 text-sm font-medium text-slate-800">{value}</dd>
    </div>
  );
}
