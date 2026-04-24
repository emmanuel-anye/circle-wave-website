"use client";

import Image from "next/image";
import Link from "next/link";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import MotionButton from "@/components/ui/MotionButton";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-950 via-blue-900 to-blue-600 py-20 text-white sm:py-24 md:py-28">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-16 left-0 h-56 w-56 rounded-full bg-blue-300 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-300 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <StaggerGroup className="max-w-2xl" staggerChildren={0.08}>
          <StaggerItem>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200 sm:text-sm">
              Global Staffing & Customer Support
            </p>
          </StaggerItem>

          <StaggerItem>
            <h1 className="mt-6 max-w-xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[4.25rem]">
              Customer service staffing and consulting for growing businesses
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="mt-6 max-w-xl text-base leading-8 text-blue-100 sm:text-lg">
              Circle Wave helps organizations build high-performing customer support
              teams with flexible staffing, operational guidance, and service-focused
              talent across Africa and beyond.
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/employers">
                <MotionButton className="inline-flex w-full justify-center rounded-xl bg-white px-6 py-3.5 font-semibold text-blue-900 shadow-lg sm:w-auto">
                  Request Staffing
                </MotionButton>
              </Link>

              <Link href="/careers">
                <MotionButton className="inline-flex w-full justify-center rounded-xl border border-white/60 px-6 py-3.5 font-semibold text-white sm:w-auto">
                  Apply for Jobs
                </MotionButton>
              </Link>
            </div>
          </StaggerItem>
        </StaggerGroup>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-white/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 shadow-2xl">
            <img
              src="/hero-support.jpg"
              alt="Customer support professional working with headset"
              className="h-[320px] w-full object-cover sm:h-[380px] lg:h-[460px] rounded-2xl shadow-lg float"
            />
          </div>

          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur md:block">
            <p className="text-xs uppercase tracking-[0.18em] text-blue-200">
              Trusted support
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              Flexible staffing for modern teams
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}