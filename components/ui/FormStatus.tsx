"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { formStatusMotion } from "@/lib/motion";

export default function FormStatus({
  success,
  error,
}: {
  success?: string;
  error?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const message = error || success;
  const Icon = error ? AlertCircle : CheckCircle2;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {message && (
        <motion.div
          key={error ? `error-${error}` : `success-${success}`}
          role={error ? "alert" : "status"}
          aria-live={error ? "assertive" : "polite"}
          aria-atomic="true"
          variants={formStatusMotion}
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          exit={prefersReducedMotion ? undefined : "exit"}
          className={`flex items-start gap-3 rounded-2xl border px-4 py-4 text-sm shadow-sm ${
            error
              ? "border-red-200 bg-red-50 text-red-800"
              : "border-emerald-200 bg-emerald-50 text-emerald-800"
          }`}
        >
          <span
            className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
              error ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
            }`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="pt-0.5">
            <p className="font-semibold">{error ? "Please check the form" : "Success"}</p>
            <p className="mt-1 leading-6">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
