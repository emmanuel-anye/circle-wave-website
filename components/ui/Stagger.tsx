"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { staggerContainer, staggerItem } from "@/lib/motion";

export function StaggerGroup({
  children,
  className = "",
  staggerChildren = 0.08,
  delayChildren = 0,
  once = true,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      data-motion-stagger
      variants={staggerContainer(staggerChildren, delayChildren)}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      data-motion-item
      variants={staggerItem}
    >
      {children}
    </motion.div>
  );
}
