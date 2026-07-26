"use client";

import Link from "next/link";
import MotionButton from "@/components/ui/MotionButton";
import { trackConversion } from "@/lib/analytics";
import { normalizeBookingUrl } from "@/lib/booking";

export default function ConsultationCTA({
  placement,
  bookingUrl = process.env.NEXT_PUBLIC_CONSULTATION_BOOKING_URL,
  className = "inline-flex justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-400 hover:bg-slate-50",
}: {
  placement: "final_cta" | "employer_page";
  bookingUrl?: string | null;
  className?: string;
}) {
  const configuredUrl = normalizeBookingUrl(bookingUrl);
  const event = {
    name: "consultation_cta_clicked" as const,
    properties: {
      placement,
      destination: configuredUrl
        ? ("configured_booking_url" as const)
        : ("contact_fallback" as const),
    },
  };

  if (configuredUrl) {
    return (
      <a
        href={configuredUrl}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackConversion(event)}
      >
        <MotionButton className={className}>Book a consultation</MotionButton>
      </a>
    );
  }

  return (
    <Link
      href="/contact?subject=Consultation"
      onClick={() => trackConversion(event)}
    >
      <MotionButton className={className}>
        Contact us to schedule
      </MotionButton>
    </Link>
  );
}
