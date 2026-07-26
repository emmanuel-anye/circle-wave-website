import assert from "node:assert/strict";
import test from "node:test";
import {
  employerRequestSchema,
  processEmployerSubmission,
  type EmployerRequestRecord,
} from "../lib/employer-submission";

const validBrief = {
  company_name: "Phase 1 Test Company",
  contact_name: "Test Contact",
  email: "contact@example.com",
  phone: "",
  preferred_contact_method: "Email",
  industry: "Software",
  job_roles: "Customer support specialists",
  headcount: "1-5",
  hiring_timeline: "Within 1 month",
  engagement_type: "Permanent",
  work_model: "Remote",
  location: "UTC-6",
  primary_goal: "Expand support coverage",
  compliance_requirements: "",
  website: "",
};

test("validates a structured employer hiring brief", () => {
  assert.equal(employerRequestSchema.safeParse(validBrief).success, true);
});

test("requires a phone number when phone is the preferred contact method", () => {
  const result = employerRequestSchema.safeParse({
    ...validBrief,
    preferred_contact_method: "Phone",
  });

  assert.equal(result.success, false);
  if (!result.success) {
    assert.equal(result.error.issues[0]?.path[0], "phone");
  }
});

test("rejects missing role and timeline qualification fields", () => {
  const result = employerRequestSchema.safeParse({
    ...validBrief,
    job_roles: "",
    hiring_timeline: "",
  });

  assert.equal(result.success, false);
});

test("stores only validated fields and excludes the honeypot", async () => {
  let inserted: EmployerRequestRecord | undefined;
  let notified: EmployerRequestRecord | undefined;

  const result = await processEmployerSubmission(validBrief, {
    insert: async (payload) => {
      inserted = payload;
      return { error: null };
    },
    notify: async (payload) => {
      notified = payload;
    },
  });

  assert.deepEqual(result, { ok: true, status: 200, body: { ok: true } });
  assert.equal(inserted?.source_page, "employers");
  assert.equal("website" in (inserted ?? {}), false);
  assert.deepEqual(notified, inserted);
});

test("rejects honeypot submissions without writing a record", async () => {
  let insertCount = 0;

  const result = await processEmployerSubmission(
    { ...validBrief, website: "https://spam.example" },
    {
      insert: async () => {
        insertCount += 1;
        return { error: null };
      },
      notify: async () => undefined,
    }
  );

  assert.equal(result.status, 400);
  assert.equal(insertCount, 0);
});

test("returns a clear generic error when storage fails", async () => {
  const result = await processEmployerSubmission(validBrief, {
    insert: async () => ({ error: { message: "private database detail" } }),
    notify: async () => undefined,
  });

  assert.deepEqual(result, {
    ok: false,
    status: 500,
    body: { error: "Unable to submit your hiring brief." },
  });
  assert.equal(JSON.stringify(result).includes("private database detail"), false);
});

test("does not fail a stored submission when notification delivery fails", async () => {
  const result = await processEmployerSubmission(validBrief, {
    insert: async () => ({ error: null }),
    notify: async () => {
      throw new Error("notification unavailable");
    },
  });

  assert.equal(result.ok, true);
});
