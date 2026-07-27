"use client";

import Image from "next/image";
import { ArrowUpRight, Globe2, Scale, ShieldCheck, Users2 } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import HoverCard from "@/components/ui/HoverCard";

const capabilities = [
  {
    title: "Global reach",
    text: "Connect with service-focused talent across markets and time zones.",
    icon: Globe2,
    marker: "01",
  },
  {
    title: "Skilled talent",
    text: "Access candidates selected for communication, reliability, and customer care.",
    icon: Users2,
    marker: "02",
  },
  {
    title: "Secure and compliant",
    text: "Recruitment workflows designed around privacy and responsible operations.",
    icon: ShieldCheck,
    marker: "03",
  },
  {
    title: "Scalable solutions",
    text: "Adjust staffing and operational support as your requirements change.",
    icon: Scale,
    marker: "04",
  },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-28">
      <div className="absolute inset-0">
        <Image
          src="/images/global-network.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/90 to-blue-950/80" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_62%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Global capability
            </p>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              A stronger support operation starts with the right people and structure.
            </h2>
          </Reveal>

          <Reveal className="lg:justify-self-end lg:max-w-xl">
            <p className="text-lg leading-8 text-slate-300">
              Circle Wave combines staffing support with practical operational insight, helping teams improve service quality without losing flexibility.
            </p>
            <a href="#services" className="group mt-6 inline-flex items-center gap-2 font-semibold text-blue-300">
              See how we support growing teams
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <StaggerGroup className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <StaggerItem key={capability.title}>
                <HoverCard className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-sm">
                  <div className="absolute right-5 top-4 text-5xl font-bold tracking-tighter text-white/[0.05]" aria-hidden="true">
                    {capability.marker}
                  </div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-300/20 bg-blue-400/10 text-blue-300 transition duration-300 group-hover:-translate-y-1 group-hover:bg-blue-400/20">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-7 text-xl font-semibold text-white">{capability.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{capability.text}</p>
                  <div className="mt-7 h-px w-full bg-gradient-to-r from-blue-400/50 to-transparent" aria-hidden="true" />
                </HoverCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
