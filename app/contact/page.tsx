import { ArrowUpRight, BriefcaseBusiness, Mail, Phone, Search, Users } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import HoverCard from "@/components/ui/HoverCard";
import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";

const pathways = [
  {
    href: "/employers#hiring-brief",
    icon: BriefcaseBusiness,
    title: "I need to hire",
    text: "Share roles, headcount, timelines, and operating requirements through the employer brief.",
    action: "Start a hiring brief",
  },
  {
    href: "/jobs",
    icon: Search,
    title: "I am looking for work",
    text: "Explore current opportunities and apply for roles that match your experience.",
    action: "Browse open roles",
  },
  {
    href: "/talent-network",
    icon: Users,
    title: "I want to join the network",
    text: "Submit your profile for consideration when suitable opportunities become available.",
    action: "Join the talent network",
  },
];

export default function ContactPage() {
  return (
    <PageTransition>
      <main className="overflow-hidden bg-slate-50">
        <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 py-20 text-white sm:py-24">
          <div className="absolute inset-0 opacity-25" aria-hidden="true">
            <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-blue-500 blur-3xl" />
            <div className="absolute right-0 top-16 h-80 w-80 rounded-full bg-cyan-300 blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <Reveal className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">
                Contact Circle Wave
              </p>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Start the right conversation from the beginning
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
                Choose the pathway that best matches your goal, or send a general message
                and the Circle Wave team will route your inquiry appropriately.
              </p>
            </Reveal>

            <Reveal>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <a
                  href="mailto:info@circleswave.net"
                  className="group rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur transition hover:bg-white/15"
                >
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-cyan-200">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">Email</p>
                      <p className="mt-1 font-semibold text-white">info@circleswave.net</p>
                    </div>
                  </div>
                </a>
                <a
                  href="tel:+19453045386"
                  className="group rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur transition hover:bg-white/15"
                >
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-cyan-200">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">Phone</p>
                      <p className="mt-1 font-semibold text-white">+1 945 304-5386</p>
                    </div>
                  </div>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Choose a pathway</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Get to the right next step faster
              </h2>
            </Reveal>

            <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-3">
              {pathways.map(({ href, icon: Icon, title, text, action }) => (
                <StaggerItem key={title}>
                  <Link href={href} className="block h-full">
                    <HoverCard className="group h-full rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
                      <div className="flex items-start justify-between gap-4">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <ArrowUpRight className="h-5 w-5 text-slate-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600" aria-hidden="true" />
                      </div>
                      <h3 className="mt-6 text-xl font-semibold text-slate-950">{title}</h3>
                      <p className="mt-3 leading-7 text-slate-600">{text}</p>
                      <p className="mt-6 text-sm font-semibold text-blue-700">{action}</p>
                    </HoverCard>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <section className="pb-24 sm:pb-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <Reveal>
              <div className="rounded-[2rem] bg-blue-950 p-8 text-white shadow-xl sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">General inquiries</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight">Send a message to the team</h2>
                <p className="mt-5 leading-8 text-blue-100">
                  Use the contact form for partnerships, service questions, and other inquiries that do not fit the employer or candidate pathways above.
                </p>
                <div className="mt-8 border-t border-white/10 pt-6 text-sm leading-7 text-blue-200">
                  For detailed staffing requests, the employer hiring brief provides the fastest and most complete route.
                </div>
              </div>
            </Reveal>

            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
