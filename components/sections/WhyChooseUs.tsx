"use client";

import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import HoverCard from "@/components/ui/HoverCard";
import { Globe, Users, ShieldCheck, Layers3 } from "lucide-react";

const items = [
  {
    icon: Globe,
    title: "Global perspective",
    text: "We help businesses think beyond a single market and build support operations with international flexibility.",
  },
  {
    icon: Users,
    title: "Customer service focus",
    text: "Our work centers on customer support, service quality, staffing needs, and operational consistency.",
  },
  {
    icon: Layers3,
    title: "Flexible engagement",
    text: "We support permanent hiring, temporary coverage, seasonal scaling, and outsourced service models.",
  },
  {
    icon: ShieldCheck,
    title: "Operational trust",
    text: "We consider compliance, quality, and structured hiring needs as part of every staffing conversation.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Why Choose Us
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Strategic support for growing service operations
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Circle Wave combines staffing support, customer service understanding,
            and flexible workforce thinking to help businesses scale more confidently.
          </p>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <StaggerItem key={item.title}>
                <HoverCard className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-4 leading-8 text-slate-600">{item.text}</p>
                </HoverCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}