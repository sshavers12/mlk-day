
-- EMERGENCY UNBLOCK
-- The 'users' table recursion is preventing EVERYTHING (Auth, Public Reads, Admin).

-- 1. DISABLE RLS on 'users' table temporarily to unblock the app
alter table public.users disable row level security;

-- 2. DISABLE RLS on 'station_status' (just in case)
alter table public.station_status disable row level security;

-- 3. Ensure Stations are publicly readable (Standard Policy)
drop policy if exists "Public_Read_Published_Stations" on public.stations;
create policy "Public_Read_Published_Stations"
  on public.stations for select
  using ( is_published = true );

-- 4. Ensure Locations are publicly readable
drop policy if exists "Public_Read_Published_Locations" on public.locations;
create policy "Public_Read_Published_Locations"
  on public.locations for select
  using ( is_published = true );
