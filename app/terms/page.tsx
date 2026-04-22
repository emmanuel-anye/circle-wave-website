export default function TermsPage() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
          Terms of Use
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Terms and conditions
        </h1>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-8 text-slate-600">
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
        </div>
      </div>
    </section>
  );
}