"use client";

import Link from "next/link";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative isolate min-h-[70vh] overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 -z-10 opacity-75 [background:radial-gradient(circle_at_20%_20%,rgba(239,68,68,0.25),transparent_28%),radial-gradient(circle_at_80%_75%,rgba(37,99,235,0.35),transparent_34%)]" />
      <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center px-4 py-20 sm:px-6">
        <div className="w-full rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-red-400/15 text-red-200">
            <AlertTriangle className="h-8 w-8" aria-hidden="true" />
          </span>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-red-200">Something went wrong</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            We could not load this page correctly.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Try the request again. If the issue continues, return to the homepage and continue from there.
          </p>
          {error.digest && (
            <p className="mt-5 rounded-xl border border-white/10 bg-black/20 px-4 py-3 font-mono text-xs text-slate-400">
              Reference: {error.digest}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5"
            >
              <RefreshCcw className="h-4 w-4" aria-hidden="true" />
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Go home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
