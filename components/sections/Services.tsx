import { services } from "@/content/services";

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Our Services
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
            Staffing and customer support solutions built for growth
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Circle Wave helps companies build stronger customer service operations
            with staffing, training, consulting, and operational support.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {service.title}
              </h3>
              <p className="mt-3 text-gray-600 leading-7">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}