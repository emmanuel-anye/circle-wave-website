export default function PrivacyPage() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
          Privacy Policy
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          How we collect and use information
        </h1>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-8 text-slate-600">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Information We Collect
            </h2>
            <p className="mt-4 leading-8">
              Circle Wave may collect information submitted through employer
              request forms, job applications, contact forms, and direct
              communication channels. This may include names, business details,
              contact information, staffing needs, resumes, and application
              details.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              How We Use Information
            </h2>
            <p className="mt-4 leading-8">
              We use submitted information to evaluate staffing requests,
              process job applications, communicate with clients and candidates,
              improve our services, and maintain business operations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Data Protection
            </h2>
            <p className="mt-4 leading-8">
              We take reasonable measures to protect personal and business
              information submitted to us. Access to submitted information is
              limited to authorized personnel and service providers involved in
              business operations, staffing, and recruitment processes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Contact
            </h2>
            <p className="mt-4 leading-8">
              For privacy-related questions, please contact us at
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