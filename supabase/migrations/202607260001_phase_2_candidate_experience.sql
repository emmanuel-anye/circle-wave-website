-- Additive Phase 2 candidate-experience schema.
-- Apply through the reviewed deployment workflow before deploying the code.

alter table public.job_postings
  add column if not exists industry text;

alter table public.job_applications
  add column if not exists application_reference text,
  add column if not exists submission_token uuid;

create unique index if not exists job_applications_application_reference_key
  on public.job_applications (application_reference)
  where application_reference is not null;

create unique index if not exists job_applications_submission_token_key
  on public.job_applications (submission_token)
  where submission_token is not null;

-- Supabase performance advisor: foreign-key columns should have a covering index.
create index if not exists job_applications_job_id_idx
  on public.job_applications (job_id);

create table if not exists public.talent_network_registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text,
  target_roles text not null,
  core_skills text not null,
  location text not null,
  work_preference text not null,
  relocation_preference text not null,
  work_authorization text not null,
  availability text not null,
  salary_expectations text,
  resume_path text not null,
  consent boolean not null check (consent = true),
  registration_reference text not null unique,
  status text not null default 'new'
    check (status in ('new', 'reviewing', 'matched', 'archived'))
);

alter table public.talent_network_registrations enable row level security;

-- All public writes use the server-only service role. No anonymous or
-- authenticated browser role receives direct access to candidate records.
revoke all on table public.talent_network_registrations from anon, authenticated;

comment on table public.talent_network_registrations is
  'Private candidate profiles submitted through the server-side talent network route.';
comment on column public.talent_network_registrations.resume_path is
  'Private object path in the existing non-public resumes bucket.';
comment on column public.job_applications.application_reference is
  'Non-sensitive reference shown to the candidate after a successful submission.';
comment on column public.job_applications.submission_token is
  'Random client token used to make application submission retries idempotent.';
