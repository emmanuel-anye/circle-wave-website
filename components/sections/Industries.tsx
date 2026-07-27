"use client";

import { ArrowUpRight, Building2 } from "lucide-react";
import { industries } from "@/content/industries";
import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import HoverCard from "@/components/ui/HoverCard";

export default function Industries() {
  return (
    <section id="industries" className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.24),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.16),transparent_34%)]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Industries we serve
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Customer operations shaped around the realities of your sector
            </h2>
          </Reveal>
          <Reveal className="lg:justify-self-end">
            <p className="max-w-xl text-lg leading-8 text-slate-300">
              Circle Wave adapts staffing, training, and operational support to the service expectations, workflows, and growth pressures of each business environment.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerChildren={0.04}>
          {industries.map((industry, index) => (
            <StaggerItem key={industry}>
              <HoverCard className="group flex min-h-28 items-center justify-between rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-cyan-200">
                    <Building2 className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.16em] text-blue-300">{String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-1 font-semibold text-white">{industry}</h3>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-slate-500 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-300" aria-hidden="true" />
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
