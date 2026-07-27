-- Recruiter assignments and provider-neutral interview scheduling.
-- Apply through the reviewed deployment workflow before deploying the code.

create table if not exists public.recruiters (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null check (char_length(trim(name)) between 1 and 120),
  email text not null check (char_length(trim(email)) between 3 and 320),
  role text check (role is null or char_length(role) <= 120),
  active boolean not null default true,
  constraint recruiters_email_unique unique (email)
);

alter table public.job_applications
  add column if not exists assigned_recruiter_id uuid references public.recruiters(id) on delete set null;

alter table public.employer_requests
  add column if not exists assigned_recruiter_id uuid references public.recruiters(id) on delete set null;

alter table public.talent_network_registrations
  add column if not exists assigned_recruiter_id uuid references public.recruiters(id) on delete set null;

create table if not exists public.interviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  application_id uuid not null references public.job_applications(id) on delete cascade,
  recruiter_id uuid references public.recruiters(id) on delete set null,
  starts_at timestamptz not null,
  duration_minutes integer not null default 30 check (duration_minutes between 10 and 480),
  timezone text not null check (char_length(timezone) between 1 and 80),
  format text not null check (format in ('video', 'phone', 'in_person')),
  location text check (location is null or char_length(location) <= 500),
  meeting_url text check (meeting_url is null or char_length(meeting_url) <= 2000),
  status text not null default 'scheduled' check (status in ('scheduled', 'completed', 'cancelled', 'no_show')),
  notes text check (notes is null or char_length(notes) <= 4000)
);

alter table public.recruitment_activity
  drop constraint if exists recruitment_activity_action_check;

alter table public.recruitment_activity
  add constraint recruitment_activity_action_check
    check (action in (
      'status_changed',
      'notes_updated',
      'recruiter_assigned',
      'recruiter_unassigned',
      'interview_scheduled',
      'interview_rescheduled',
      'interview_cancelled',
      'interview_completed',
      'interview_no_show'
    ));

create or replace function public.record_recruitment_activity()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status is distinct from old.status then
    insert into public.recruitment_activity (entity_type, entity_id, action, previous_value, new_value)
    values (tg_argv[0], new.id, 'status_changed', old.status, new.status);
  end if;

  if new.internal_notes is distinct from old.internal_notes then
    insert into public.recruitment_activity (entity_type, entity_id, action, note)
    values (
      tg_argv[0],
      new.id,
      'notes_updated',
      case when coalesce(new.internal_notes, '') = '' then 'Notes cleared' else 'Notes updated' end
    );
  end if;

  if new.assigned_recruiter_id is distinct from old.assigned_recruiter_id then
    insert into public.recruitment_activity (entity_type, entity_id, action, previous_value, new_value)
    values (
      tg_argv[0],
      new.id,
      case when new.assigned_recruiter_id is null then 'recruiter_unassigned' else 'recruiter_assigned' end,
      old.assigned_recruiter_id::text,
      new.assigned_recruiter_id::text
    );
  end if;

  return new;
end;
$$;

revoke all on function public.record_recruitment_activity() from public, anon, authenticated;

drop trigger if exists job_applications_recruitment_activity on public.job_applications;
create trigger job_applications_recruitment_activity
  after update of status, internal_notes, assigned_recruiter_id on public.job_applications
  for each row execute function public.record_recruitment_activity('job_application');

drop trigger if exists employer_requests_recruitment_activity on public.employer_requests;
create trigger employer_requests_recruitment_activity
  after update of status, internal_notes, assigned_recruiter_id on public.employer_requests
  for each row execute function public.record_recruitment_activity('employer_request');

drop trigger if exists talent_network_recruitment_activity on public.talent_network_registrations;
create trigger talent_network_recruitment_activity
  after update of status, internal_notes, assigned_recruiter_id on public.talent_network_registrations
  for each row execute function public.record_recruitment_activity('talent_network');

create or replace function public.record_interview_activity()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  activity_action text;
begin
  if tg_op = 'INSERT' then
    activity_action := 'interview_scheduled';
  elsif new.status is distinct from old.status then
    activity_action := case new.status
      when 'cancelled' then 'interview_cancelled'
      when 'completed' then 'interview_completed'
      when 'no_show' then 'interview_no_show'
      else 'interview_rescheduled'
    end;
  elsif new.starts_at is distinct from old.starts_at
     or new.duration_minutes is distinct from old.duration_minutes
     or new.timezone is distinct from old.timezone
     or new.format is distinct from old.format
     or new.location is distinct from old.location
     or new.meeting_url is distinct from old.meeting_url then
    activity_action := 'interview_rescheduled';
  else
    return new;
  end if;

  insert into public.recruitment_activity (entity_type, entity_id, action, previous_value, new_value, note)
  values (
    'job_application',
    new.application_id,
    activity_action,
    case when tg_op = 'UPDATE' then old.starts_at::text else null end,
    new.starts_at::text,
    'Interview ' || replace(activity_action, 'interview_', '')
  );

  return new;
end;
$$;

revoke all on function public.record_interview_activity() from public, anon, authenticated;

drop trigger if exists interviews_activity on public.interviews;
create trigger interviews_activity
  after insert or update on public.interviews
  for each row execute function public.record_interview_activity();

create index if not exists recruiters_active_name_idx on public.recruiters (active, name);
create index if not exists job_applications_recruiter_idx on public.job_applications (assigned_recruiter_id, status, created_at desc);
create index if not exists employer_requests_recruiter_idx on public.employer_requests (assigned_recruiter_id, status, created_at desc);
create index if not exists talent_network_recruiter_idx on public.talent_network_registrations (assigned_recruiter_id, status, created_at desc);
create index if not exists interviews_upcoming_idx on public.interviews (status, starts_at);
create index if not exists interviews_application_idx on public.interviews (application_id, starts_at desc);

alter table public.recruiters enable row level security;
alter table public.interviews enable row level security;
revoke all on table public.recruiters from anon, authenticated;
revoke all on table public.interviews from anon, authenticated;

comment on table public.recruiters is 'Private admin-managed recruiter directory.';
comment on table public.interviews is 'Private provider-neutral interview schedule for candidate applications.';
comment on column public.interviews.meeting_url is 'Optional provider-hosted meeting URL. Never expose through public APIs.';
