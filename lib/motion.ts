import type { Variants } from "framer-motion";

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.25,
      ease: easeOut,
    },
  },
};

export const sectionReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

export const staggerContainer = (
  staggerChildren = 0.08,
  delayChildren = 0
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

export const hoverLift = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: "0px 1px 2px rgba(15, 23, 42, 0.04)",
  },
  hover: {
    y: -6,
    scale: 1.01,
    boxShadow: "0px 14px 34px rgba(15, 23, 42, 0.10)",
    transition: {
      duration: 0.22,
      ease: easeOut,
    },
  },
};

export const buttonMotion = {
  rest: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -2,
    scale: 1.02,
    transition: {
      duration: 0.18,
      ease: easeOut,
    },
  },
  tap: {
    scale: 0.985,
    y: 0,
    transition: {
      duration: 0.12,
      ease: easeOut,
    },
  },
};