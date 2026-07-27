"use client";

import Image from "next/image";
import { ArrowUpRight, Globe, Layers3, ShieldCheck, Users } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import HoverCard from "@/components/ui/HoverCard";

const items = [
  { icon: Globe, title: "Global perspective", text: "Build support operations with international flexibility and reach." },
  { icon: Users, title: "Customer service focus", text: "Keep every staffing decision tied to stronger customer outcomes." },
  { icon: Layers3, title: "Flexible engagement", text: "Adapt from focused hiring support to broader outsourced operations." },
  { icon: ShieldCheck, title: "Operational trust", text: "Prioritize quality, compliance, and consistency at every stage." },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28">
      <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <div className="relative mx-auto max-w-xl lg:mx-0">
              <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-blue-100 to-cyan-100 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2.25rem] border border-white bg-slate-900 shadow-2xl shadow-blue-950/15">
                <Image src="/images/team-collaboration.jpg" alt="Team collaborating in a modern workspace" width={1200} height={900} className="h-[380px] w-full object-cover sm:h-[460px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">A practical operating partner</p>
                  <p className="mt-3 max-w-md text-xl font-semibold leading-8 text-white">People, process, and service quality brought into one coordinated model.</p>
                </div>
              </div>
              <div className="absolute -right-4 top-8 hidden rounded-2xl border border-blue-100 bg-white px-5 py-4 shadow-xl md:block">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">Built to adapt</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">Flexible by design</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Why Circle Wave</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">Strategic support for modern customer operations</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">Circle Wave combines staffing expertise, operational insight, and flexible workforce solutions so growing organizations can strengthen service delivery without adding unnecessary complexity.</p>
            </Reveal>

            <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2">
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <StaggerItem key={item.title}>
                    <HoverCard className="group h-full rounded-3xl border border-slate-200 bg-slate-50 p-6">
                      <div className="flex items-start justify-between gap-4">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                        <ArrowUpRight className="h-5 w-5 text-slate-300 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-600" aria-hidden="true" />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold text-slate-950">{item.title}</h3>
                      <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                    </HoverCard>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
