"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import MotionButton from "@/components/ui/MotionButton";
import HoverCard from "@/components/ui/HoverCard";

export default function CallToAction() {
  return (
    <section className="bg-gradient-to-r from-blue-950 to-blue-700 py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <HoverCard className="rounded-2xl border border-white/10 bg-white/10 p-10 backdrop-blur">
              <p className="text-sm font-semibold uppercase text-blue-200">
                For Employers
              </p>
              <h3 className="mt-4 text-3xl font-bold">
                Build your customer service team with confidence
              </h3>
              <p className="mt-4 leading-7 text-blue-100">
                Tell us your hiring needs, required roles, and timelines. We’ll
                connect you with trained professionals ready to deliver results.
              </p>
              <Link href="/employers">
                <MotionButton className="mt-6 inline-flex rounded-lg bg-white px-6 py-3 font-semibold text-blue-900 transition hover:bg-gray-100">
                  Request Staffing
                </MotionButton>
              </Link>
            </HoverCard>
          </Reveal>

          <Reveal>
            <HoverCard className="rounded-2xl border border-white/10 bg-blue-600 p-10">
              <p className="text-sm font-semibold uppercase text-blue-100">
                For Job Seekers
              </p>
              <h3 className="mt-4 text-3xl font-bold">
                Join a global network of support professionals
              </h3>
              <p className="mt-4 leading-7 text-blue-100">
                Apply to be part of our talent pool and access customer service
                opportunities across industries worldwide.
              </p>
              <Link href="/careers">
                <MotionButton className="mt-6 inline-flex rounded-lg border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-blue-700">
                  Apply for Jobs
                </MotionButton>
              </Link>
            </HoverCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}