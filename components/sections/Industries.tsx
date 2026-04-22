"use client";

import FadeIn from "@/components/ui/FadeIn";
import { industries } from "@/content/industries";
import { motion } from "framer-motion";

export default function Industries() {
  return (
    <section id="industries" className="bg-slate-50 py-24">
  <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <FadeIn className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Industries We Serve
          </p>
          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Trusted across multiple industries
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We support organizations across sectors with tailored customer
            service and staffing solutions.
          </p>
        </FadeIn>

        <div className="mt-14 flex flex-wrap gap-4">
          {industries.map((industry, index) => (
            <FadeIn key={industry} delay={index * 0.04} y={16}>
              <motion.span
                whileHover={{ y: -3, scale: 1.03 }}
                className="inline-block rounded-full bg-white border border-gray-200 px-5 py-2 text-sm font-medium text-gray-700 shadow-sm"
              >
                {industry}
              </motion.span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}