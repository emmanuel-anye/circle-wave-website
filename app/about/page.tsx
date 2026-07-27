import Link from "next/link";
import { ArrowRight, Globe2, Handshake, Headphones, Sparkles } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import HoverCard from "@/components/ui/HoverCard";

const principles = [
  {
    title: "Global reach",
    text: "We support clients with talent and staffing solutions across multiple regions, including African markets.",
    icon: Globe2,
  },
  {
    title: "Service excellence",
    text: "We focus on quality support delivery, stronger workflows, and better customer experiences.",
    icon: Headphones,
  },
  {
    title: "Flexible partnerships",
    text: "We help organizations with permanent, temporary, contract, and outsourced support needs.",
    icon: Handshake,
  },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="overflow-hidden bg-white">
        <section className="relative isolate bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">
          <div className="absolute inset-0 -z-10 opacity-70 [background:radial-gradient(circle_at_82%_18%,rgba(34,211,238,0.35),transparent_28%),radial-gradient(circle_at_18%_76%,rgba(59,130,246,0.35),transparent_34%)]" />
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">About Circle Wave</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Better support starts with the right people, systems, and partnership.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
                Circle Wave helps businesses build reliable, scalable customer support teams through flexible staffing,
                operational guidance, and customer experience expertise.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/employers#hiring-brief"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-900 shadow-lg transition hover:-translate-y-0.5"
                >
                  Build your team
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/careers"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
                >
                  Explore opportunities
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200">
                    <Sparkles className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">What we bring together</p>
                </div>
                <div className="mt-7 space-y-4">
                  {["Skilled customer service talent", "Flexible staffing models", "Operational support and consulting"].map(
                    (item, index) => (
                      <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-blue-800">
                          {index + 1}
                        </span>
                        <span className="font-medium text-white">{item}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-2">
              <Reveal>
                <HoverCard className="h-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Our story</p>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">Built around meaningful service delivery</h2>
                  <p className="mt-5 leading-8 text-slate-600">
                    Circle Wave was built on the idea that technology, people, and service should work together to help
                    businesses maintain stronger relationships with their customers. From the start, the company was shaped
                    by a vision of global connection, operational excellence, and meaningful service delivery.
                  </p>
                  <p className="mt-4 leading-8 text-slate-600">
                    Today, Circle Wave connects businesses with customer service talent, staffing solutions, and consulting
                    support designed to improve service quality and business performance.
                  </p>
                </HoverCard>
              </Reveal>

              <div className="grid gap-8">
                <Reveal delay={0.05}>
                  <HoverCard className="rounded-[2rem] border border-blue-100 bg-blue-50 p-8 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Our mission</p>
                    <h2 className="mt-3 text-2xl font-bold text-blue-950">Help businesses grow through customer service excellence.</h2>
                    <p className="mt-4 leading-8 text-slate-600">
                      We provide tailored staffing and operational support that strengthens service teams, improves customer
                      experiences, and creates long-term value.
                    </p>
                  </HoverCard>
                </Reveal>
                <Reveal delay={0.1}>
                  <HoverCard className="rounded-[2rem] border border-cyan-100 bg-cyan-50 p-8 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">Our vision</p>
                    <h2 className="mt-3 text-2xl font-bold text-slate-900">A trusted global partner for support operations.</h2>
                    <p className="mt-4 leading-8 text-slate-600">
                      We aim to help businesses scale while creating meaningful opportunities for skilled professionals
                      across Africa and beyond.
                    </p>
                  </HoverCard>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">How we work</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                A practical partner for every stage of support growth
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Our approach combines global perspective, service discipline, and flexible delivery models.
              </p>
            </Reveal>

            <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
              {principles.map((item) => {
                const Icon = item.icon;
                return (
                  <StaggerItem key={item.title}>
                    <HoverCard className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-6 text-xl font-semibold text-slate-900">{item.title}</h3>
                      <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                    </HoverCard>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
