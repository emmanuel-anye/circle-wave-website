import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const migration = readFileSync(
  new URL(
    "../supabase/migrations/202607260002_phase_3_recruitment_operations.sql",
    import.meta.url
  ),
  "utf8"
);

test("adds private operational status and notes fields", () => {
  assert.match(migration, /alter table public\.job_applications/);
  assert.match(migration, /alter table public\.employer_requests/);
  assert.match(migration, /alter table public\.talent_network_registrations/);
  assert.match(migration, /internal_notes text/);
  assert.match(migration, /status_updated_at timestamptz/);
});

test("protects recruitment activity from browser roles", () => {
  assert.match(migration, /enable row level security/);
  assert.match(
    migration,
    /revoke all on table public\.recruitment_activity from anon, authenticated/
  );
  assert.match(
    migration,
    /revoke all on function public\.record_recruitment_activity\(\) from public/
  );
});

test("records status and note changes with database triggers", () => {
  assert.match(
    migration,
    /create or replace function public\.record_recruitment_activity\(\)/
  );
  assert.match(migration, /job_applications_recruitment_activity/);
  assert.match(migration, /employer_requests_recruitment_activity/);
  assert.match(migration, /talent_network_recruitment_activity/);
  assert.match(migration, /new\.status is distinct from old\.status/);
  assert.match(
    migration,
    /new\.internal_notes is distinct from old\.internal_notes/
  );
});

test("adds indexes for pipeline and activity views", () => {
  assert.match(migration, /job_applications_status_idx/);
  assert.match(migration, /employer_requests_status_idx/);
  assert.match(migration, /talent_network_status_idx/);
  assert.match(migration, /recruitment_activity_entity_idx/);
});
