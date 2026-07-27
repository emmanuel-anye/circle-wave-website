import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Layers3, Settings2, UsersRound } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import HoverCard from "@/components/ui/HoverCard";
import { services } from "@/content/services";

const serviceIcons = [UsersRound, Settings2, BriefcaseBusiness, Layers3];

const staffingModels = [
  "Permanent placement",
  "Temporary staffing",
  "Contract-to-hire",
  "Seasonal support",
  "Remote staffing",
  "Leadership recruitment",
  "High-volume recruiting",
];

export default function ServicesPage() {
  return (
    <PageTransition>
      <main className="overflow-hidden bg-white">
        <section className="relative isolate bg-slate-950 text-white">
          <div className="absolute inset-0 -z-10 opacity-80 [background:radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.45),transparent_32%),radial-gradient(circle_at_85%_65%,rgba(6,182,212,0.25),transparent_30%)]" />
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Services</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Customer support solutions designed around how your business grows.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Circle Wave combines staffing, training, operational improvement, and consulting to help businesses build
                stronger, more scalable customer service teams.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/employers#hiring-brief"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-400"
                >
                  Discuss your needs
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/industries"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  View industries
                </Link>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Built for changing demand</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    ["Flexible", "Scale teams up or down"],
                    ["Practical", "Improve day-to-day operations"],
                    ["Tailored", "Match the right delivery model"],
                    ["Connected", "Align people and performance"],
                  ].map(([title, text]) => (
                    <div key={title} className="rounded-2xl border border-white/10 bg-white/10 p-5">
                      <p className="font-semibold text-white">{title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">What we deliver</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Support across the full customer service lifecycle
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Choose focused help for a specific challenge or combine services into a broader support strategy.
              </p>
            </Reveal>

            <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const Icon = serviceIcons[index % serviceIcons.length] ?? UsersRound;
                return (
                  <StaggerItem key={service.title}>
                    <HoverCard className="group h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                      <div className="flex items-start justify-between gap-4">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="text-sm font-semibold text-slate-300">0{index + 1}</span>
                      </div>
                      <h3 className="mt-6 text-xl font-semibold text-slate-900">{service.title}</h3>
                      <p className="mt-4 leading-8 text-slate-600">{service.description}</p>
                    </HoverCard>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Flexible staffing</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                The right support model for your stage of growth
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                From a single specialist hire to a high-volume support team, Circle Wave helps shape a staffing approach
                around your timeline, operating model, and customer demand.
              </p>
              <Link
                href="/employers#hiring-brief"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:gap-3"
              >
                Start a hiring brief
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>

            <Reveal>
              <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-7 sm:p-9">
                <div className="grid gap-3 sm:grid-cols-2">
                  {staffingModels.map((model) => (
                    <div key={model} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
                      <span className="font-medium text-slate-800">{model}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
