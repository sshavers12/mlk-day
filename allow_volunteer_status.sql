
-- Allow Volunteers to view and update station status
-- They need to see current status (Select) and change it (Insert/Update)

create policy "Volunteer_Read_Station_Status"
  on public.station_status for select
  using ( public.is_volunteer_or_admin() );

create policy "Volunteer_Insert_Station_Status"
  on public.station_status for insert
  with check ( public.is_volunteer_or_admin() );

create policy "Volunteer_Update_Station_Status"
  on public.station_status for update
  using ( public.is_volunteer_or_admin() );
