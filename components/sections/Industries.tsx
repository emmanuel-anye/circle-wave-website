"use client";

import { industries } from "@/content/industries";
import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import HoverCard from "@/components/ui/HoverCard";

export default function Industries() {
  return (
    <section id="industries" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
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
        </Reveal>

        <StaggerGroup
          className="mt-14 flex flex-wrap gap-4"
          staggerChildren={0.04}
        >
          {industries.map((industry) => (
            <StaggerItem key={industry}>
              <HoverCard className="inline-block rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-700 shadow-sm">
                {industry}
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}