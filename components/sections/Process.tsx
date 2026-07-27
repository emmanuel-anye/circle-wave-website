"use client";

import { ArrowDownRight, CheckCircle2 } from "lucide-react";
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
    <section className="relative overflow-hidden bg-white py-24 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-cyan-100/60 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <Reveal className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              A clear path from hiring need to dependable support
            </h2>
          </Reveal>

          <Reveal className="lg:justify-self-end">
            <div className="max-w-xl rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
              <p className="text-lg leading-8 text-slate-600">
                Every engagement moves through a deliberate sequence, keeping expectations,
                responsibilities, and next steps visible from the first conversation.
              </p>
              <div className="mt-5 flex items-center gap-3 text-sm font-semibold text-blue-700">
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                Structured for speed without sacrificing quality
              </div>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-8 right-8 top-12 hidden h-px bg-gradient-to-r from-blue-200 via-blue-500 to-cyan-300 xl:block" aria-hidden="true" />
          <StaggerGroup className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <StaggerItem key={step.step}>
                <HoverCard className="group relative h-full overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm shadow-slate-200/70">
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[4rem] bg-blue-50 transition-transform duration-500 group-hover:scale-125" aria-hidden="true" />
                  <div className="relative flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold tracking-[0.14em] text-white shadow-lg shadow-blue-600/20">
                      {step.step}
                    </span>
                    {index < steps.length - 1 && (
                      <ArrowDownRight className="h-5 w-5 text-blue-300 transition duration-300 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-blue-600" aria-hidden="true" />
                    )}
                  </div>
                  <h3 className="relative mt-8 text-xl font-semibold leading-7 text-slate-950">
                    {step.title}
                  </h3>
                  <p className="relative mt-4 leading-7 text-slate-600">{step.text}</p>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
