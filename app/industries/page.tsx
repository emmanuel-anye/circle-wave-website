import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe2,
  Headphones,
  HeartPulse,
  Landmark,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import HoverCard from "@/components/ui/HoverCard";
import { industries } from "@/content/industries";

const industryIcons = [ShoppingBag, Landmark, HeartPulse, Truck, Building2, Globe2, Headphones, Sparkles];

const supportNeeds = [
  "Responsive frontline customer service",
  "Scalable coverage for changing demand",
  "Consistent quality across channels",
  "Teams aligned to industry workflows",
];

export default function IndustriesPage() {
  return (
    <PageTransition>
      <main className="overflow-hidden bg-white">
        <section className="relative isolate bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-800 text-white">
          <div className="absolute inset-0 -z-10 opacity-70 [background:radial-gradient(circle_at_80%_18%,rgba(103,232,249,0.3),transparent_28%),radial-gradient(circle_at_15%_85%,rgba(59,130,246,0.4),transparent_35%)]" />
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Industries</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Customer support shaped around the realities of your industry.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
                Circle Wave helps organizations build responsive, well-trained, and scalable support teams aligned to
                sector-specific customer expectations and operating needs.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/employers#hiring-brief"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-900 shadow-lg transition hover:-translate-y-0.5"
                >
                  Tell us your industry
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
                >
                  Explore services
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">What every sector needs</p>
                <div className="mt-6 space-y-3">
                  {supportNeeds.map((need) => (
                    <div key={need} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-200" aria-hidden="true" />
                      <span className="font-medium text-white">{need}</span>
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
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Sector experience</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Flexible support across customer-driven industries
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Every industry has different service pressures. We adapt staffing and support delivery to match them.
              </p>
            </Reveal>

            <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {industries.map((industry, index) => {
                const Icon = industryIcons[index % industryIcons.length];
                return (
                  <StaggerItem key={industry}>
                    <HoverCard className="group h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="flex items-start justify-between gap-4">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">Sector</span>
                      </div>
                      <h3 className="mt-6 text-xl font-semibold text-slate-900">{industry}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        Tailored staffing and customer support designed around the service demands, workflows, and growth
                        patterns of this sector.
                      </p>
                    </HoverCard>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-12 text-white sm:px-10 lg:px-14">
                <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-cyan-400/20 blur-3xl" />
                <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">A tailored approach</p>
                    <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                      Your support model should fit your customers, not force them into a template.
                    </h2>
                    <p className="mt-5 max-w-2xl leading-8 text-slate-300">
                      Share your operating environment, hiring priorities, and service goals. Circle Wave will help identify
                      a practical staffing and support approach for your business.
                    </p>
                  </div>
                  <Link
                    href="/employers#hiring-brief"
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
                  >
                    Start the conversation
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
