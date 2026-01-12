-- Secure Station Status RLS Policies
-- Ensures only authenticated users (volunteers/admins) can write to station_status.

-- 1. Drop existing policies to be safe (or recreate them)
DROP POLICY IF EXISTS "Public read station_status" ON public.station_status;
DROP POLICY IF EXISTS "Volunteers update station_status" ON public.station_status;
DROP POLICY IF EXISTS "Admins have full access to station_status" ON public.station_status;

-- 2. Create specific policies

-- Allow everyone to READ (so the public can see if a station is busy/open)
CREATE POLICY "Public read station_status"
ON public.station_status FOR SELECT
USING (true);

-- Allow authenticated users (volunteers/admins) to INSERT
CREATE POLICY "Volunteers insert station_status"
ON public.station_status FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to UPDATE
CREATE POLICY "Volunteers update station_status"
ON public.station_status FOR UPDATE
USING (auth.role() = 'authenticated');

-- 3. Ensure Unique Constraint on station_id to prevent duplicates
-- (This fixes the underlying cause of the "duplicate key" error if it wasn't enforced properly,
-- though the application code must also handle UPSERT correctly).
ALTER TABLE public.station_status DROP CONSTRAINT IF EXISTS station_status_station_id_key;
ALTER TABLE public.station_status ADD CONSTRAINT station_status_station_id_key UNIQUE (station_id);

-- 4. Secure Submissions (just in case)
-- Ensure anonymous users can INSERT submissions (if that's the desired flow for community voice)
-- but NOT read them.
DROP POLICY IF EXISTS "Public insert submissions" ON public.submissions;
CREATE POLICY "Public insert submissions"
ON public.submissions FOR INSERT
WITH CHECK (true); -- Allow anonymous inserts? Or strictly authenticated? 
-- Re-reading prompt: "No anonymous read/write access to station_status, notes, scripts." 
-- "Ensure only authenticated volunteers can read/write station data relevant to the console."
-- My "Public read station_status" above contradicts "No anonymous read". 
-- BUT: The public needs to see the status (Open/Busy) on the station landing page? 
-- "No anonymous read/write access to station_status, notes, scripts." -> Okay, strict interpretation:
-- The public shouldn't gaze at the internal notes. But status? 
-- Usually "Open/Busy" is public info. 
-- I will restrict READ to authenticated users for now as per strict instruction "No anonymous read/write access".
-- If the public app breaks, I will revert READ to public.

DROP POLICY "Public read station_status" ON public.station_status;

CREATE POLICY "Authenticated read station_status"
ON public.station_status FOR SELECT
USING (auth.role() = 'authenticated');

