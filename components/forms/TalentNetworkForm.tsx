"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import FormStatus from "@/components/ui/FormStatus";
import { trackConversion } from "@/lib/analytics";
import { buttonMotion } from "@/lib/motion";
import {
  candidateAvailabilityOptions,
  candidateWorkPreferences,
  relocationPreferences,
} from "@/lib/talent-network-options";

const emptyForm = {
  full_name: "",
  email: "",
  phone: "",
  target_roles: "",
  core_skills: "",
  location: "",
  work_preference: "",
  relocation_preference: "",
  work_authorization: "",
  availability: "",
  salary_expectations: "",
  consent: false,
  website: "",
};

export default function TalentNetworkForm() {
  const [formData, setFormData] = useState(emptyForm);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasStarted = useRef(false);
  const submissionInFlight = useRef(false);

  function handleStart() {
    if (hasStarted.current) return;
    hasStarted.current = true;
    trackConversion({
      name: "talent_network_started",
      properties: { has_job: false },
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
      Object.entries(formData).forEach(([key, value]) =>
        payload.set(key, String(value))
      );
      payload.set("resume", resumeFile);

      const response = await fetch("/api/submissions/talent-network", {
        method: "POST",
        body: payload,
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.error || "Unable to register your profile.");
      }

      setReference(result.reference);
      trackConversion({
        name: "talent_network_completed",
        properties: { has_job: false },
      });
      setFormData(emptyForm);
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to register your profile. Please try again."
      );
    } finally {
      submissionInFlight.current = false;
      setLoading(false);
    }
  }

  if (reference) {
    return (
      <section className="bg-slate-50 section">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-[2rem] border border-emerald-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Profile registered
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">
              Your talent profile was received
            </h1>
            <p className="mt-4 leading-7 text-slate-600">
              Registration does not subscribe you to job alerts. Save this
              non-sensitive reference if you contact Circle Wave about your profile.
            </p>
            <p className="mt-5 rounded-xl bg-slate-100 px-5 py-4 font-mono text-lg font-semibold text-slate-900">
              {reference}
            </p>
            <Link
              href="/jobs"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Browse open positions
            </Link>
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
            Talent network
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Register your recruitment profile
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            If no current vacancy fits, share the information recruiters need to
            consider you for future relevant opportunities.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            This workflow does not activate email job alerts.
          </p>
        </div>

        <div className="form-card">
          <div className="form-header">
            <h2 className="text-2xl font-semibold">Candidate profile</h2>
            <p className="mt-2 text-sm leading-6 text-blue-100">
              Your résumé is stored privately. Required fields are marked.
            </p>
          </div>

          <form
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

            <fieldset>
              <legend className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Contact and interests
              </legend>
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                <Field id="talent-full-name" label="Full name" required>
                  <input
                    id="talent-full-name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className="input"
                  />
                </Field>
                <Field id="talent-email" label="Email address" required>
                  <input
                    id="talent-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="input"
                  />
                </Field>
                <Field id="talent-phone" label="Phone number">
                  <input
                    id="talent-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    className="input"
                  />
                </Field>
                <Field id="talent-location" label="Current location" required>
                  <input
                    id="talent-location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="City, country"
                    className="input"
                  />
                </Field>
                <div className="md:col-span-2">
                  <Field id="target_roles" label="Target roles" required>
                    <textarea
                      id="target_roles"
                      name="target_roles"
                      value={formData.target_roles}
                      onChange={handleChange}
                      required
                      rows={3}
                      placeholder="Roles or job families you want to be considered for"
                      className="input min-h-[110px] resize-y"
                    />
                  </Field>
                </div>
                <div className="md:col-span-2">
                  <Field id="core_skills" label="Core skills" required>
                    <textarea
                      id="core_skills"
                      name="core_skills"
                      value={formData.core_skills}
                      onChange={handleChange}
                      required
                      rows={3}
                      placeholder="Relevant tools, service skills, languages, or domain experience"
                      className="input min-h-[110px] resize-y"
                    />
                  </Field>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Work preferences
              </legend>
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                <Field id="work_preference" label="Work preference" required>
                  <Select
                    id="work_preference"
                    value={formData.work_preference}
                    options={candidateWorkPreferences}
                    placeholder="Select a preference"
                    onChange={handleChange}
                  />
                </Field>
                <Field
                  id="relocation_preference"
                  label="Relocation preference"
                  required
                >
                  <Select
                    id="relocation_preference"
                    value={formData.relocation_preference}
                    options={relocationPreferences}
                    placeholder="Select a preference"
                    onChange={handleChange}
                  />
                </Field>
                <Field id="availability" label="Availability" required>
                  <Select
                    id="availability"
                    value={formData.availability}
                    options={candidateAvailabilityOptions}
                    placeholder="Select availability"
                    onChange={handleChange}
                  />
                </Field>
                <Field
                  id="salary_expectations"
                  label="Salary expectations"
                >
                  <input
                    id="salary_expectations"
                    name="salary_expectations"
                    value={formData.salary_expectations}
                    onChange={handleChange}
                    placeholder="Optional amount, currency, and period"
                    className="input"
                  />
                </Field>
                <div className="md:col-span-2">
                  <Field
                    id="work_authorization"
                    label="Work authorization"
                    required
                  >
                    <textarea
                      id="work_authorization"
                      name="work_authorization"
                      value={formData.work_authorization}
                      onChange={handleChange}
                      required
                      rows={3}
                      placeholder="Countries or regions where you are currently authorized to work"
                      className="input min-h-[110px] resize-y"
                    />
                  </Field>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Résumé and consent
              </legend>
              <div className="mt-4 grid gap-6">
                <Field id="talent-resume" label="Résumé" required>
                  <>
                    <input
                      ref={fileInputRef}
                      id="talent-resume"
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
                <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={(event) =>
                      setFormData((previous) => ({
                        ...previous,
                        consent: event.target.checked,
                      }))
                    }
                    required
                    className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300"
                  />
                  <span>
                    I consent to Circle Wave storing and reviewing this profile
                    and résumé for recruitment purposes. This consent does not
                    subscribe me to job-alert emails. *
                  </span>
                </label>
              </div>
            </fieldset>

            <div className="flex flex-col gap-4 border-t border-slate-200 pt-6">
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
                {loading
                  ? "Registering…"
                  : errorMessage
                    ? "Try registration again"
                    : "Join the talent network"}
              </motion.button>
              <FormStatus error={errorMessage} />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
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

function Select({
  id,
  value,
  options,
  placeholder,
  onChange,
}: {
  id: string;
  value: string;
  options: readonly string[];
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required
      className="input"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
