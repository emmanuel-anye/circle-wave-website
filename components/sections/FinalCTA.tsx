"use client";

import ConversionLink from "@/components/analytics/ConversionLink";
import ConsultationCTA from "@/components/conversion/ConsultationCTA";
import Reveal from "@/components/ui/Reveal";
import MotionButton from "@/components/ui/MotionButton";

export default function FinalCTA() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-slate-50 px-6 py-10 shadow-xl shadow-blue-100/50 sm:px-8 md:px-10">
            <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Let’s Work Together
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Ready to strengthen your customer service operation?
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                  Whether you need staffing support, remote customer service talent,
                  or a more structured support model, Circle Wave is ready to help.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-start">
                <ConversionLink
                  href="/employers#hiring-brief"
                  event={{
                    name: "cta_clicked",
                    properties: {
                      audience: "employer",
                      placement: "final_cta",
                      action: "start_hiring_brief",
                    },
                  }}
                >
                  <MotionButton className="inline-flex w-full justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700 sm:w-auto">
                    Start a hiring brief
                  </MotionButton>
                </ConversionLink>

                <ConsultationCTA
                  placement="final_cta"
                  className="inline-flex w-full justify-center rounded-xl border border-slate-300 px-6 py-3.5 font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
                />

                <ConversionLink
                  href="/jobs"
                  event={{
                    name: "cta_clicked",
                    properties: {
                      audience: "candidate",
                      placement: "final_cta",
                      action: "view_open_roles",
                    },
                  }}
                  className="text-sm font-semibold text-blue-700 hover:text-blue-800"
                >
                  Looking for work? Explore open roles
                </ConversionLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
