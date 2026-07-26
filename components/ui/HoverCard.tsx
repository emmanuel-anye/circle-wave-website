"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { hoverLift } from "@/lib/motion";

export default function HoverCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover={prefersReducedMotion ? undefined : "hover"}
      variants={hoverLift}
      className={className}
    >
      {children}
    </motion.div>
  );
}
