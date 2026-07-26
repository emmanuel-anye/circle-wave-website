import Link from "next/link";
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
      className={`flex h-full flex-col rounded-[2rem] border p-7 shadow-sm ${
        job.featured
          ? "border-blue-200 bg-gradient-to-br from-blue-50 to-white"
          : "border-slate-200 bg-white"
      }`}
    >
      <JobBadges job={job} />
      <h2 className="mt-5 text-2xl font-semibold text-slate-900">
        <Link
          href={`/jobs/${job.slug}`}
          className="rounded-sm hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
        >
          {job.title}
        </Link>
      </h2>
      {relatedReason && (
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-blue-700">
          Related by {relatedReason}
        </p>
      )}
      {job.short_summary && (
        <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
          {job.short_summary}
        </p>
      )}
      <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
        {job.location && <Meta label="Location" value={job.location} />}
        {job.department && <Meta label="Department" value={job.department} />}
        {job.industry && <Meta label="Industry" value={job.industry} />}
        {salary && <Meta label="Salary" value={salary} />}
        <Meta
          label="Deadline"
          value={formatJobDeadline(job.application_deadline)}
        />
      </dl>
      <div className="mt-auto pt-7">
        <Link
          href={`/jobs/${job.slug}`}
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          View role
        </Link>
      </div>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 text-slate-700">{value}</dd>
    </div>
  );
}
