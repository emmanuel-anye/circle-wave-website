import Link from "next/link";
import PageTransition from "@/components/ui/PageTransition";
import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import HoverCard from "@/components/ui/HoverCard";
import MotionButton from "@/components/ui/MotionButton";
import { getPublicJobPostings } from "@/lib/admin-data";

export default async function JobsPage() {
  const jobs = await getPublicJobPostings();

  return (
    <PageTransition>
      <section className="bg-slate-50 section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Open Positions
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Explore current job opportunities
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Browse current openings at Circle Wave and apply to roles that match
              your experience, availability, and career goals.
            </p>
          </Reveal>

          {jobs.length === 0 ? (
            <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">
                No open positions right now
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-slate-600">
                We do not have any active openings at the moment. You can still visit
                the careers page to join our talent network for future opportunities.
              </p>

              <div className="mt-6">
                <Link href="/careers">
                  <MotionButton className="inline-flex rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700">
                    Join Talent Network
                  </MotionButton>
                </Link>
              </div>
            </div>
          ) : (
            <StaggerGroup className="mt-14 grid gap-6 lg:grid-cols-2">
              {jobs.map((job) => (
                <StaggerItem key={job.id}>
                  <HoverCard
                    className={`h-full rounded-3xl border p-8 shadow-sm ${
                      job.featured
                        ? "border-blue-200 bg-blue-50"
                        : "border-slate-200 bg-white"
                    }`}
                  >
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

                    <h2 className="mt-5 text-2xl font-semibold text-slate-900">
                      {job.title}
                    </h2>

                    {job.short_summary && (
                      <p className="mt-4 leading-8 text-slate-600">
                        {job.short_summary}
                      </p>
                    )}

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Department
                        </p>
                        <p className="mt-1 text-sm text-slate-700">
                          {job.department || "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Location
                        </p>
                        <p className="mt-1 text-sm text-slate-700">
                          {job.location || "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Work Model
                        </p>
                        <p className="mt-1 text-sm text-slate-700">
                          {job.work_model || "—"}
                        </p>
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
                        <p className="mt-1 text-sm text-slate-700">
                          {job.salary_range || "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Deadline
                        </p>
                        <p className="mt-1 text-sm text-slate-700">
                          {job.application_deadline || "Open until filled"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <Link href={`/jobs/${job.slug}`}>
                        <MotionButton className="inline-flex rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700">
                          View Role
                        </MotionButton>
                      </Link>
                    </div>
                  </HoverCard>
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </section>
    </PageTransition>
  );
}