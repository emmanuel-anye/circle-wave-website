import { services } from "@/content/services";

export default function ServicesPage() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Services
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Customer service staffing and consulting solutions
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Circle Wave helps businesses strengthen customer support operations
            through staffing, training, operational improvement, and consulting
            services tailored to business needs.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-slate-900">
                {service.title}
              </h2>
              <p className="mt-4 leading-8 text-slate-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Staffing solutions built for flexibility
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            In addition to consulting services, Circle Wave supports businesses
            with permanent placement, temporary staffing, contract-to-hire,
            seasonal support, remote staffing, leadership recruitment, and
            high-volume recruiting. Our goal is to help every client find the
            right support model for their stage of growth.
          </p>
        </div>
      </div>
    </section>
  );
}