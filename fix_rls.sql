
-- Fix infinite recursion by using auth.uid() directly or a separate admin lookup function
-- Ideally, we trust auth.jwt() -> role claim, but here we are using a public table 'users' to store roles.
-- The recursion happens because "Admins have full access to users" checks "public.users" which triggers the policy again.

-- 1. DROP EXISTING POLICIES to be safe
drop policy if exists "Admins have full access to locations" on public.locations;
drop policy if exists "Admins have full access to stations" on public.stations;
drop policy if exists "Admins have full access to announcements" on public.announcements;
drop policy if exists "Admins have full access to station_status" on public.station_status;
drop policy if exists "Admins have full access to submissions" on public.submissions;
drop policy if exists "Admins have full access to users" on public.users;
drop policy if exists "Volunteers read all locations" on public.locations;
drop policy if exists "Volunteers read all stations" on public.stations;
drop policy if exists "Volunteers create submissions" on public.submissions;
drop policy if exists "Users can read own data" on public.users;

-- 2. CREATE A SECURE FUNCTION TO CHECK ROLE (Bypassing RLS)
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.users
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer; -- SECURITY DEFINER allows this function to bypass RLS

create or replace function public.is_volunteer_or_admin()
returns boolean as $$
  select exists (
    select 1 from public.users
    where id = auth.uid() and role in ('volunteer', 'admin')
  );
$$ language sql security definer;

-- 3. RE-APPLY POLICIES USING FUNCTIONS

-- Locations
create policy "Admins full access locations"
  on public.locations for all
  using ( public.is_admin() );

create policy "Volunteers read locations"
  on public.locations for select
  using ( public.is_volunteer_or_admin() );

-- Stations
create policy "Admins full access stations"
  on public.stations for all
  using ( public.is_admin() );

create policy "Volunteers read stations"
  on public.stations for select
  using ( public.is_volunteer_or_admin() );

-- Announcements
create policy "Admins full access announcements"
  on public.announcements for all
  using ( public.is_admin() );

-- Station Status
create policy "Admins full access station_status"
  on public.station_status for all
  using ( public.is_admin() );

-- Submissions
create policy "Admins full access submissions"
  on public.submissions for all
  using ( public.is_admin() );

create policy "Volunteers insert submissions"
  on public.submissions for insert
  with check ( public.is_volunteer_or_admin() );

-- Users (The tricky one)
-- Allow users to read their own data
create policy "Users read own data"
  on public.users for select
  using ( auth.uid() = id );

-- Allow admins to read all user data (using the function which bypasses RLS)
create policy "Admins read all users"
  on public.users for select
  using ( public.is_admin() );

-- Allow admins to update user data
create policy "Admins update users"
  on public.users for update
  using ( public.is_admin() );
