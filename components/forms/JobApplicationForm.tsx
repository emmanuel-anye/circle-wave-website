"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const initialForm = {
  full_name: "",
  email: "",
  phone: "",
  location: "",
  availability: "",
  experience_level: "",
  languages: "",
  technical_skills: "",
  resume_link: "",
  cover_letter: "",
};

export default function JobApplicationForm() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setErrorMsg("");

    const { error } = await supabase.from("job_applications").insert([formData]);

    if (error) {
      setErrorMsg("Something went wrong. Please try again.");
      console.error(error);
    } else {
      setSuccess("Application submitted successfully.");
      setFormData(initialForm);
    }

    setLoading(false);
  }

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Careers
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Apply for customer service roles
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Join our global talent network and access remote customer support
            opportunities across industries.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          <div className="border-b border-slate-200 bg-gradient-to-r from-blue-950 to-blue-700 px-8 py-8 text-white">
            <h2 className="text-2xl font-semibold">Candidate Application</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
              Complete the form below to be considered for current and upcoming
              customer support opportunities.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-8 px-8 py-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Personal Information
              </h3>
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="full_name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="full_name"
                    name="full_name"
                    placeholder="Enter your full name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
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
                    name="email"
                    placeholder="Enter your email address"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
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
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
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
                    name="location"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Work Profile
              </h3>
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="availability"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Availability
                  </label>
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
                </div>

                <div>
                  <label
                    htmlFor="experience_level"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Experience Level
                  </label>
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
                </div>

                <div>
                  <label
                    htmlFor="languages"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Languages
                  </label>
                  <input
                    id="languages"
                    name="languages"
                    placeholder="e.g. English, French"
                    value={formData.languages}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="technical_skills"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Technical Skills
                  </label>
                  <input
                    id="technical_skills"
                    name="technical_skills"
                    placeholder="CRM, Zendesk, Excel, etc."
                    value={formData.technical_skills}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Application Details
              </h3>
              <div className="mt-4 grid gap-6">
                <div>
                  <label
                    htmlFor="resume_link"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Resume Link
                  </label>
                  <input
                    id="resume_link"
                    name="resume_link"
                    placeholder="Google Drive, Dropbox, or portfolio link"
                    value={formData.resume_link}
                    onChange={handleChange}
                    required
                    className="input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cover_letter"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Cover Letter
                  </label>
                  <textarea
                    id="cover_letter"
                    name="cover_letter"
                    placeholder="Tell us about your experience, strengths, and why you'd be a good fit."
                    value={formData.cover_letter}
                    onChange={handleChange}
                    rows={6}
                    className="input min-h-[180px] resize-y"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-slate-200 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>

              {success && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {success}
                </div>
              )}

              {errorMsg && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMsg}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}