"use client";

import { useEffect } from "react";
import { trackConversion } from "@/lib/analytics";

export default function JobViewTracker({ hasSalary }: { hasSalary: boolean }) {
  useEffect(() => {
    trackConversion({
      name: "job_view",
      properties: { has_salary: hasSalary },
    });
  }, [hasSalary]);

  return null;
}
