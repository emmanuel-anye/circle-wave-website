"use client";

import { ArrowUpRight, BarChart, Briefcase, Cpu, GraduationCap, Settings, Users } from "lucide-react";
import { services } from "@/content/services";
import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import HoverCard from "@/components/ui/HoverCard";

const icons = [Users, GraduationCap, Settings, Cpu, BarChart, Briefcase];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-slate-50 py-24 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-blue-50/80 to-transparent" aria-hidden="true" />
      <div className="absolute -right-36 top-40 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Our services</p>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Flexible support for the people and systems behind great customer experiences.
            </h2>
          </Reveal>
          <Reveal className="lg:justify-self-end lg:max-w-xl">
            <p className="text-lg leading-8 text-slate-600">
              From hiring and training to process improvement, Circle Wave helps organizations strengthen customer support without forcing a one-size-fits-all model.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-12">
          {services.map((service, index) => {
            const Icon = icons[index];
            const wide = index === 0 || index === 5;

            return (
              <StaggerItem key={service.title} className={wide ? "lg:col-span-6" : "lg:col-span-4"}>
                <HoverCard className="group relative h-full min-h-72 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-blue-950/5 sm:p-8">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                  <div className="flex items-start justify-between gap-5">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 transition duration-300 group-hover:-translate-y-1 group-hover:rotate-2 group-hover:bg-blue-700 group-hover:text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <span className="text-sm font-bold tracking-[0.18em] text-slate-300">0{index + 1}</span>
                  </div>

                  <h3 className="mt-8 max-w-md text-2xl font-semibold tracking-tight text-slate-950">{service.title}</h3>
                  <p className="mt-4 max-w-xl leading-7 text-slate-600">{service.description}</p>

                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-blue-700">
                    Built around your operation
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </div>

                  <div className="absolute -bottom-20 -right-16 h-44 w-44 rounded-full bg-blue-50 transition-transform duration-500 group-hover:scale-125" aria-hidden="true" />
                </HoverCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
