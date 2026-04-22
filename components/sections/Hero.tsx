"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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
          animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-4 top-20 h-52 w-52 rounded-full bg-cyan-300 blur-3xl sm:right-10 sm:h-72 sm:w-72"
          animate={{ y: [0, 16, 0], x: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200 sm:text-sm"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Global Staffing & Customer Support
          </motion.p>

          <motion.h1
            className="mt-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Customer service staffing and consulting for growing businesses
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg sm:leading-8 md:text-xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Circle Wave helps organizations build high-performing customer support
            teams with flexible staffing, operational guidance, and service-focused
            talent across Africa and beyond.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link href="/employers">
              <motion.span
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-full justify-center rounded-lg bg-white px-6 py-3 font-semibold text-blue-800 shadow-lg sm:w-auto"
              >
                Request Staffing
              </motion.span>
            </Link>

            <Link href="/careers">
              <motion.span
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-full justify-center rounded-lg border border-white/70 px-6 py-3 font-semibold text-white sm:w-auto"
              >
                Apply for Jobs
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}