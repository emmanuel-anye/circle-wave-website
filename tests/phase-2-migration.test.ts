import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const migration = readFileSync(
  new URL(
    "../supabase/migrations/202607260001_phase_2_candidate_experience.sql",
    import.meta.url
  ),
  "utf8"
);

test("adds the known job application foreign-key index", () => {
  assert.match(
    migration,
    /create index if not exists job_applications_job_id_idx\s+on public\.job_applications \(job_id\)/i
  );
});

test("keeps talent profiles behind RLS with no browser-role grants", () => {
  assert.match(
    migration,
    /alter table public\.talent_network_registrations enable row level security/i
  );
  assert.match(
    migration,
    /revoke all on table public\.talent_network_registrations from anon, authenticated/i
  );
  assert.doesNotMatch(
    migration,
    /create policy[\s\S]+talent_network_registrations/i
  );
});

test("keeps Phase 2 schema additive", () => {
  assert.doesNotMatch(migration, /\bdrop\s+(table|column)\b/i);
  assert.match(migration, /add column if not exists industry text/i);
  assert.match(
    migration,
    /add column if not exists application_reference text/i
  );
  assert.match(
    migration,
    /create unique index if not exists job_applications_submission_token_key/i
  );
});
