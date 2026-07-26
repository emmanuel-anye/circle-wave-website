import assert from "node:assert/strict";
import test from "node:test";
import {
  processTalentNetworkRegistration,
  talentNetworkSchema,
  type TalentNetworkRecord,
} from "../lib/talent-network-submission";

const fields = {
  full_name: "Talent Example",
  email: "talent@example.com",
  phone: "",
  target_roles: "Customer Support Specialist",
  core_skills: "Customer support, CRM",
  location: "Kigali",
  work_preference: "Remote",
  relocation_preference: "Depends on the opportunity",
  work_authorization: "Authorized to work in Rwanda",
  availability: "Within 2 weeks",
  salary_expectations: "",
  consent: "true",
  website: "",
};
const resume = new File(["resume"], "resume.docx", {
  type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
});
const fixedDate = new Date("2026-07-25T18:00:00.000Z");
const fixedId = "223e4567-e89b-12d3-a456-426614174999";
const fixedStorageId = "423e4567-e89b-12d3-a456-426614174999";

function dependencies(overrides: Record<string, unknown> = {}) {
  const ids = [fixedId, fixedStorageId];
  return {
    upload: async () => ({ error: null }),
    insert: async () => ({ error: null }),
    remove: async () => undefined,
    notify: async () => undefined,
    now: () => fixedDate,
    randomId: () => ids.shift() ?? fixedStorageId,
    ...overrides,
  };
}

test("requires explicit recruitment consent", () => {
  assert.equal(talentNetworkSchema.safeParse(fields).success, true);
  assert.equal(
    talentNetworkSchema.safeParse({ ...fields, consent: "false" }).success,
    false
  );
});

test("stores a private talent profile with a reference", async () => {
  let inserted: TalentNetworkRecord | undefined;
  const result = await processTalentNetworkRegistration(
    fields,
    resume,
    dependencies({
      insert: async (payload: TalentNetworkRecord) => {
        inserted = payload;
        return { error: null };
      },
    })
  );

  assert.deepEqual(result, {
    ok: true,
    status: 200,
    body: { ok: true, reference: "TN-2026-223E4567E89B" },
  });
  assert.equal(
    inserted?.resume_path,
    "talent-network/2026/423e4567-e89b-12d3-a456-426614174999.docx"
  );
  assert.equal(inserted?.consent, true);
  assert.equal("website" in (inserted ?? {}), false);
});

test("does not write a record when the private upload fails", async () => {
  let inserts = 0;
  const result = await processTalentNetworkRegistration(
    fields,
    resume,
    dependencies({
      upload: async () => ({ error: { message: "storage detail" } }),
      insert: async () => {
        inserts += 1;
        return { error: null };
      },
    })
  );

  assert.equal(result.status, 500);
  assert.equal(inserts, 0);
  assert.equal(JSON.stringify(result).includes("storage detail"), false);
});

test("removes a talent résumé when registration storage fails", async () => {
  let removedPath = "";
  const result = await processTalentNetworkRegistration(
    fields,
    resume,
    dependencies({
      insert: async () => ({ error: { message: "database detail" } }),
      remove: async (path: string) => void (removedPath = path),
    })
  );

  assert.equal(result.status, 500);
  assert.match(removedPath, /^talent-network\/2026\//);
});
