"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { buttonMotion } from "@/lib/motion";

export default function MotionButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      initial="rest"
      animate="rest"
      whileHover={prefersReducedMotion ? undefined : "hover"}
      whileTap={prefersReducedMotion ? undefined : "tap"}
      variants={buttonMotion}
      className={className}
    >
      {children}
    </motion.span>
  );
}
