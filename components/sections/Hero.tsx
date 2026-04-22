"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-950 via-blue-900 to-blue-600 text-white py-28">
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.2 }}
      >
        <motion.div
          className="absolute -top-10 left-10 h-56 w-56 rounded-full bg-blue-300 blur-3xl"
          animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-20 right-10 h-72 w-72 rounded-full bg-cyan-300 blur-3xl"
          animate={{ y: [0, 16, 0], x: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Global Staffing & Customer Support
          </motion.p>

          <motion.h1
            className="mt-6 text-5xl md:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Customer service staffing and consulting for growing businesses
          </motion.h1>

          <motion.p
            className="mt-6 text-lg md:text-xl max-w-2xl text-blue-100 leading-8"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Circle Wave helps organizations build high-performing customer support
            teams with flexible staffing, operational guidance, and service-focused
            talent across Africa and beyond.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link href="/employers">
              <motion.span
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex bg-white text-blue-800 px-6 py-3 rounded-lg font-semibold shadow-lg"
              >
                Request Staffing
              </motion.span>
            </Link>

            <Link href="/careers">
              <motion.span
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex border border-white/70 px-6 py-3 rounded-lg text-white font-semibold"
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