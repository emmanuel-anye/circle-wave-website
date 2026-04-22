"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { sectionReveal } from "@/lib/motion";

export default function Reveal({
  children,
  className = "",
  once = true,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}