-- Cover the interviews.recruiter_id foreign key for recruiter workload and cleanup queries.

create index if not exists interviews_recruiter_idx
  on public.interviews (recruiter_id, starts_at desc);
