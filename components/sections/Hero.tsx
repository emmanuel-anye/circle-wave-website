"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2, Globe2, Headphones, Users2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import ConversionLink from "@/components/analytics/ConversionLink";
import MotionButton from "@/components/ui/MotionButton";
import { heroContainer, heroItem, heroVisual } from "@/lib/motion";

const capabilityItems = [
  "Flexible staffing models",
  "Customer support specialists",
  "Operational consulting",
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-600 pb-20 pt-16 text-white sm:pb-24 sm:pt-20 lg:min-h-[760px] lg:pb-28 lg:pt-24">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_14%_18%,rgba(96,165,250,0.25),transparent_28%),radial-gradient(circle_at_82%_24%,rgba(34,211,238,0.18),transparent_26%),linear-gradient(135deg,transparent_42%,rgba(255,255,255,0.05)_42%,rgba(255,255,255,0.05)_43%,transparent_43%)]" />
      <motion.div
        aria-hidden="true"
        className="absolute -left-32 top-28 -z-10 h-80 w-80 rounded-full border border-white/10"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-20 bottom-10 -z-10 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl"
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.55, 0.8, 0.55] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 text-sm text-blue-100">
          <p className="font-medium">Recruitment support built around service quality and sustainable growth.</p>
          <a href="#services" className="group inline-flex items-center gap-2 font-semibold text-white">
            Explore our capabilities
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <motion.div
            className="max-w-2xl"
            data-motion-stagger
            variants={heroContainer}
            initial={prefersReducedMotion ? false : "hidden"}
            animate={prefersReducedMotion ? undefined : "visible"}
          >
            <motion.div data-motion-item variants={heroItem}>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100 backdrop-blur">
                <Globe2 className="h-4 w-4" aria-hidden="true" />
                Global staffing and customer support
              </div>
            </motion.div>

            <motion.div data-motion-item variants={heroItem}>
              <h1 className="mt-7 max-w-3xl text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-[4.6rem]">
                Build a customer support team that moves your business forward.
              </h1>
            </motion.div>

            <motion.div data-motion-item variants={heroItem}>
              <p className="mt-7 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
                Circle Wave connects growing organizations with service-focused talent and practical operational guidance across Africa and beyond.
              </p>
            </motion.div>

            <motion.div data-motion-item variants={heroItem}>
              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                {capabilityItems.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm leading-6 text-blue-50">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div data-motion-item variants={heroItem}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <ConversionLink
                  href="/employers#hiring-brief"
                  event={{ name: "cta_clicked", properties: { audience: "employer", placement: "hero", action: "start_hiring_brief" } }}
                >
                  <MotionButton className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-blue-950 shadow-xl shadow-blue-950/20 sm:w-auto">
                    Start a hiring brief
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </MotionButton>
                </ConversionLink>

                <ConversionLink
                  href="/jobs"
                  event={{ name: "cta_clicked", properties: { audience: "candidate", placement: "hero", action: "view_open_roles" } }}
                >
                  <MotionButton className="inline-flex w-full justify-center rounded-xl border border-white/50 bg-white/5 px-6 py-3.5 font-semibold text-white backdrop-blur sm:w-auto">
                    Explore open roles
                  </MotionButton>
                </ConversionLink>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-2xl lg:max-w-none"
            data-motion-reveal
            variants={heroVisual}
            initial={prefersReducedMotion ? false : "hidden"}
            animate={prefersReducedMotion ? undefined : "visible"}
          >
            <div className="absolute -inset-5 rounded-[2.5rem] bg-white/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.25rem] border border-white/15 bg-white/10 p-2 shadow-2xl shadow-blue-950/40 backdrop-blur">
              <Image
                src="/images/hero-support.jpg"
                alt="Customer support professional working with headset"
                width={1200}
                height={900}
                priority
                className="h-[360px] w-full rounded-[1.8rem] object-cover sm:h-[430px] lg:h-[520px]"
              />
              <div className="absolute inset-x-2 bottom-2 h-40 rounded-b-[1.8rem] bg-gradient-to-t from-blue-950/85 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-7 left-7 right-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">Service-first recruitment</p>
                <p className="mt-2 max-w-sm text-lg font-semibold leading-7 text-white">Flexible talent and operational support for teams at every stage of growth.</p>
              </div>
            </div>

            <motion.div
              className="absolute -left-5 top-10 hidden w-52 rounded-2xl border border-white/20 bg-blue-950/75 p-4 shadow-xl backdrop-blur md:block"
              animate={prefersReducedMotion ? undefined : { y: [0, -7, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-cyan-300/15 p-2 text-cyan-200"><Headphones className="h-5 w-5" aria-hidden="true" /></div>
                <div><p className="text-xs text-blue-200">Support operations</p><p className="mt-1 text-sm font-semibold">Built around your customer</p></div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-7 right-4 w-56 rounded-2xl border border-white/20 bg-white p-4 text-slate-900 shadow-2xl sm:right-8"
              animate={prefersReducedMotion ? undefined : { y: [0, 7, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-100 p-2 text-blue-700"><Users2 className="h-5 w-5" aria-hidden="true" /></div>
                <div><p className="text-xs font-medium text-slate-500">Two clear pathways</p><p className="mt-1 text-sm font-semibold">Hire talent or find your next role</p></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
