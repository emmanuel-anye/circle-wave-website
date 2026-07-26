import assert from "node:assert/strict";
import test from "node:test";
import {
  buildJobSearchParams,
  filterJobs,
  getJobFilterOptions,
  getJobIndicators,
  getRelatedJobs,
  parseJobFilters,
  type JobPosting,
} from "../lib/jobs";

const jobs: JobPosting[] = [
  {
    id: "1",
    title: "Customer Support Specialist",
    slug: "support-specialist",
    department: "Support",
    industry: "SaaS",
    location: "Kigali",
    work_model: "Hybrid",
    employment_type: "Full-time",
    description: "Support customer accounts",
    created_at: "2026-07-24T10:00:00.000Z",
    application_deadline: "2026-07-30",
  },
  {
    id: "2",
    title: "Quality Analyst",
    slug: "quality-analyst",
    department: "Support",
    industry: "SaaS",
    location: "Remote",
    work_model: "Remote",
    employment_type: "Contract",
    description: "Review service quality",
    created_at: "2026-06-01T10:00:00.000Z",
    application_deadline: null,
  },
];

test("parses and serializes shareable job filter state", () => {
  const filters = parseJobFilters({
    q: "support",
    location: "Kigali",
    type: "Full-time",
    work: "Hybrid",
    industry: "SaaS",
  });

  assert.deepEqual(filters, {
    q: "support",
    location: "Kigali",
    employmentType: "Full-time",
    workModel: "Hybrid",
    industry: "SaaS",
  });
  assert.equal(
    buildJobSearchParams(filters),
    "/jobs?q=support&location=Kigali&type=Full-time&work=Hybrid&industry=SaaS"
  );
  assert.equal(
    buildJobSearchParams(filters, "location"),
    "/jobs?q=support&type=Full-time&work=Hybrid&industry=SaaS"
  );
});

test("filters jobs by keyword and structured metadata", () => {
  assert.deepEqual(
    filterJobs(jobs, {
      q: "customer",
      location: "Kigali",
      employmentType: "Full-time",
      workModel: "Hybrid",
      industry: "SaaS",
    }).map((job) => job.id),
    ["1"]
  );
  assert.deepEqual(
    filterJobs(jobs, {
      q: "quality",
      location: "",
      employmentType: "",
      workModel: "Remote",
      industry: "",
    }).map((job) => job.id),
    ["2"]
  );
});

test("derives filter options only from genuine job values", () => {
  assert.deepEqual(getJobFilterOptions(jobs), {
    locations: ["Kigali", "Remote"],
    employmentTypes: ["Contract", "Full-time"],
    workModels: ["Hybrid", "Remote"],
    industries: ["SaaS"],
  });
});

test("uses seven-day UTC rules for New and Closing soon indicators", () => {
  const now = new Date("2026-07-25T18:00:00.000Z");

  assert.deepEqual(getJobIndicators(jobs[0], now), {
    isNew: true,
    isClosingSoon: true,
  });
  assert.deepEqual(getJobIndicators(jobs[1], now), {
    isNew: false,
    isClosingSoon: false,
  });
  assert.equal(
    getJobIndicators(
      {
        id: "boundary",
        created_at: "2026-07-18T10:00:00.000Z",
        application_deadline: "2026-08-01",
      },
      now
    ).isNew,
    false
  );
  assert.equal(
    getJobIndicators(
      {
        id: "boundary",
        application_deadline: "2026-08-01",
      },
      now
    ).isClosingSoon,
    true
  );
});

test("related jobs use explainable shared metadata and exclude the current job", () => {
  const related = getRelatedJobs(jobs[0], jobs);

  assert.equal(related.length, 1);
  assert.equal(related[0]?.job.id, "2");
  assert.deepEqual(related[0]?.reasons, ["same industry", "same department"]);
});
