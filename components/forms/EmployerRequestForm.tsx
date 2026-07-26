"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import ConsultationCTA from "@/components/conversion/ConsultationCTA";
import FormStatus from "@/components/ui/FormStatus";
import Reveal from "@/components/ui/Reveal";
import {
  engagementTypes,
  headcountBands,
  hiringTimelines,
  preferredContactMethods,
  workModels,
} from "@/lib/employer-brief-options";
import { trackConversion } from "@/lib/analytics";
import { buttonMotion } from "@/lib/motion";

const initialForm = {
  company_name: "",
  contact_name: "",
  email: "",
  phone: "",
  preferred_contact_method: "Email",
  industry: "",
  job_roles: "",
  headcount: "",
  hiring_timeline: "",
  engagement_type: "",
  work_model: "",
  location: "",
  primary_goal: "",
  compliance_requirements: "",
  website: "",
};

export default function EmployerRequestForm() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const hasStarted = useRef(false);

  function handleFormStart() {
    if (hasStarted.current) return;
    hasStarted.current = true;
    trackConversion({
      name: "employer_brief_started",
      properties: { placement: "employer_page" },
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
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/submissions/employer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit your hiring brief.");
      }

      setSuccessMessage(
        "Your hiring brief has been submitted. Our team will review it and follow up."
      );
      setFormData(initialForm);
      hasStarted.current = false;
      trackConversion({
        name: "employer_brief_submitted",
        properties: { placement: "employer_page" },
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      trackConversion({
        name: "form_error",
        properties: { form: "employer_brief", stage: "submission" },
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="hiring-brief" className="scroll-mt-24 bg-slate-50 section">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              For employers
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Start with a focused hiring brief
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Share the roles, hiring timeline, and working model you need. We
              will use this brief to understand your request before following up.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="text-sm text-slate-500">Prefer a conversation?</span>
            <ConsultationCTA placement="employer_page" />
          </div>
        </div>

        <Reveal>
          <div className="form-card">
            <div className="form-header">
              <h2 className="text-2xl font-semibold">Employer hiring brief</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
                Required fields are marked. Avoid including confidential or
                sensitive personal information.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              onFocus={handleFormStart}
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
                  Contact
                </legend>
                <div className="mt-4 grid gap-6 md:grid-cols-2">
                  <FormField id="company_name" label="Company name" required>
                    <input
                      id="company_name"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      required
                      autoComplete="organization"
                      className="input"
                    />
                  </FormField>
                  <FormField id="contact_name" label="Contact name" required>
                    <input
                      id="contact_name"
                      name="contact_name"
                      value={formData.contact_name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      className="input"
                    />
                  </FormField>
                  <FormField id="email" label="Business email" required>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      className="input"
                    />
                  </FormField>
                  <FormField id="phone" label="Phone number">
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required={formData.preferred_contact_method === "Phone"}
                      autoComplete="tel"
                      className="input"
                    />
                  </FormField>
                  <FormField
                    id="preferred_contact_method"
                    label="Preferred contact method"
                    required
                  >
                    <select
                      id="preferred_contact_method"
                      name="preferred_contact_method"
                      value={formData.preferred_contact_method}
                      onChange={handleChange}
                      required
                      className="input"
                    >
                      {preferredContactMethods.map((method) => (
                        <option key={method} value={method}>
                          {method}
                        </option>
                      ))}
                    </select>
                  </FormField>
                  <FormField id="industry" label="Industry">
                    <input
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      autoComplete="organization-title"
                      className="input"
                    />
                  </FormField>
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Hiring needs
                </legend>
                <div className="mt-4 grid gap-6 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <FormField id="job_roles" label="Roles you need to hire" required>
                      <textarea
                        id="job_roles"
                        name="job_roles"
                        value={formData.job_roles}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="For example: customer support agents and one team lead"
                        className="input min-h-[120px] resize-y"
                      />
                    </FormField>
                  </div>
                  <FormField id="headcount" label="Estimated headcount" required>
                    <OptionSelect
                      id="headcount"
                      value={formData.headcount}
                      options={headcountBands}
                      placeholder="Select a range"
                      onChange={handleChange}
                    />
                  </FormField>
                  <FormField id="hiring_timeline" label="Hiring timeline" required>
                    <OptionSelect
                      id="hiring_timeline"
                      value={formData.hiring_timeline}
                      options={hiringTimelines}
                      placeholder="Select a timeline"
                      onChange={handleChange}
                    />
                  </FormField>
                  <FormField id="engagement_type" label="Engagement type" required>
                    <OptionSelect
                      id="engagement_type"
                      value={formData.engagement_type}
                      options={engagementTypes}
                      placeholder="Select an engagement"
                      onChange={handleChange}
                    />
                  </FormField>
                  <FormField id="work_model" label="Work model" required>
                    <OptionSelect
                      id="work_model"
                      value={formData.work_model}
                      options={workModels}
                      placeholder="Select a work model"
                      onChange={handleChange}
                    />
                  </FormField>
                  <FormField id="location" label="Work location">
                    <input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, country, or time-zone coverage"
                      className="input"
                    />
                  </FormField>
                  <FormField id="primary_goal" label="Primary hiring goal">
                    <input
                      id="primary_goal"
                      name="primary_goal"
                      value={formData.primary_goal}
                      onChange={handleChange}
                      placeholder="For example: expand weekend coverage"
                      className="input"
                    />
                  </FormField>
                </div>
              </fieldset>

              <details className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <summary className="cursor-pointer font-semibold text-slate-800">
                  Add compliance or security requirements
                </summary>
                <div className="mt-4">
                  <label
                    htmlFor="compliance_requirements"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Requirements
                  </label>
                  <textarea
                    id="compliance_requirements"
                    name="compliance_requirements"
                    value={formData.compliance_requirements}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Share relevant operational, data-handling, or compliance requirements."
                    className="input min-h-[120px] resize-y"
                  />
                </div>
              </details>

              <div className="flex flex-col gap-4 border-t border-slate-200 pt-6">
                <p className="text-sm leading-6 text-slate-600">
                  By submitting this brief, you are asking Circle Wave to contact
                  you about this hiring request. See our{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-blue-700 underline underline-offset-2"
                  >
                    privacy policy
                  </Link>
                  .
                </p>
                <motion.button
                  type="submit"
                  disabled={loading}
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonMotion}
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Submitting…" : "Submit hiring brief"}
                </motion.button>
                <FormStatus success={successMessage} error={errorMessage} />
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FormField({
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

function OptionSelect({
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
