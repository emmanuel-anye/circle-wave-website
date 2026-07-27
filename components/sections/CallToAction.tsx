"use client";

import { ArrowRight, BriefcaseBusiness, SearchCheck } from "lucide-react";
import ConversionLink from "@/components/analytics/ConversionLink";
import Reveal from "@/components/ui/Reveal";
import MotionButton from "@/components/ui/MotionButton";
import HoverCard from "@/components/ui/HoverCard";

export default function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 py-24 text-white sm:py-28">
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-cyan-300/15 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Choose your next step</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Two clear paths, one service-focused network</h2>
          <p className="mt-5 text-lg leading-8 text-blue-100">Whether you are building a team or looking for your next opportunity, Circle Wave gives you a direct route forward.</p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <HoverCard className="group relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-8 backdrop-blur sm:p-10">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-[7rem] bg-white/5 transition-transform duration-500 group-hover:scale-125" aria-hidden="true" />
              <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-900 shadow-lg"><BriefcaseBusiness className="h-6 w-6" aria-hidden="true" /></span>
              <p className="relative mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">For employers</p>
              <h3 className="relative mt-3 text-3xl font-bold">Build your customer service team with confidence</h3>
              <p className="relative mt-4 max-w-xl leading-8 text-blue-100">Share your hiring needs, operating context, and timeline. We will help shape the right staffing approach and next steps.</p>
              <ConversionLink href="/employers#hiring-brief" event={{ name: "cta_clicked", properties: { audience: "employer", placement: "audience_paths", action: "start_hiring_brief" } }}>
                <MotionButton className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-blue-900 shadow-xl shadow-blue-950/20">Start a hiring brief <ArrowRight className="h-4 w-4" aria-hidden="true" /></MotionButton>
              </ConversionLink>
            </HoverCard>
          </Reveal>

          <Reveal>
            <HoverCard className="group relative h-full overflow-hidden rounded-[2rem] border border-cyan-200/20 bg-cyan-300/10 p-8 backdrop-blur sm:p-10">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-[7rem] bg-cyan-200/10 transition-transform duration-500 group-hover:scale-125" aria-hidden="true" />
              <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300 text-blue-950 shadow-lg"><SearchCheck className="h-6 w-6" aria-hidden="true" /></span>
              <p className="relative mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">For candidates</p>
              <h3 className="relative mt-3 text-3xl font-bold">Find roles where service skills can make an impact</h3>
              <p className="relative mt-4 max-w-xl leading-8 text-blue-100">Explore active opportunities or join the talent network so your profile is available for relevant future roles.</p>
              <ConversionLink href="/jobs" event={{ name: "cta_clicked", properties: { audience: "candidate", placement: "audience_paths", action: "view_open_roles" } }}>
                <MotionButton className="relative mt-8 inline-flex items-center gap-2 rounded-xl border border-white/70 px-6 py-3.5 font-semibold text-white">View open positions <ArrowRight className="h-4 w-4" aria-hidden="true" /></MotionButton>
              </ConversionLink>
            </HoverCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
