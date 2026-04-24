import PageTransition from "@/components/ui/PageTransition";
import Reveal from "@/components/ui/Reveal";
import HoverCard from "@/components/ui/HoverCard";

export default function TermsPage() {
  return (
    <PageTransition>
      <section className="bg-slate-50 section">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Terms of Use
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Terms and conditions
            </h1>
          </Reveal>

          <Reveal className="mt-10">
            <HoverCard className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-8 text-slate-600">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Use of Website
                </h2>
                <p className="mt-4 leading-8">
                  By using this website, you agree to use it for lawful purposes
                  only. You may not use the site in any way that interferes with
                  its operation, security, or availability.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Submitted Information
                </h2>
                <p className="mt-4 leading-8">
                  Information submitted through employer request forms, job
                  applications, and contact channels must be accurate and truthful.
                  Circle Wave may rely on the information provided in evaluating
                  staffing requests and candidate submissions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Services Disclaimer
                </h2>
                <p className="mt-4 leading-8">
                  Information on this website is provided for general business and
                  service information. Availability of staffing solutions, hiring
                  decisions, and consulting services may vary depending on business
                  requirements, geography, and operational capacity.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Contact
                </h2>
                <p className="mt-4 leading-8">
                  For questions about these terms, contact
                  {" "}
                  <a
                    href="mailto:info@circleswave.net"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    info@circleswave.net
                  </a>.
                </p>
              </div>
            </HoverCard>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}