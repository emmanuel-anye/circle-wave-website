"use client";

import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import HoverCard from "@/components/ui/HoverCard";

const stats = [
  {
    value: "Global",
    label: "Service reach",
    description: "Support solutions designed for businesses operating across regions and markets.",
  },
  {
    value: "Flexible",
    label: "Staffing models",
    description: "Permanent, temporary, contract, seasonal, and outsourced staffing support.",
  },
  {
    value: "Multi-industry",
    label: "Operational expertise",
    description: "Experience supporting organizations across customer-facing industries.",
  },
  {
    value: "Remote-ready",
    label: "Workforce approach",
    description: "Built to support distributed customer service and support teams.",
  },
];

export default function Stats() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Why Circle Wave
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Built for modern support teams
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            We help organizations build customer service operations that are more
            scalable, more flexible, and more aligned with real business needs.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <HoverCard className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
                  {stat.label}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {stat.description}
                </p>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}