-- MacroScope initial schema
-- Tables: profiles, indicator_cache, ai_history
-- Every table has row level security enabled: the anon key alone grants nothing,
-- each policy below states exactly who can do what.

-- 1. Profiles: one row per registered user, created automatically on signup.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using ((select auth.uid()) = id);

create policy "Users can update own profile"
  on public.profiles for update
  using ((select auth.uid()) = id);

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Indicator cache: cached responses from the World Bank API so the app
-- stays fast and does not hit API limits. One row per country and indicator.

create table public.indicator_cache (
  id bigint generated always as identity primary key,
  country_code text not null,
  indicator_code text not null,
  data jsonb not null,
  fetched_at timestamptz not null default now(),
  unique (country_code, indicator_code)
);

alter table public.indicator_cache enable row level security;

create policy "Signed in users can read cache"
  on public.indicator_cache for select
  to authenticated
  using (true);

create policy "Signed in users can insert cache"
  on public.indicator_cache for insert
  to authenticated
  with check (true);

create policy "Signed in users can update cache"
  on public.indicator_cache for update
  to authenticated
  using (true);

-- 3. AI history: questions and answers from the AI Crisis Explainer,
-- private to each user.

create table public.ai_history (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  question text not null,
  answer text not null,
  created_at timestamptz not null default now()
);

alter table public.ai_history enable row level security;

create policy "Users read own history"
  on public.ai_history for select
  using ((select auth.uid()) = user_id);

create policy "Users insert own history"
  on public.ai_history for insert
  with check ((select auth.uid()) = user_id);
