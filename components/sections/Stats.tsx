"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";

const stats = [
  {
    title: "Global Reach",
    text: "Connecting talent across continents and markets.",
  },
  {
    title: "Skilled Talent",
    text: "Access to a diverse and qualified workforce.",
  },
  {
    title: "Secure & Compliant",
    text: "Aligned with operational and compliance standards.",
  },
  {
    title: "Scalable Solutions",
    text: "Built to grow with your business needs.",
  },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <Image
          src="/images/global-network.jpg"
          alt="Global network and connectivity map"
          fill
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/80" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">

        {/* HEADER */}
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
            Global Capability
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Built for global customer support operations
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-300">
            We help businesses connect with talent, scale operations, and deliver
            consistent customer experiences across regions.
          </p>
        </Reveal>

        {/* STATS GRID */}
        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.title}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h3 className="text-lg font-semibold text-white">
                  {stat.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {stat.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

      </div>
    </section>
  );
}