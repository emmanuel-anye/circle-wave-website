import { industries } from "@/content/industries";

export default function IndustriesPage() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Industries
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Supporting businesses across industries
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Circle Wave works with organizations across sectors that depend on
            responsive, well-trained, and scalable customer support teams.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {industries.map((industry) => (
            <div
              key={industry}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                {industry}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Tailored customer service support and staffing solutions adapted
                to the service demands of this industry.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}