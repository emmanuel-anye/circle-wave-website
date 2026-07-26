# Phase 2 candidate experience

## Migration

Before deploying Phase 2, review and apply
`supabase/migrations/202607260001_phase_2_candidate_experience.sql` through the
normal migration process. The application does not apply migrations.

The migration:

- adds nullable `industry` to `job_postings`;
- adds nullable, uniquely indexed `application_reference` to
  `job_applications`;
- adds a uniquely indexed random submission token for idempotent retries;
- adds the known `job_applications(job_id)` foreign-key index;
- creates `talent_network_registrations` with explicit consent and recruitment
  fields;
- enables RLS on the new table and revokes browser-role access.

Talent-network and application résumés use separate prefixes in the existing
private `resumes` bucket. Admin résumé links remain signed and expire after five
minutes.

## Job discovery rules

- Public queries remain limited to `status = open` and deadlines on or after
  the current UTC date.
- Search and filters are encoded in the `/jobs` query string.
- Industry appears as a filter only when an open job has a genuine industry
  value.
- Salary is omitted unless the job record contains a non-empty salary value.
- `New` means `created_at` is within the previous seven UTC calendar days,
  including today.
- `Closing soon` means the deadline is today or within the next seven UTC
  calendar days.
- Related jobs use a documented score across industry, department, workplace
  arrangement, employment type, and location. Candidate data is not used.

## Messaging and job alerts

The existing Resend-based application confirmation remains optional and runs
only when the existing `RESEND_API_KEY` configuration is present. Phase 2 adds
provider-neutral interfaces in `lib/candidate-delivery.ts` for future
confirmation and job-alert delivery.

No new email provider is installed or activated. Job-alert subscription and
delivery are not active, and talent-network consent does not opt a candidate
into alerts.

## Manual acceptance

1. Apply the Phase 2 migration to a non-production Supabase environment.
2. Create open, closed, expired, salary-present, salary-empty, remote, hybrid,
   on-site, and industry-tagged test jobs using genuine test labels.
3. Verify `/jobs` search and each filter, active-filter removal, reset, result
   count, empty state, mobile layout, and shareable query URLs.
4. Confirm closed and expired jobs cannot be listed, opened, or applied to.
5. Verify salary appears only when populated and date indicators follow the
   documented UTC rules.
6. Test native sharing and clipboard fallback, and confirm related jobs have
   explainable matching metadata.
7. Complete each application step with keyboard-only navigation; test required
   fields, invalid résumé type/size, retry, and rapid duplicate clicks.
8. Confirm a successful application returns a `CW-...` reference, stores one
   row, and stores a private résumé under `applications/`.
9. Submit a talent profile with and without consent and with valid and invalid
   résumés. Confirm success returns a `TN-...` reference.
10. Verify anonymous Supabase access cannot read or write candidate records or
    read résumé objects.
11. Verify application references, talent profiles, and five-minute signed
    résumé downloads in admin.
12. Confirm analytics remains inactive without an adapter and never receives
    search text, candidate fields, résumé metadata, or job titles.
