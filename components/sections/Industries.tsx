import { industries } from "@/content/industries";

export default function Industries() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Industries We Serve
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
            Flexible support across multiple industries
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our expertise spans industries with unique customer support demands,
            helping organizations scale service quality with confidence.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {industries.map((industry) => (
            <div
              key={industry}
              className="rounded-xl border border-gray-200 bg-white px-5 py-4 text-gray-800 shadow-sm"
            >
              {industry}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}