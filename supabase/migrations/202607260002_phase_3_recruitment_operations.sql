-- Phase 3 internal recruitment operations.
-- Apply through the reviewed deployment workflow before deploying the code.

alter table public.job_applications
  add column if not exists status text not null default 'new',
  add column if not exists internal_notes text,
  add column if not exists status_updated_at timestamptz not null default now();

alter table public.job_applications
  drop constraint if exists job_applications_status_check,
  add constraint job_applications_status_check
    check (status in ('new', 'screening', 'shortlisted', 'interview', 'offer', 'hired', 'rejected', 'withdrawn'));

alter table public.employer_requests
  add column if not exists status text not null default 'new',
  add column if not exists internal_notes text,
  add column if not exists status_updated_at timestamptz not null default now();

alter table public.employer_requests
  drop constraint if exists employer_requests_status_check,
  add constraint employer_requests_status_check
    check (status in ('new', 'contacted', 'qualified', 'proposal', 'active', 'closed', 'lost'));

alter table public.talent_network_registrations
  add column if not exists internal_notes text,
  add column if not exists status_updated_at timestamptz not null default now();

create table if not exists public.recruitment_activity (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  entity_type text not null
    check (entity_type in ('job_application', 'employer_request', 'talent_network')),
  entity_id uuid not null,
  action text not null
    check (action in ('status_changed', 'notes_updated')),
  previous_value text,
  new_value text,
  note text
);

create or replace function public.record_recruitment_activity()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status is distinct from old.status then
    insert into public.recruitment_activity (
      entity_type,
      entity_id,
      action,
      previous_value,
      new_value
    ) values (
      tg_argv[0],
      new.id,
      'status_changed',
      old.status,
      new.status
    );
  end if;

  if new.internal_notes is distinct from old.internal_notes then
    insert into public.recruitment_activity (
      entity_type,
      entity_id,
      action,
      note
    ) values (
      tg_argv[0],
      new.id,
      'notes_updated',
      case
        when coalesce(new.internal_notes, '') = '' then 'Notes cleared'
        else 'Notes updated'
      end
    );
  end if;

  return new;
end;
$$;

revoke all on function public.record_recruitment_activity() from public;

create index if not exists job_applications_status_idx
  on public.job_applications (status, created_at desc);
create index if not exists employer_requests_status_idx
  on public.employer_requests (status, created_at desc);
create index if not exists talent_network_status_idx
  on public.talent_network_registrations (status, created_at desc);
create index if not exists recruitment_activity_entity_idx
  on public.recruitment_activity (entity_type, entity_id, created_at desc);

alter table public.recruitment_activity enable row level security;
revoke all on table public.recruitment_activity from anon, authenticated;

drop trigger if exists job_applications_recruitment_activity on public.job_applications;
create trigger job_applications_recruitment_activity
after update of status, internal_notes on public.job_applications
for each row execute function public.record_recruitment_activity('job_application');

drop trigger if exists employer_requests_recruitment_activity on public.employer_requests;
create trigger employer_requests_recruitment_activity
after update of status, internal_notes on public.employer_requests
for each row execute function public.record_recruitment_activity('employer_request');

drop trigger if exists talent_network_recruitment_activity on public.talent_network_registrations;
create trigger talent_network_recruitment_activity
after update of status, internal_notes on public.talent_network_registrations
for each row execute function public.record_recruitment_activity('talent_network');

comment on table public.recruitment_activity is
  'Server-only audit history for internal recruitment status and note changes.';
comment on column public.job_applications.internal_notes is
  'Private recruiter notes. Never expose through public APIs or candidate messages.';
comment on column public.employer_requests.internal_notes is
  'Private business-development notes. Never expose through public APIs.';
comment on column public.talent_network_registrations.internal_notes is
  'Private recruiter notes. Never expose through public APIs or candidate messages.';