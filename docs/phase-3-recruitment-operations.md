# Phase 3 recruitment operations

Phase 3 introduces an authenticated internal workspace at `/admin/operations`.
It is intentionally separate from the existing submissions dashboard so the
operational workflow can evolve without weakening the public submission boundary.

## Included

- Candidate application pipeline statuses
- Employer opportunity pipeline statuses
- Talent-network status management
- Private internal notes
- Server-side activity history for status and note changes
- Search and status filtering
- CSV export of the currently filtered operational records

## Security boundary

All operational reads use the server-only Supabase service role after validating
the signed admin session. Updates are accepted only through
`PATCH /api/admin/recruitment`, which validates record IDs, entity types, note
lengths, and the allowed status list for each entity.

The new activity table has RLS enabled and grants no direct access to anonymous
or authenticated browser roles. Internal notes must never be included in public
APIs, candidate emails, employer emails, analytics events, or downloadable public
content.

## Migration

Apply `supabase/migrations/202607260002_phase_3_recruitment_operations.sql`
before deploying this phase. The application does not run migrations.

## Deferred

- Multiple recruiter accounts, roles, and record assignment
- Interview scheduling and calendar integration
- Automated candidate or employer status emails
- Bulk status changes
- Database-backed pagination and full-text search
- Retention automation and legal hold workflows

## Manual acceptance

1. Apply the migration to a non-production project.
2. Sign in through `/admin/login` and open `/admin/operations`.
3. Change each entity type through representative statuses and confirm persistence.
4. Add, edit, and clear private notes; confirm activity entries are created.
5. Search by name, email, company, role, and reference; combine search with status filters.
6. Export each filtered view and confirm the CSV contains only the expected records.
7. Confirm unauthenticated requests to the page redirect to login and PATCH requests return 401.
8. Confirm anonymous and authenticated Supabase roles cannot read operational notes or activity.
9. Confirm public pages, emails, and analytics payloads contain no internal notes.
