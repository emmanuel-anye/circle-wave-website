export default function CallToAction() {
  return (
    <section className="py-20 bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-white/10 p-8 border border-white/10">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
              For Employers
            </p>
            <h3 className="mt-3 text-2xl font-bold">
              Need customer service staffing support?
            </h3>
            <p className="mt-4 text-white/80 leading-7">
              Tell us about your hiring needs, required roles, timelines, and
              compliance requirements. We’ll help you build the right team.
            </p>
            <button className="mt-6 rounded-lg bg-white px-5 py-3 font-semibold text-blue-900">
              Request Staffing
            </button>
          </div>

          <div className="rounded-2xl bg-blue-700 p-8 border border-white/10">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">
              For Job Seekers
            </p>
            <h3 className="mt-3 text-2xl font-bold">
              Looking for remote customer service opportunities?
            </h3>
            <p className="mt-4 text-white/90 leading-7">
              Apply to join our talent network and be considered for customer
              service, support, and staffing opportunities across industries.
            </p>
            <button className="mt-6 rounded-lg border border-white px-5 py-3 font-semibold text-white">
              Apply for Jobs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}