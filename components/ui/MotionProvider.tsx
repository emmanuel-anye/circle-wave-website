"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export default function MotionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "never"}>
      {children}
    </MotionConfig>
  );
}