"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import HoverCard from "@/components/ui/HoverCard";
import { Globe, Users, ShieldCheck, Layers3 } from "lucide-react";

const items = [
  {
    icon: Globe,
    title: "Global perspective",
    text: "We help businesses build support operations with international flexibility and reach.",
  },
  {
    icon: Users,
    title: "Customer service focus",
    text: "Everything we do is centered on delivering better customer support outcomes.",
  },
  {
    icon: Layers3,
    title: "Flexible engagement",
    text: "From contract to full-scale outsourcing, we adapt to your business model.",
  },
  {
    icon: ShieldCheck,
    title: "Operational trust",
    text: "We prioritize quality, compliance, and consistency in every engagement.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* TOP GRID (TEXT + IMAGE) */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* TEXT */}
          <Reveal className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Why Choose Us
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Strategic support for modern customer operations
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Circle Wave combines staffing expertise, operational insight, and
              flexible workforce solutions to help businesses scale support teams
              effectively.
            </p>
          </Reveal>

          {/* IMAGE */}
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-blue-100/40 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] shadow-xl">
                <Image
                  src="/images/team-collaboration.jpg"
                  alt="Team collaborating in a modern workspace"
                  width={1200}
                  height={900}
                  className="h-[300px] w-full object-cover sm:h-[360px] lg:h-[420px]"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* FEATURE CARDS */}
        <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-2">
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

                  <p className="mt-4 leading-8 text-slate-600">
                    {item.text}
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