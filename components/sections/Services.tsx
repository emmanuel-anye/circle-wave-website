"use client";

import { services } from "@/content/services";
import {
  Users,
  GraduationCap,
  Settings,
  Cpu,
  BarChart,
  Briefcase,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import HoverCard from "@/components/ui/HoverCard";

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
    <section id="services" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
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
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[index];

            return (
              <StaggerItem key={service.title}>
                <HoverCard className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900">
                    {service.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    {service.description}
                  </p>
                </HoverCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}