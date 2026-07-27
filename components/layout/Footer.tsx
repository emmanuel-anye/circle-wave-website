import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

const companyLinks = [
  ["About", "/about"],
  ["Services", "/services"],
  ["Industries", "/industries"],
  ["Employers", "/employers"],
];

const opportunityLinks = [
  ["Open roles", "/jobs"],
  ["Careers", "/careers"],
  ["Talent network", "/talent-network"],
  ["Contact", "/contact"],
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-700/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 sm:pt-20">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-blue-950/90 to-blue-800/60 p-7 shadow-2xl shadow-slate-950/30 sm:p-9 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">Ready for the next step?</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Build stronger customer support with the right people and structure.
            </h2>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <Link
              href="/employers#hiring-brief"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-950 transition hover:bg-blue-50"
            >
              Start hiring brief
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore open roles
            </Link>
          </div>
        </div>

        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Circle Wave home">
              <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold shadow-lg shadow-blue-950/40">
                <span className="absolute inset-1 rounded-xl border border-white/30" aria-hidden="true" />
                CW
              </span>
              <span className="text-xl font-bold">Circle Wave</span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
              Global customer service staffing and consulting for businesses that need flexible, scalable, and dependable support operations.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm text-slate-300">
              <a href="mailto:info@circleswave.net" className="inline-flex items-center gap-3 transition hover:text-white">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-blue-300">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                info@circleswave.net
              </a>
              <a href="tel:+19453045386" className="inline-flex items-center gap-3 transition hover:text-white">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-blue-300">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                +1 945 304-5386
              </a>
            </div>
          </div>

          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Opportunities" links={opportunityLinks} />

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Policies</h3>
            <div className="mt-5 flex flex-col gap-3 text-sm text-slate-300">
              <Link href="/privacy" className="transition hover:text-white">Privacy policy</Link>
              <Link href="/terms" className="transition hover:text-white">Terms of use</Link>
            </div>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">Two paths, one network</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">Supporting employers who are scaling and professionals ready for their next opportunity.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-7 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Circle Wave. All rights reserved.</p>
          <p>Customer service staffing, recruitment, and operational support.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">{title}</h3>
      <div className="mt-5 flex flex-col gap-3 text-sm text-slate-300">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="group inline-flex items-center gap-1.5 transition hover:text-white">
            {label}
            <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}
