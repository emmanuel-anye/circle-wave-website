"use client";

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
          className={`rounded-xl border px-4 py-3 text-sm ${
            error
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-green-200 bg-green-50 text-green-700"
          }`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
