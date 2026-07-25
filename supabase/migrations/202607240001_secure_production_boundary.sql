-- Apply with `supabase db push`. The service-role key is server-only and bypasses RLS.

alter table public.job_postings enable row level security;
alter table public.job_applications enable row level security;
alter table public.employer_requests enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "Public can read open jobs" on public.job_postings;
create policy "Public can read open jobs"
on public.job_postings for select
to anon
using (
  status = 'open'
  and (application_deadline is null or application_deadline >= current_date)
);

-- Public submissions now pass through server Route Handlers using the service role.
-- Deliberately remove legacy anonymous mutation/read policies.
drop policy if exists "Enable insert for anon users" on public.job_applications;
drop policy if exists "Enable insert for anon users" on public.employer_requests;
drop policy if exists "Enable insert for anon users" on public.contact_messages;
drop policy if exists "Enable all for anon users" on public.job_postings;

alter table public.job_applications
  add column if not exists status text not null default 'new'
  check (status in ('new', 'reviewing', 'shortlisted', 'rejected', 'hired'));

alter table public.employer_requests
  add column if not exists status text not null default 'new'
  check (status in ('new', 'contacted', 'qualified', 'closed'));

alter table public.contact_messages
  add column if not exists status text not null default 'new'
  check (status in ('new', 'in_progress', 'resolved', 'spam'));

insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do update set public = false;

drop policy if exists "Public resume uploads" on storage.objects;
drop policy if exists "Public resume reads" on storage.objects;
