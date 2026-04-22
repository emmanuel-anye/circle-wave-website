"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { buttonMotion } from "@/lib/motion";

export default function MotionButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="tap"
      variants={buttonMotion}
      className={className}
    >
      {children}
    </motion.span>
  );
}