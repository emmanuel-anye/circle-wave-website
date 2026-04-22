"use client";

import FadeIn from "@/components/ui/FadeIn";
import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-950 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <FadeIn>
            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-2xl bg-white/10 backdrop-blur p-10 border border-white/10"
            >
              <p className="text-sm font-semibold uppercase text-blue-200">
                For Employers
              </p>
              <h3 className="mt-4 text-3xl font-bold">
                Build your customer service team with confidence
              </h3>
              <p className="mt-4 text-blue-100 leading-7">
                Tell us your hiring needs, required roles, and timelines. We’ll
                connect you with trained professionals ready to deliver results.
              </p>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 rounded-lg bg-white px-6 py-3 font-semibold text-blue-900 hover:bg-gray-100 transition"
              >
                Request Staffing
              </motion.button>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-2xl bg-blue-600 p-10 border border-white/10"
            >
              <p className="text-sm font-semibold uppercase text-blue-100">
                For Job Seekers
              </p>
              <h3 className="mt-4 text-3xl font-bold">
                Join a global network of support professionals
              </h3>
              <p className="mt-4 text-blue-100 leading-7">
                Apply to be part of our talent pool and access customer service
                opportunities across industries worldwide.
              </p>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 rounded-lg border border-white px-6 py-3 font-semibold text-white hover:bg-white hover:text-blue-700 transition"
              >
                Apply for Jobs
              </motion.button>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}