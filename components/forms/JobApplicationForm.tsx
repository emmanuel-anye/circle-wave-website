"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import FormStatus from "@/components/ui/FormStatus";
import { trackConversion } from "@/lib/analytics";
import { buttonMotion } from "@/lib/motion";

const emptyForm = {
  full_name: "",
  email: "",
  phone: "",
  location: "",
  availability: "",
  experience_level: "",
  languages: "",
  technical_skills: "",
  cover_letter: "",
  website: "",
};

const steps = ["Your details", "Work profile", "Résumé and review"];

export default function JobApplicationForm({
  jobId,
  jobTitle,
}: {
  jobId: string;
  jobTitle: string;
}) {
  const [formData, setFormData] = useState(emptyForm);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasStarted = useRef(false);
  const submissionInFlight = useRef(false);
  const submissionToken = useRef("");
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      stepHeadingRef.current?.focus();
    } else {
      hasMounted.current = true;
    }
  }, [currentStep]);

  function handleStart() {
    if (hasStarted.current) return;
    hasStarted.current = true;
    trackConversion({
      name: "application_started",
      properties: { has_job: Boolean(jobId) },
    });
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  }

  function continueToNextStep() {
    const controls = formRef.current?.querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >(`[data-step="${currentStep}"] input, [data-step="${currentStep}"] textarea, [data-step="${currentStep}"] select`);

    for (const control of controls ?? []) {
      if (!control.checkValidity()) {
        control.reportValidity();
        control.focus();
        return;
      }
    }

    setErrorMessage("");
    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (currentStep < steps.length - 1) {
      continueToNextStep();
      return;
    }
    if (submissionInFlight.current) return;

    if (!resumeFile) {
      setErrorMessage("Please upload your résumé.");
      fileInputRef.current?.focus();
      return;
    }

    submissionInFlight.current = true;
    setLoading(true);
    setErrorMessage("");

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => payload.set(key, value));
      payload.set("job_id", jobId);
      if (!submissionToken.current) {
        submissionToken.current = crypto.randomUUID();
      }
      payload.set("submission_token", submissionToken.current);
      payload.set("resume", resumeFile);

      const response = await fetch("/api/submissions/application", {
        method: "POST",
        body: payload,
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.error || "Unable to submit the application.");
      }

      setReference(result.reference);
      trackConversion({
        name: "application_completed",
        properties: { has_job: true },
      });
      setFormData(emptyForm);
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit the application. Please try again."
      );
    } finally {
      submissionInFlight.current = false;
      setLoading(false);
    }
  }

  if (!jobId) {
    return (
      <CandidateChoice
        title="Choose your next step"
        description="Applications must be connected to an open position. Browse current roles or register your profile for future relevant opportunities."
      />
    );
  }

  if (reference) {
    return (
      <section className="bg-slate-50 section">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-[2rem] border border-emerald-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Application received
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">
              Thank you for applying
            </h1>
            <p className="mt-4 leading-7 text-slate-600">
              Save this non-sensitive reference if you contact Circle Wave about
              your submission.
            </p>
            <p className="mt-5 rounded-xl bg-slate-100 px-5 py-4 font-mono text-lg font-semibold text-slate-900">
              {reference}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/jobs"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Browse other roles
              </Link>
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-900 hover:bg-slate-50"
              >
                Return home
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 section">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Candidate application
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Apply for this role
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Complete the three steps below. Your résumé is uploaded privately and
            is available only through authorized administrative access.
          </p>
          {jobTitle && (
            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                Applying for
              </p>
              <p className="mt-1 font-semibold text-blue-950">{jobTitle}</p>
            </div>
          )}
        </div>

        <nav aria-label="Application progress" className="mb-8">
          <p className="mb-3 text-sm font-semibold text-slate-700">
            Step {currentStep + 1} of {steps.length}
          </p>
          <ol className="grid gap-3 sm:grid-cols-3">
            {steps.map((step, index) => (
              <li
                key={step}
                aria-current={index === currentStep ? "step" : undefined}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                  index === currentStep
                    ? "border-blue-600 bg-blue-50 text-blue-900"
                    : index < currentStep
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-slate-200 bg-white text-slate-500"
                }`}
              >
                {index + 1}. {step}
              </li>
            ))}
          </ol>
        </nav>

        <div className="form-card">
          <div className="form-header">
            <h2
              ref={stepHeadingRef}
              tabIndex={-1}
              className="text-2xl font-semibold focus:outline-none"
            >
              {steps[currentStep]}
            </h2>
            <p className="mt-2 text-sm leading-6 text-blue-100">
              Required fields are marked. Do not include sensitive personal
              information beyond what this application requests.
            </p>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            onFocus={handleStart}
            className="form-body"
            aria-busy={loading}
          >
            <input
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            {currentStep === 0 && (
              <fieldset data-step="0" className="grid gap-6 md:grid-cols-2">
                <legend className="sr-only">Your details</legend>
                <Field label="Full name" id="full_name" required>
                  <input
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className="input"
                  />
                </Field>
                <Field label="Email address" id="email" required>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="input"
                  />
                </Field>
                <Field label="Phone number" id="phone">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    className="input"
                  />
                </Field>
                <Field label="Location" id="location">
                  <input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    autoComplete="address-level2"
                    placeholder="City, country"
                    className="input"
                  />
                </Field>
              </fieldset>
            )}

            {currentStep === 1 && (
              <fieldset data-step="1" className="grid gap-6 md:grid-cols-2">
                <legend className="sr-only">Work profile</legend>
                <Field label="Availability" id="availability" required>
                  <select
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                    className="input"
                  >
                    <option value="">Select availability</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </Field>
                <Field label="Experience level" id="experience_level" required>
                  <select
                    id="experience_level"
                    name="experience_level"
                    value={formData.experience_level}
                    onChange={handleChange}
                    required
                    className="input"
                  >
                    <option value="">Select experience level</option>
                    <option value="Entry">Entry</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                  </select>
                </Field>
                <Field label="Languages" id="languages">
                  <input
                    id="languages"
                    name="languages"
                    value={formData.languages}
                    onChange={handleChange}
                    placeholder="For example: English, French"
                    className="input"
                  />
                </Field>
                <Field label="Core skills" id="technical_skills">
                  <input
                    id="technical_skills"
                    name="technical_skills"
                    value={formData.technical_skills}
                    onChange={handleChange}
                    placeholder="For example: CRM, quality assurance"
                    className="input"
                  />
                </Field>
              </fieldset>
            )}

            {currentStep === 2 && (
              <fieldset data-step="2" className="grid gap-6">
                <legend className="sr-only">Résumé and review</legend>
                <Field label="Résumé" id="resume" required>
                  <>
                    <input
                      ref={fileInputRef}
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(event) =>
                        setResumeFile(event.target.files?.[0] ?? null)
                      }
                      required
                      className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-medium file:text-blue-700"
                    />
                    <p className="mt-2 text-sm text-slate-500">
                      PDF, DOC, or DOCX; maximum 5 MB.
                    </p>
                  </>
                </Field>
                <Field label="Cover letter" id="cover_letter">
                  <textarea
                    id="cover_letter"
                    name="cover_letter"
                    value={formData.cover_letter}
                    onChange={handleChange}
                    rows={6}
                    className="input min-h-[180px] resize-y"
                    placeholder="Explain your relevant experience and interest in this role."
                  />
                </Field>
              </fieldset>
            )}

            <div className="flex flex-col gap-4 border-t border-slate-200 pt-6">
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                {currentStep > 0 ? (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setCurrentStep((step) => step - 1)}
                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-900 hover:bg-slate-50 disabled:opacity-60"
                  >
                    Back
                  </button>
                ) : (
                  <span />
                )}

                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={continueToNextStep}
                    className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                  >
                    Continue
                  </button>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={loading}
                    initial="rest"
                    animate="rest"
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonMotion}
                    className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Submitting…" : errorMessage ? "Try submission again" : "Submit application"}
                  </motion.button>
                )}
              </div>
              <FormStatus error={errorMessage} />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  required,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
    </div>
  );
}

function CandidateChoice({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="bg-slate-50 section">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
          <p className="mt-4 leading-8 text-slate-600">{description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/jobs"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Browse open positions
            </Link>
            <Link
              href="/talent-network"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-900 hover:bg-slate-50"
            >
              Join the talent network
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
