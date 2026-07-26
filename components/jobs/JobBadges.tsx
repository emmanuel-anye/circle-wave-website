import type { JobPosting } from "@/lib/jobs";
import { getJobIndicators } from "@/lib/jobs";

export default function JobBadges({
  job,
  now,
}: {
  job: JobPosting;
  now?: Date;
}) {
  const { isNew, isClosingSoon } = getJobIndicators(job, now);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {job.featured && <Badge className="bg-blue-600 text-white">Featured</Badge>}
      {isNew && <Badge className="bg-emerald-100 text-emerald-800">New</Badge>}
      {isClosingSoon && (
        <Badge className="bg-amber-100 text-amber-900">Closing soon</Badge>
      )}
      {job.work_model && (
        <Badge className="bg-slate-100 text-slate-700">{job.work_model}</Badge>
      )}
      {job.employment_type && (
        <Badge className="bg-slate-100 text-slate-700">
          {job.employment_type}
        </Badge>
      )}
    </div>
  );
}

function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${className}`}
    >
      {children}
    </span>
  );
}
