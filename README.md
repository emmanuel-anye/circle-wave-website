# Circle Wave

Next.js web application for Circle Wave's staffing services, public job board, candidate applications, employer requests, and internal administration.

## Local setup

1. Install Node.js 22 and the Supabase CLI.
2. Copy `.env.example` to `.env.local` and provide development credentials.
3. Run `npm ci`.
4. Apply database changes with `supabase link --project-ref <ref>` and `supabase db push`.
5. Start the app with `npm run dev`.

Do not expose `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_DASHBOARD_PASSWORD`, or
`ADMIN_SESSION_SECRET` to browser code. Generate the session secret with a
cryptographically secure password generator (32 bytes or longer).

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run build
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=local-placeholder \
  --build-arg NEXT_PUBLIC_CONSULTATION_BOOKING_URL= \
  --tag circle-wave:local \
  --file dockerfile \
  .
```

Pull requests run the same checks and smoke-test the production container through
`.github/workflows/ci.yml`. The container exposes `/api/health` and includes a
Docker health check for that endpoint.

## Production checklist

- Apply all migrations in `supabase/migrations`.
- Confirm the `resumes` bucket is private.
- Configure every variable listed in `.env.example`.
- Authenticate the Resend sending domain and update the sender addresses.
- Set the Supabase site URL and allowed redirect URLs for the production domain.
- Submit each public form and verify its database row, email, and admin view.
- Confirm resume links expire and cannot be opened after their signed URL expires.

## Phase 1 conversion configuration

`NEXT_PUBLIC_CONSULTATION_BOOKING_URL` is optional. Production booking links
must use HTTPS. Development builds may use HTTP only for `localhost` or
`127.0.0.1`; public HTTP URLs are always rejected. If the value is blank or
invalid, consultation calls to action safely fall back to the Circle Wave
contact form.

Conversion events use the provider-neutral abstraction documented in
[`docs/conversion-events.md`](docs/conversion-events.md). No analytics provider
is installed or active. Approved trust material can be added to
`content/trust.ts`; the social-proof section remains hidden while that list is
empty. See [`docs/business-information-needed.md`](docs/business-information-needed.md)
for the exact approvals needed.

The Phase 1 employer brief migration is
`supabase/migrations/202607250001_phase_1_employer_hiring_brief.sql`. Apply it
through the normal reviewed deployment process before deploying this code. Do
not run it from the application.

## Phase 2 candidate experience

Phase 2 adds server-rendered job filters, consistent job metadata, private
application references, and the optional talent-network workflow. It does not
activate job-alert delivery or add an email provider.

Review and apply
`supabase/migrations/202607260001_phase_2_candidate_experience.sql` before
deploying Phase 2. It adds the job industry field, application references, the
`job_applications(job_id)` index, and the private talent-network table. See
[`docs/phase-2-candidate-experience.md`](docs/phase-2-candidate-experience.md)
for security assumptions, date rules, deferred messaging, and manual acceptance.

Phase 2 requires no new environment variables. Existing optional Resend
configuration continues to control application confirmations; talent-network
registration does not subscribe candidates to job alerts.
