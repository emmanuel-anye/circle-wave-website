"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { pageVariants } from "@/lib/motion";

export default function PageTransition({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : "initial"}
      animate={prefersReducedMotion ? undefined : "animate"}
      exit={prefersReducedMotion ? undefined : "exit"}
      variants={pageVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
