"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, LockKeyhole, UploadCloud } from "lucide-react";
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
      <section className="relative isolate overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
        <div className="absolute inset-0 -z-10 opacity-80 [background:radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.28),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(37,99,235,0.35),transparent_36%)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
              <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Application received
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight">Thank you for applying</h1>
            <p className="mt-4 max-w-2xl leading-8 text-slate-300">
              Your application has been submitted securely. Save this non-sensitive reference if you contact Circle Wave about your submission.
            </p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Application reference</p>
              <p className="mt-2 font-mono text-xl font-semibold text-white">{reference}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/jobs" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5">
                Browse other roles
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                Return home
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div>
            <Link href="/jobs" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to jobs
            </Link>
            <div className="mt-6 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Candidate application</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Apply with confidence</h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Complete three guided steps. Your résumé is uploaded privately and is available only through authorized administrative access.
              </p>
            </div>

            {jobTitle && (
              <div className="mt-7 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Applying for</p>
                <p className="mt-1 text-lg font-semibold text-blue-950">{jobTitle}</p>
              </div>
            )}

            <nav aria-label="Application progress" className="mt-8">
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-slate-700">Step {currentStep + 1} of {steps.length}</p>
                <p className="text-sm text-slate-500">{Math.round(((currentStep + 1) / steps.length) * 100)}% complete</p>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
              </div>
              <ol className="mt-4 grid gap-3 sm:grid-cols-3">
                {steps.map((step, index) => (
                  <li key={step} aria-current={index === currentStep ? "step" : undefined} className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${index === currentStep ? "border-blue-600 bg-blue-50 text-blue-900" : index < currentStep ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-white text-slate-500"}`}>
                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs shadow-sm">{index < currentStep ? "✓" : index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
              <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-7 py-6 text-white sm:px-9">
                <h2 ref={stepHeadingRef} tabIndex={-1} className="text-2xl font-semibold focus:outline-none">{steps[currentStep]}</h2>
                <p className="mt-2 text-sm leading-6 text-blue-100">Required fields are marked. Do not include sensitive personal information beyond what this application requests.</p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} onFocus={handleStart} className="p-7 sm:p-9" aria-busy={loading}>
                <input name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                {currentStep === 0 && (
                  <fieldset data-step="0" className="grid gap-6 md:grid-cols-2">
                    <legend className="sr-only">Your details</legend>
                    <Field label="Full name" id="full_name" required><input id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required autoComplete="name" className="input" /></Field>
                    <Field label="Email address" id="email" required><input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required autoComplete="email" className="input" /></Field>
                    <Field label="Phone number" id="phone"><input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} autoComplete="tel" className="input" /></Field>
                    <Field label="Location" id="location"><input id="location" name="location" value={formData.location} onChange={handleChange} autoComplete="address-level2" placeholder="City, country" className="input" /></Field>
                  </fieldset>
                )}

                {currentStep === 1 && (
                  <fieldset data-step="1" className="grid gap-6 md:grid-cols-2">
                    <legend className="sr-only">Work profile</legend>
                    <Field label="Availability" id="availability" required><select id="availability" name="availability" value={formData.availability} onChange={handleChange} required className="input"><option value="">Select availability</option><option value="Full-time">Full-time</option><option value="Part-time">Part-time</option><option value="Contract">Contract</option></select></Field>
                    <Field label="Experience level" id="experience_level" required><select id="experience_level" name="experience_level" value={formData.experience_level} onChange={handleChange} required className="input"><option value="">Select experience level</option><option value="Entry">Entry</option><option value="Mid">Mid</option><option value="Senior">Senior</option></select></Field>
                    <Field label="Languages" id="languages"><input id="languages" name="languages" value={formData.languages} onChange={handleChange} placeholder="For example: English, French" className="input" /></Field>
                    <Field label="Core skills" id="technical_skills"><input id="technical_skills" name="technical_skills" value={formData.technical_skills} onChange={handleChange} placeholder="For example: CRM, quality assurance" className="input" /></Field>
                  </fieldset>
                )}

                {currentStep === 2 && (
                  <fieldset data-step="2" className="grid gap-6">
                    <legend className="sr-only">Résumé and review</legend>
                    <Field label="Résumé" id="resume" required>
                      <div className="rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/60 p-6">
                        <div className="flex items-start gap-4">
                          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm"><UploadCloud className="h-6 w-6" aria-hidden="true" /></span>
                          <div className="min-w-0 flex-1">
                            <input ref={fileInputRef} id="resume" type="file" accept=".pdf,.doc,.docx" onChange={(event) => setResumeFile(event.target.files?.[0] ?? null)} required className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-medium file:text-white" />
                            <p className="mt-3 text-sm text-slate-500">PDF, DOC, or DOCX; maximum 5 MB.</p>
                            {resumeFile && <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-emerald-700"><CheckCircle2 className="h-4 w-4" aria-hidden="true" />{resumeFile.name}</p>}
                          </div>
                        </div>
                      </div>
                    </Field>
                    <Field label="Cover letter" id="cover_letter"><textarea id="cover_letter" name="cover_letter" value={formData.cover_letter} onChange={handleChange} rows={6} className="input min-h-[180px] resize-y" placeholder="Explain your relevant experience and interest in this role." /></Field>
                  </fieldset>
                )}

                <div className="mt-8 border-t border-slate-200 pt-6">
                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                    {currentStep > 0 ? <button type="button" disabled={loading} onClick={() => setCurrentStep((step) => step - 1)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-900 hover:bg-slate-50 disabled:opacity-60"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back</button> : <span />}
                    {currentStep < steps.length - 1 ? <button type="button" onClick={continueToNextStep} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Continue<ArrowRight className="h-4 w-4" aria-hidden="true" /></button> : <motion.button type="submit" disabled={loading} initial="rest" animate="rest" whileHover="hover" whileTap="tap" variants={buttonMotion} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Submitting…" : errorMessage ? "Try submission again" : "Submit application"}<ArrowRight className="h-4 w-4" aria-hidden="true" /></motion.button>}
                  </div>
                  <div className="mt-4"><FormStatus error={errorMessage} /></div>
                </div>
              </form>
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><LockKeyhole className="h-5 w-5" aria-hidden="true" /></span>
              <h2 className="mt-5 text-xl font-semibold text-slate-900">Your information stays private</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">Application details and résumé files are available only through authorized administrative access.</p>
            </div>
            <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm"><FileText className="h-5 w-5" aria-hidden="true" /></span>
              <h2 className="mt-5 text-xl font-semibold text-slate-900">Before you submit</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />Use an active email address.</li>
                <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />Review your résumé and contact details.</li>
                <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />Save the confirmation reference.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({ label, id, required, children }: { label: string; id: string; required?: boolean; children: React.ReactNode }) {
  return <div><label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">{label}{required && <span aria-hidden="true" className="text-blue-600"> *</span>}</label>{children}</div>;
}

function CandidateChoice({ title, description }: { title: string; description: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 py-20 text-white sm:py-24">
      <div className="absolute inset-0 -z-10 opacity-70 [background:radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.28),transparent_30%)]" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Candidate journey</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">{title}</h1>
          <p className="mt-4 leading-8 text-blue-100">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/jobs" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-950 transition hover:-translate-y-0.5">Browse open positions<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link href="/talent-network" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10">Join the talent network</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
