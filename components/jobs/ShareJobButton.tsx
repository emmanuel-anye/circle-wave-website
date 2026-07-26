"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import { trackConversion } from "@/lib/analytics";

export default function ShareJobButton({ title }: { title: string }) {
  const [status, setStatus] = useState("");

  async function share() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        setStatus("Share options opened.");
        trackConversion({
          name: "job_shared",
          properties: { method: "native" },
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setStatus("Job link copied.");
      trackConversion({
        name: "job_shared",
        properties: { method: "clipboard" },
      });
    } catch {
      setStatus("Copy failed. Copy the address from your browser.");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={share}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
      >
        <Share2 aria-hidden="true" size={18} />
        Share role
      </button>
      <p className="mt-2 text-sm text-slate-600" role="status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
