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
});

test("adds indexes for pipeline and activity views", () => {
  assert.match(migration, /job_applications_status_idx/);
  assert.match(migration, /employer_requests_status_idx/);
  assert.match(migration, /talent_network_status_idx/);
  assert.match(migration, /recruitment_activity_entity_idx/);
});
