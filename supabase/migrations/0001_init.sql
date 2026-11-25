-- Phase 1: profiles + submissions, with RLS scoped to the student and an
-- optional mentor (you) who can read but never write their submissions.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  -- Set this by hand once both accounts exist:
  --   update public.profiles set mentor_id = '<your-auth-uid>' where id = '<brother-auth-uid>';
  mentor_id uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: owner or mentor can read"
  on public.profiles for select
  using (id = auth.uid() or mentor_id = auth.uid());

create policy "profiles: owner can update own row"
  on public.profiles for update
  using (id = auth.uid());

-- Auto-create a profile row whenever someone signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  exercise_id text not null,
  topic_id text not null,
  difficulty smallint not null check (difficulty between 1 and 3),
  code text not null,
  passed boolean not null,
  passed_count smallint not null,
  total_count smallint not null,
  xp_awarded int not null default 0,
  cheat_flags jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.submissions enable row level security;

create index if not exists submissions_user_id_idx on public.submissions (user_id);
create index if not exists submissions_exercise_id_idx on public.submissions (exercise_id);

create policy "submissions: owner can insert own"
  on public.submissions for insert
  with check (user_id = auth.uid());

create policy "submissions: owner or mentor can read"
  on public.submissions for select
  using (
    user_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = submissions.user_id and p.mentor_id = auth.uid()
    )
  );

-- No "best submission" view on purpose: a view runs with its creator's
-- privileges unless marked security_invoker, which would silently bypass the
-- RLS policies above. The app instead fetches the caller's own passed
-- submissions (RLS-filtered) and takes the best XP per exercise client-side.
