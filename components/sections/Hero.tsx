"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MotionButton from "@/components/ui/MotionButton";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-950 via-blue-900 to-blue-600 py-20 text-white sm:py-24 md:py-28">
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.2 }}
      >
        <motion.div
          className="absolute -top-10 left-4 h-40 w-40 rounded-full bg-blue-300 blur-3xl sm:left-10 sm:h-56 sm:w-56"
          animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-4 top-20 h-52 w-52 rounded-full bg-cyan-300 blur-3xl sm:right-10 sm:h-72 sm:w-72"
          animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <StaggerGroup className="max-w-3xl" staggerChildren={0.08}>
          <StaggerItem>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200 sm:text-sm">
              Global Staffing & Customer Support
            </p>
          </StaggerItem>

          <StaggerItem>
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Customer service staffing and consulting for growing businesses
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="mt-6 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg sm:leading-8 md:text-xl">
              Circle Wave helps organizations build high-performing customer support
              teams with flexible staffing, operational guidance, and service-focused
              talent across Africa and beyond.
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/employers">
                <MotionButton className="inline-flex w-full justify-center rounded-lg bg-white px-6 py-3 font-semibold text-blue-800 shadow-lg sm:w-auto">
                  Request Staffing
                </MotionButton>
              </Link>

              <Link href="/careers">
                <MotionButton className="inline-flex w-full justify-center rounded-lg border border-white/70 px-6 py-3 font-semibold text-white sm:w-auto">
                  Apply for Jobs
                </MotionButton>
              </Link>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}