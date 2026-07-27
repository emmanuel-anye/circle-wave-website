import { ArrowDown, CheckCircle2, Clock3, ShieldCheck, Users } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import Reveal from "@/components/ui/Reveal";
import EmployerRequestForm from "@/components/forms/EmployerRequestForm";

const highlights = [
  {
    icon: Users,
    title: "Role-aligned talent",
    text: "Share the team structure and capabilities you need, not just a job title.",
  },
  {
    icon: Clock3,
    title: "Clear hiring timeline",
    text: "Tell us when support is needed so the response can match your operating plan.",
  },
  {
    icon: ShieldCheck,
    title: "Operational fit",
    text: "Include work-model, compliance, location, and service requirements from the start.",
  },
];

export default function EmployersPage() {
  return (
    <PageTransition>
      <main className="overflow-hidden">
        <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 py-20 text-white sm:py-24">
          <div className="absolute inset-0 opacity-30" aria-hidden="true">
            <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-blue-400 blur-3xl" />
            <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-cyan-300 blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <Reveal className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">
                Employer solutions
              </p>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Build the support team your operation actually needs
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
                Start with a structured hiring brief that gives Circle Wave the context
                needed to understand your roles, timeline, work model, and service goals.
              </p>
              <a
                href="#hiring-brief"
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                Start your hiring brief
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </Reveal>

            <Reveal>
              <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
                  What happens next
                </p>
                <div className="mt-6 space-y-5">
                  {[
                    "Your brief is reviewed by the Circle Wave team.",
                    "We clarify the operating requirements and priorities.",
                    "A suitable staffing or support approach is discussed with you.",
                  ].map((item) => (
                    <div key={item} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                      <p className="leading-7 text-blue-50">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-6 md:grid-cols-3">
              {highlights.map(({ icon: Icon, title, text }) => (
                <Reveal key={title}>
                  <div className="h-full rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h2 className="mt-5 text-xl font-semibold text-slate-950">{title}</h2>
                    <p className="mt-3 leading-7 text-slate-600">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <EmployerRequestForm />
      </main>
    </PageTransition>
  );
}
