"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { sendApplicantConfirmation } from "@/lib/notifications";
import { motion } from "framer-motion";
import { buttonMotion } from "@/lib/motion";

async function sendSubmissionNotification(type: string, data: Record<string, unknown>) {
  try {
    await fetch("/api/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, data }),
    });
  } catch (error) {
    console.error("Failed to send notification:", error);
  }
}

export default function JobApplicationForm() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId") || "";
  const jobTitle = searchParams.get("jobTitle") || "";

  const initialForm = {
    full_name: "",
    email: "",
    phone: "",
    location: "",
    availability: "",
    experience_level: "",
    languages: "",
    technical_skills: "",
    resume_path: "",
    cover_letter: jobTitle ? `Applying for: ${jobTitle}\n\n` : "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setResumeFile(file);
  }

  async function uploadResume(file: File) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const filePath = fileExt ? fileName : `${fileName}.pdf`;

    const { error } = await supabase.storage
      .from("resumes")
      .upload(filePath, file, {
        upsert: false,
      });

    if (error) {
      throw error;
    }

    return filePath;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setErrorMsg("");

    try {
      if (!resumeFile) {
        throw new Error("Please upload your resume.");
      }

      const uploadedResumePath = await uploadResume(resumeFile);

      const payload = {
        ...formData,
        resume_path: uploadedResumePath,
        job_id: jobId || null,
        job_title_snapshot: jobTitle || null,
      };

      const { error } = await supabase.from("job_applications").insert([payload]);

      if (error) {
        throw error;
      }

      await fetch("/api/confirm-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.full_name,
          jobTitle: jobTitle || null,
        }),
      });

      await sendSubmissionNotification("job-application", {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        availability: formData.availability,
        experience_level: formData.experience_level,
        languages: formData.languages,
        technical_skills: formData.technical_skills,
        applied_role: jobTitle || "General talent network",
        resume_path: uploadedResumePath,
      });

      setSuccess("Application submitted successfully.");
      setFormData(initialForm);
      setResumeFile(null);
    } catch (error) {
      console.error(error);
      setErrorMsg(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-slate-50 section">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Careers
          </p>
          {jobTitle ? (
            <>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                Apply for this role
              </h1>

              <p className="mt-4 text-lg leading-8 text-slate-600">
                Complete your application for this position. Our team will review your
                submission and follow up if your profile matches the role requirements.
              </p>
            </>
          ) : (
            <>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                Join our talent network
              </h1>

              <p className="mt-4 text-lg leading-8 text-slate-600">
                Submit your application to be considered for current and future customer
                support opportunities across our global network.
              </p>
            </>
          )}

          {!jobTitle && (
            <div className="mt-6">
              <a
                href="/jobs"
                className="inline-flex items-center rounded-lg border border-blue-600 px-5 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
              >
                Browse open positions
              </a>
            </div>
          )}

          {jobTitle && (
            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm text-blue-900">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                Applying for
              </p>
              <p className="mt-1 text-base font-semibold">{jobTitle}</p>
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          <div className="border-b border-slate-200 bg-gradient-to-r from-blue-950 to-blue-700 px-6 py-6 text-white sm:px-8 sm:py-8">
            <h2 className="text-2xl font-semibold">Candidate Application</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
              Complete the form below to be considered for current and upcoming
              customer support opportunities.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-8 px-6 py-6 sm:px-8 sm:py-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Personal Information
              </h3>
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-slate-700">
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
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
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
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
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
                  <label htmlFor="location" className="mb-2 block text-sm font-medium text-slate-700">
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
                  <label htmlFor="availability" className="mb-2 block text-sm font-medium text-slate-700">
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
                  <label htmlFor="languages" className="mb-2 block text-sm font-medium text-slate-700">
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
                  <label htmlFor="resume" className="mb-2 block text-sm font-medium text-slate-700">
                    Resume Upload
                  </label>
                  <input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                    className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-medium file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="mt-2 text-sm text-slate-500">
                    Accepted formats: PDF, DOC, DOCX
                  </p>
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
                {loading ? "Submitting..." : "Submit Application"}
              </motion.button>

              {success && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 transition">
                  {success}
                </div>
              )}

              {errorMsg && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 transition">
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