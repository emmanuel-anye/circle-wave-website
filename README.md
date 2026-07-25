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
npm run build
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=local-placeholder \
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
