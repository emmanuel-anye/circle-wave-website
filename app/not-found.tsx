import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness, Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative isolate min-h-[70vh] overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 text-white">
      <div className="absolute inset-0 -z-10 opacity-75 [background:radial-gradient(circle_at_18%_20%,rgba(37,99,235,0.42),transparent_30%),radial-gradient(circle_at_82%_75%,rgba(34,211,238,0.25),transparent_30%)]" />
      <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center px-4 py-20 sm:px-6">
        <div className="grid w-full gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">404 · Page not found</p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              This page has moved, expired, or never existed.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Return to the homepage, browse current opportunities, or explore Circle Wave services from a working route.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-blue-950 shadow-lg transition hover:-translate-y-0.5"
              >
                <Home className="h-4 w-4" aria-hidden="true" />
                Go home
              </Link>
              <Link
                href="/jobs"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                Browse jobs
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-10">
            <span className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-cyan-300/15 text-cyan-200">
              <SearchX className="h-9 w-9" aria-hidden="true" />
            </span>
            <p className="mt-6 text-7xl font-bold tracking-tight text-white/95">404</p>
            <p className="mt-4 leading-7 text-blue-100">The route could not be found.</p>
            <Link href="/" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-white">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Return to Circle Wave
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
