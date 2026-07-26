import assert from "node:assert/strict";
import test from "node:test";
import {
  applicationStatuses,
  employerStatuses,
  humanizeStatus,
  isAllowedStatus,
  recruitmentUpdateSchema,
  tableForEntity,
  talentStatuses,
} from "../lib/recruitment-operations";

test("defines distinct pipeline statuses for each operational record", () => {
  assert.equal(applicationStatuses.includes("hired"), true);
  assert.equal(employerStatuses.includes("proposal"), true);
  assert.equal(talentStatuses.includes("matched"), true);
  assert.equal(isAllowedStatus("job_application", "proposal"), false);
});

test("maps operational entities to server-side tables", () => {
  assert.equal(tableForEntity("job_application"), "job_applications");
  assert.equal(tableForEntity("employer_request"), "employer_requests");
  assert.equal(tableForEntity("talent_network"), "talent_network_registrations");
});

test("validates bounded status and note updates", () => {
  assert.equal(
    recruitmentUpdateSchema.safeParse({
      entityType: "job_application",
      id: "123e4567-e89b-12d3-a456-426614174000",
      status: "screening",
      internalNotes: "Phone screen requested.",
    }).success,
    true
  );
  assert.equal(
    recruitmentUpdateSchema.safeParse({
      entityType: "job_application",
      id: "123e4567-e89b-12d3-a456-426614174000",
    }).success,
    false
  );
});

test("humanizes pipeline and activity labels", () => {
  assert.equal(humanizeStatus("status_changed"), "Status Changed");
  assert.equal(humanizeStatus(null), "New");
});
