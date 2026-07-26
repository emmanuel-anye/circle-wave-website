import assert from "node:assert/strict";
import test from "node:test";
import {
  createApplicationReference,
  processJobApplication,
  type ApplicationRecord,
} from "../lib/application-submission";

const fields = {
  full_name: "Candidate Example",
  email: "candidate@example.com",
  phone: "",
  location: "Kigali",
  availability: "Full-time",
  experience_level: "Mid",
  languages: "English",
  technical_skills: "Customer support",
  cover_letter: "",
  job_id: "123e4567-e89b-12d3-a456-426614174000",
  submission_token: "523e4567-e89b-12d3-a456-426614174000",
  website: "",
};

const resume = new File(["resume"], "resume.pdf", {
  type: "application/pdf",
});
const fixedDate = new Date("2026-07-25T18:00:00.000Z");
const fixedId = "123e4567-e89b-12d3-a456-426614174999";
const fixedStorageId = "323e4567-e89b-12d3-a456-426614174999";

function dependencies(overrides: Record<string, unknown> = {}) {
  const ids = [fixedId, fixedStorageId];
  return {
    getJob: async () => ({
      id: fields.job_id,
      title: "Support Specialist",
      status: "open",
      application_deadline: "2026-07-25",
    }),
    findExisting: async () => null,
    upload: async () => ({ error: null }),
    insert: async () => ({ error: null }),
    remove: async () => undefined,
    notify: async () => undefined,
    now: () => fixedDate,
    randomId: () => ids.shift() ?? fixedStorageId,
    ...overrides,
  };
}

test("creates a non-sensitive application reference", () => {
  assert.equal(
    createApplicationReference(fixedDate, fixedId),
    "CW-20260725-123E4567E89B"
  );
});

test("stores a validated application after a private résumé upload", async () => {
  let inserted: ApplicationRecord | undefined;

  const result = await processJobApplication(
    fields,
    resume,
    dependencies({
      insert: async (payload: ApplicationRecord) => {
        inserted = payload;
        return { error: null };
      },
    })
  );

  assert.deepEqual(result, {
    ok: true,
    status: 200,
    body: { ok: true, reference: "CW-20260725-123E4567E89B" },
  });
  assert.equal(
    inserted?.resume_path,
    "applications/2026/323e4567-e89b-12d3-a456-426614174999.pdf"
  );
  assert.equal(inserted?.job_title_snapshot, "Support Specialist");
  assert.equal("website" in (inserted ?? {}), false);
});

test("rejects a closed or expired job before uploading", async () => {
  let uploads = 0;
  const result = await processJobApplication(
    fields,
    resume,
    dependencies({
      getJob: async () => ({ ...fields, id: fields.job_id, title: "Role", status: "closed" }),
      upload: async () => {
        uploads += 1;
        return { error: null };
      },
    })
  );

  assert.equal(result.status, 400);
  assert.equal(uploads, 0);
});

test("returns the original reference for a duplicate submission token", async () => {
  let uploads = 0;
  let inserts = 0;
  const result = await processJobApplication(
    fields,
    resume,
    dependencies({
      findExisting: async () => ({
        application_reference: "CW-20260725-EXISTING0000",
      }),
      upload: async () => {
        uploads += 1;
        return { error: null };
      },
      insert: async () => {
        inserts += 1;
        return { error: null };
      },
    })
  );

  assert.deepEqual(result, {
    ok: true,
    status: 200,
    body: { ok: true, reference: "CW-20260725-EXISTING0000" },
  });
  assert.equal(uploads, 0);
  assert.equal(inserts, 0);
});

test("rejects invalid résumé files before storage", async () => {
  const invalidResume = new File(["content"], "resume.txt", {
    type: "text/plain",
  });
  let uploads = 0;

  const result = await processJobApplication(
    fields,
    invalidResume,
    dependencies({
      upload: async () => {
        uploads += 1;
        return { error: null };
      },
    })
  );

  assert.equal(result.status, 400);
  assert.equal(uploads, 0);
});

test("reports upload failure without attempting a database insert", async () => {
  let inserts = 0;
  const result = await processJobApplication(
    fields,
    resume,
    dependencies({
      upload: async () => ({ error: { message: "private storage detail" } }),
      insert: async () => {
        inserts += 1;
        return { error: null };
      },
    })
  );

  assert.equal(result.status, 500);
  assert.equal(inserts, 0);
  assert.equal(JSON.stringify(result).includes("private storage detail"), false);
});

test("removes the uploaded résumé when the database write fails", async () => {
  let removedPath = "";
  const result = await processJobApplication(
    fields,
    resume,
    dependencies({
      insert: async () => ({ error: { message: "database unavailable" } }),
      remove: async (path: string) => void (removedPath = path),
    })
  );

  assert.equal(result.status, 500);
  assert.match(removedPath, /^applications\/2026\//);
});
