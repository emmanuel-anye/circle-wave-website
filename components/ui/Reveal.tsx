"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { sectionReveal } from "@/lib/motion";

export default function Reveal({
  children,
  className = "",
  once = true,
  amount = 0.2,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      data-motion-reveal
      variants={sectionReveal}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
