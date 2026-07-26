"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { trackConversion, type ConversionEvent } from "@/lib/analytics";

export default function ConversionLink({
  event,
  onClick,
  children,
  ...props
}: ComponentProps<typeof Link> & {
  event: ConversionEvent;
  children: ReactNode;
}) {
  return (
    <Link
      {...props}
      onClick={(clickEvent) => {
        trackConversion(event);
        onClick?.(clickEvent);
      }}
    >
      {children}
    </Link>
  );
}
