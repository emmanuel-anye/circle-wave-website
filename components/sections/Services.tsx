"use client";

import { services } from "@/content/services";
import FadeIn from "@/components/ui/FadeIn";
import {
  Users,
  GraduationCap,
  Settings,
  Cpu,
  BarChart,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";

const icons = [
  Users,
  GraduationCap,
  Settings,
  Cpu,
  BarChart,
  Briefcase,
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-24">
  <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <FadeIn className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Our Services
          </p>
          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Everything you need to build a high-performing support team
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            From staffing to optimization, Circle Wave helps companies scale
            customer experience operations with confidence.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[index];

            return (
              <FadeIn key={service.title} delay={index * 0.08}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl"
                >
                  <motion.div
                    whileHover={{ rotate: 4, scale: 1.08 }}
                    className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700"
                  >
                    <Icon size={24} />
                  </motion.div>

                  <h3 className="text-xl font-semibold text-gray-900">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-gray-600 leading-7">
                    {service.description}
                  </p>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}