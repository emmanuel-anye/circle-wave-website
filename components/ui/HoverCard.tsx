"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { hoverLift } from "@/lib/motion";

export default function HoverCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={hoverLift}
      className={className}
    >
      {children}
    </motion.div>
  );
}