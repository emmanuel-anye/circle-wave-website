"use client";

import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import HoverCard from "@/components/ui/HoverCard";

const steps = [
  {
    step: "01",
    title: "Share your staffing needs",
    text: "Tell us about your roles, headcount, work model, timeline, and operational requirements.",
  },
  {
    step: "02",
    title: "We design the right support model",
    text: "We assess your needs and recommend a staffing and support approach aligned with your business goals.",
  },
  {
    step: "03",
    title: "We connect you with talent",
    text: "We identify professionals suited to your customer service requirements and team structure.",
  },
  {
    step: "04",
    title: "You scale with confidence",
    text: "With the right people and structure in place, your team can improve service delivery and grow sustainably.",
  },
];

export default function Process() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            A simple path from need to support
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Our process is designed to make staffing and customer support planning
            straightforward, efficient, and aligned with your operational goals.
          </p>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <StaggerItem key={step.step}>
              <HoverCard className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold tracking-[0.2em] text-blue-600">
                  {step.step}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-4 leading-7 text-slate-600">{step.text}</p>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}