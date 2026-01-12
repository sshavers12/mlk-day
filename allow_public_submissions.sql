
-- Allow Public (Anon + Authenticated) Submissions
-- This enables the "Community Voice" feature where any visitor can submit content.

-- 1. Drop the restrictive policy if it exists (or just add a new broader one)
drop policy if exists "Volunteers create submissions" on public.submissions;

-- 2. Create a policy that allows ANYONE to insert
-- We verify that the status is 'pending' to prevent people from inserting 'approved' content directly.
create policy "Public_Create_Submissions"
  on public.submissions
  for insert
  with check (
    status = 'pending'
  );

-- 3. Allow Public to READ their own submissions? 
-- Usually we don't want public reading everything. 
-- For now, we only need INSERT.
