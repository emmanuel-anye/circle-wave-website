import { services } from "@/content/services";
import {
  Users,
  GraduationCap,
  Settings,
  Cpu,
  BarChart,
  Briefcase,
} from "lucide-react";

const icons = [
  Users,
  GraduationCap,
  Settings,
  Cpu,
  BarChart,
  Briefcase,
];

export default function Services() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Our Services
          </p>
          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Everything you need to build a high-performing support team
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            From staffing to optimization, Circle Wave helps companies scale
            customer experience operations with confidence.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[index];

            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <Icon size={24} />
                </div>

                <h3 className="text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-3 text-gray-600 leading-7">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}