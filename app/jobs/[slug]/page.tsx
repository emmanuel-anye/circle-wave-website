import { notFound } from "next/navigation";
import Link from "next/link";
import PageTransition from "@/components/ui/PageTransition";
import Reveal from "@/components/ui/Reveal";
import MotionButton from "@/components/ui/MotionButton";
import { getPublicJobBySlug } from "@/lib/admin-data";

type JobPageProps = {
  params: Promise<{ slug: string }>;
};

function formatMultiline(text?: string | null) {
  if (!text) return null;

  return text.split("\n").map((line, index) => (
    <p key={index} className="leading-8 text-slate-600">
      {line}
    </p>
  ));
}

export default async function JobDetailPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = await getPublicJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return (
    <PageTransition>
      <section className="bg-slate-50 section">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              {job.featured && (
                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  Featured
                </span>
              )}
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                {job.status || "Open"}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              {job.title}
            </h1>

            {job.short_summary && (
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                {job.short_summary}
              </p>
            )}

            <div className="mt-8 grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Department
                </p>
                <p className="mt-1 text-sm text-slate-700">{job.department || "—"}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Location
                </p>
                <p className="mt-1 text-sm text-slate-700">{job.location || "—"}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Work Model
                </p>
                <p className="mt-1 text-sm text-slate-700">{job.work_model || "—"}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Employment Type
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {job.employment_type || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Salary Range
                </p>
                <p className="mt-1 text-sm text-slate-700">{job.salary_range || "—"}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Application Deadline
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {job.application_deadline || "Open until filled"}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href={`/careers?jobId=${job.id}&jobTitle=${encodeURIComponent(job.title)}`}>
                <MotionButton className="inline-flex w-full justify-center rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700 sm:w-auto">
                  Apply for This Role
                </MotionButton>
              </Link>

              <Link href="/jobs">
                <MotionButton className="inline-flex w-full justify-center rounded-xl border border-slate-300 px-6 py-3.5 font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 sm:w-auto">
                  Back to Jobs
                </MotionButton>
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Role Description</h2>
              <div className="mt-4 space-y-4">{formatMultiline(job.description)}</div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Responsibilities</h2>
              <div className="mt-4 space-y-4">
                {formatMultiline(job.responsibilities) || (
                  <p className="leading-8 text-slate-600">No responsibilities listed.</p>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Requirements</h2>
              <div className="mt-4 space-y-4">
                {formatMultiline(job.requirements) || (
                  <p className="leading-8 text-slate-600">No requirements listed.</p>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">
                Preferred Qualifications
              </h2>
              <div className="mt-4 space-y-4">
                {formatMultiline(job.preferred_qualifications) || (
                  <p className="leading-8 text-slate-600">
                    No preferred qualifications listed.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}