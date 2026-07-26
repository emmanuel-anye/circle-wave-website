"use client";

export type ConversionEvent =
  | {
      name: "cta_clicked";
      properties: {
        audience: "employer" | "candidate";
        placement: "hero" | "audience_paths" | "final_cta" | "navigation";
        action: "start_hiring_brief" | "view_open_roles" | "join_talent_network";
      };
    }
  | {
      name: "consultation_cta_clicked";
      properties: {
        placement: "final_cta" | "employer_page";
        destination: "configured_booking_url" | "contact_fallback";
      };
    }
  | {
      name: "employer_brief_started" | "employer_brief_submitted";
      properties: {
        placement: "employer_page";
      };
    }
  | {
      name: "form_error";
      properties: {
        form: "employer_brief";
        stage: "validation" | "submission";
      };
    };

export type AnalyticsAdapter = {
  track: (event: ConversionEvent) => void | Promise<void>;
};

let activeAdapter: AnalyticsAdapter | null = null;

export function configureAnalytics(adapter: AnalyticsAdapter | null) {
  activeAdapter = adapter;
}

export function dispatchConversionEvent(
  event: ConversionEvent,
  {
    adapter = activeAdapter,
    doNotTrack = typeof navigator !== "undefined" && navigator.doNotTrack === "1",
  }: {
    adapter?: AnalyticsAdapter | null;
    doNotTrack?: boolean;
  } = {}
) {
  if (!adapter || doNotTrack) return false;

  try {
    void Promise.resolve(adapter.track(event)).catch(() => undefined);
    return true;
  } catch {
    return false;
  }
}

export function trackConversion(event: ConversionEvent) {
  return dispatchConversionEvent(event);
}
