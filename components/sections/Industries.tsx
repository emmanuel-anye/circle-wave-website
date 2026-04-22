import { industries } from "@/content/industries";

export default function Industries() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Industries We Serve
          </p>
          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Trusted across multiple industries
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We support organizations across sectors with tailored customer
            service and staffing solutions.
          </p>
        </div>

        <div className="mt-14 flex flex-wrap gap-4">
          {industries.map((industry) => (
            <span
              key={industry}
              className="rounded-full bg-white border border-gray-200 px-5 py-2 text-sm font-medium text-gray-700 shadow-sm"
            >
              {industry}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}