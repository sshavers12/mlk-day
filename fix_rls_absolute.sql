
-- ABSOLUTE RLS FIX
-- The "infinite recursion" error happens because the policy checks a function,
-- and that function checks the table, which triggers the policy again.
-- We MUST use "SECURITY DEFINER" functions to bypass RLS inside the check.

BEGIN;

-- 1. Drop EVERYTHING related to permissions to start clean
drop policy if exists "Public_Read_Published_Locations" on public.locations;
drop policy if exists "Admin_All_Locations" on public.locations;
drop policy if exists "Volunteer_Read_Locations" on public.locations;
drop policy if exists "Volunteer_Read_Station_Status" on public.station_status;
drop policy if exists "Volunteer_Insert_Station_Status" on public.station_status;
drop policy if exists "Volunteer_Update_Station_Status" on public.station_status;
-- Drop any other lingering policies
drop policy if exists "Admins have full access to users" on public.users;
drop policy if exists "Users read own data" on public.users;
drop policy if exists "Models_Read_Own_Row" on public.users;
drop policy if exists "Admin_Read_All_Users" on public.users;
drop policy if exists "Admin_All_Stations" on public.stations;

-- 2. Define Helper Functions as SECURITY DEFINER (bypass RLS)
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.users
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer;

create or replace function public.is_volunteer_or_admin()
returns boolean as $$
  select exists (
    select 1 from public.users
    where id = auth.uid() and role in ('volunteer', 'admin')
  );
$$ language sql security definer;

-- 3. Apply Policies

-- USERS Table (The Source of Recursion)
-- Rule 1: You can read your own data.
create policy "Users_Read_Self"
  on public.users for select
  using ( auth.uid() = id );

-- Rule 2: Admins can read everyone.
-- logic: is_admin() runs as superuser (bypassing RLS), so it reads 'users' safely.
create policy "Admins_Read_All"
  on public.users for select
  using ( public.is_admin() );

-- STATIONS Table
create policy "Public_Read_Published_Stations"
  on public.stations for select
  using ( is_published = true );

create policy "Admin_All_Stations"
  on public.stations for all
  using ( public.is_admin() );

-- STATION_STATUS Table
create policy "Volunteer_Read_Status"
  on public.station_status for select
  using ( public.is_volunteer_or_admin() );

create policy "Volunteer_Insert_Status"
  on public.station_status for insert
  with check ( public.is_volunteer_or_admin() );

create policy "Volunteer_Update_Status"
  on public.station_status for update
  using ( public.is_volunteer_or_admin() );
  
-- LOCATIONS Table
create policy "Public_Read_Published_Locations"
    on public.locations for select
    using ( is_published = true );
    
COMMIT;
