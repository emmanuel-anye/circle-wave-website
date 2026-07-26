"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { buttonMotion } from "@/lib/motion";
import Reveal from "@/components/ui/Reveal";
import FormStatus from "@/components/ui/FormStatus";

const initialForm = {
  full_name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
  website: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setErrorMsg("");

    try {
      const response = await fetch("/api/submissions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong.");
      setSuccess("Message sent successfully.");
      setFormData(initialForm);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Reveal>
      <div className="form-card">
        <h2 className="text-2xl font-semibold text-slate-900">
          Send us a message
        </h2>

        <form
          onSubmit={handleSubmit}
          className="form-body mt-6"
          aria-busy={loading}
        >
        <input name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="input"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your email"
              className="input"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Company (optional)
            </label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company"
              className="input"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Subject
            </label>
            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What is this about?"
              className="input"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Write your message..."
            className="input min-h-[160px]"
          />
        </div>

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
          {loading ? "Sending..." : "Send Message"}
        </motion.button>

        <FormStatus success={success} error={errorMsg} />
      </form>
    </div>
    </Reveal>
  );
}
