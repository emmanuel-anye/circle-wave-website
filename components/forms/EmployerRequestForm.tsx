"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { buttonMotion } from "@/lib/motion";
import Reveal from "@/components/ui/Reveal";
import FormStatus from "@/components/ui/FormStatus";

const initialForm = {
  company_name: "",
  contact_name: "",
  email: "",
  phone: "",
  industry: "",
  job_roles: "",
  headcount: "",
  engagement_type: "",
  work_model: "",
  duration: "",
  location: "",
  compliance_requirements: "",
  additional_notes: "",
  website: "",
};

export default function EmployerRequestForm() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
      if (!response.ok) throw new Error(result.error || "Something went wrong.");
      setSuccessMessage("Your staffing request has been submitted successfully.");
      setFormData(initialForm);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-slate-50 section">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Employers
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Request staffing support
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Tell us about your hiring needs and our team will follow up with the
            right customer service staffing solution.
          </p>
        </div>

        <Reveal>
          <div className="form-card">
            <div className="form-header">
              <h2 className="text-2xl font-semibold">Staffing Request</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
                Share your staffing requirements, preferred engagement model, and
                business needs so we can recommend the right support structure.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="form-body"
              aria-busy={loading}
            >
            <input name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Company Information
              </h3>
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="company_name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Company Name
                  </label>
                  <input
                    id="company_name"
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your company name"
                    className="input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact_name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Contact Name
                  </label>
                  <input
                    id="contact_name"
                    type="text"
                    name="contact_name"
                    value={formData.contact_name}
                    onChange={handleChange}
                    required
                    placeholder="Enter the main contact name"
                    className="input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your business email"
                    className="input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="input"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Staffing Needs
              </h3>
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="industry"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Industry
                  </label>
                  <input
                    id="industry"
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    placeholder="e.g. SaaS, Retail, Telecom"
                    className="input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="headcount"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Headcount Needed
                  </label>
                  <input
                    id="headcount"
                    type="text"
                    name="headcount"
                    value={formData.headcount}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 5, 20, 100+"
                    className="input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="engagement_type"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Engagement Type
                  </label>
                  <select
                    id="engagement_type"
                    name="engagement_type"
                    value={formData.engagement_type}
                    onChange={handleChange}
                    required
                    className="input"
                  >
                    <option value="">Select engagement type</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Contract-to-Hire">Contract-to-Hire</option>
                    <option value="Seasonal">Seasonal</option>
                    <option value="Outsourced Support">Outsourced Support</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="work_model"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Work Model
                  </label>
                  <select
                    id="work_model"
                    name="work_model"
                    value={formData.work_model}
                    onChange={handleChange}
                    required
                    className="input"
                  >
                    <option value="">Select work model</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="duration"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Duration
                  </label>
                  <input
                    id="duration"
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g. 3 months, ongoing"
                    className="input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Remote, Rwanda, Cameroon"
                    className="input"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Additional Details
              </h3>
              <div className="mt-4 grid gap-6">
                <div>
                  <label
                    htmlFor="job_roles"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Job Roles Needed
                  </label>
                  <textarea
                    id="job_roles"
                    name="job_roles"
                    value={formData.job_roles}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="List the roles you need, such as customer support agents, team leads, QA specialists, or supervisors."
                    className="input min-h-[140px] resize-y"
                  />
                </div>

                <div>
                  <label
                    htmlFor="compliance_requirements"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Compliance / Security Requirements
                  </label>
                  <textarea
                    id="compliance_requirements"
                    name="compliance_requirements"
                    value={formData.compliance_requirements}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Share any compliance, data security, or operational requirements."
                    className="input min-h-[140px] resize-y"
                  />
                </div>

                <div>
                  <label
                    htmlFor="additional_notes"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Additional Notes
                  </label>
                  <textarea
                    id="additional_notes"
                    name="additional_notes"
                    value={formData.additional_notes}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Add any extra details that will help us understand your staffing request."
                    className="input min-h-[160px] resize-y"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-slate-200 pt-6">
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
                {loading ? "Submitting..." : "Submit Request"}
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
