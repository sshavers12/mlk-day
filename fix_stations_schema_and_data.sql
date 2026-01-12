-- Migration: Fix Schema and Upgrade Station Data
-- Run this script in the Supabase SQL Editor to fix the "column does not exist" errors.

-- 1. Add MISSING columns to the stations table
ALTER TABLE public.stations ADD COLUMN IF NOT EXISTS type text DEFAULT 'station';
ALTER TABLE public.stations ADD COLUMN IF NOT EXISTS map_visual_url text;
ALTER TABLE public.stations ADD COLUMN IF NOT EXISTS experience_visual_urls text[];
ALTER TABLE public.stations ADD COLUMN IF NOT EXISTS story text;
ALTER TABLE public.stations ADD COLUMN IF NOT EXISTS volunteer_script text;
ALTER TABLE public.stations ADD COLUMN IF NOT EXISTS qr_instruction text;

-- 2. Downgrade existing "5 Stations" to sub_station
UPDATE public.stations 
SET type = 'sub_station' 
WHERE slug IN ('01-belief', '02-courage', '03-identity', '04-listening', '05-preparation') 
   OR slug IN ('sub-belief', 'sub-courage', 'sub-identity', 'sub-listening', 'sub-preparation');

-- 3. Insert or Update the 4 Main Stations
-- Station 01: Cafeteria
INSERT INTO public.stations (slug, title, display_order, type, description, story, poster_url, map_visual_url, experience_visual_urls, volunteer_script, qr_instruction)
VALUES (
  'station-01-cafeteria',
  'Station 01: Cafeteria',
  1,
  'station',
  'Like the mass meetings of the civil rights era, we begin with community orientation. Opening + Remarks.',
  'The Gathering. The starting point.',
  'assets/images/station_01_poster.png',
  'assets/images/station_01_map.png',
  ARRAY['assets/images/station_01_exp.png'],
  'Welcome to the Gathering. This is where we orient ourselves before the work begins. Please feel free to listen to the remarks and find your group.',
  'Scan to view the detailed schedule and opening remarks.'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  display_order = EXCLUDED.display_order,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  story = EXCLUDED.story,
  poster_url = EXCLUDED.poster_url,
  map_visual_url = EXCLUDED.map_visual_url,
  experience_visual_urls = EXCLUDED.experience_visual_urls,
  volunteer_script = EXCLUDED.volunteer_script,
  qr_instruction = EXCLUDED.qr_instruction;

-- Station 02: Alumni Hall
INSERT INTO public.stations (slug, title, display_order, type, description, story, poster_url, map_visual_url, experience_visual_urls, volunteer_script, qr_instruction)
VALUES (
  'station-02-alumni-hall',
  'Station 02: Alumni Hall',
  2,
  'station',
  'We exit the comfort of the gathering and walk to the Auditorium. This is the space of confrontation and history.',
  'The Threshold.',
  'assets/images/station_02_poster.png',
  'assets/images/station_02_map.png',
  ARRAY['assets/images/station_02_exp.png'],
  'This is The Threshold. It is a space of history and confrontation. We invite you to enter quietly and observe.',
  'Scan to read about the historical significance of Alumni Hall.'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  display_order = EXCLUDED.display_order,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  story = EXCLUDED.story,
  poster_url = EXCLUDED.poster_url,
  map_visual_url = EXCLUDED.map_visual_url,
  experience_visual_urls = EXCLUDED.experience_visual_urls,
  volunteer_script = EXCLUDED.volunteer_script,
  qr_instruction = EXCLUDED.qr_instruction;

-- Station 03: Harris Hall
INSERT INTO public.stations (slug, title, display_order, type, description, story, poster_url, map_visual_url, experience_visual_urls, volunteer_script, qr_instruction)
VALUES (
  'station-03-harris-hall',
  'Station 03: Harris Hall',
  3,
  'station',
  'A necessary pause. Community Art & Processing. Here you are invited to create and add your mark.',
  'The Processing.',
  'assets/images/station_03_poster.png',
  'assets/images/station_03_map.png',
  ARRAY['assets/images/station_03_exp.png'],
  'Welcome to the Processing space. You are invited to reflect and add your mark to the community wall.',
  'Scan to share a digital reflection or view the community art gallery.'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  display_order = EXCLUDED.display_order,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  story = EXCLUDED.story,
  poster_url = EXCLUDED.poster_url,
  map_visual_url = EXCLUDED.map_visual_url,
  experience_visual_urls = EXCLUDED.experience_visual_urls,
  volunteer_script = EXCLUDED.volunteer_script,
  qr_instruction = EXCLUDED.qr_instruction;

-- Station 04: Lathem Hall
INSERT INTO public.stations (slug, title, display_order, type, description, story, poster_url, map_visual_url, experience_visual_urls, volunteer_script, qr_instruction)
VALUES (
  'station-04-lathem-hall',
  'Station 04: Lathem Hall',
  4,
  'station',
  'The core interactive zone. Digital Collection: Preparation / Beloved Community.',
  'The Reflection.',
  'assets/images/station_04_poster.png',
  'assets/images/station_04_map.png',
  ARRAY['assets/images/station_04_exp.png'],
  'This is the Reflection zone. Here you will find the 5 Stations of Preparation. You may visit them in any order.',
  'Scan to access the Digital Collection and audio guides.'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  display_order = EXCLUDED.display_order,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  story = EXCLUDED.story,
  poster_url = EXCLUDED.poster_url,
  map_visual_url = EXCLUDED.map_visual_url,
  experience_visual_urls = EXCLUDED.experience_visual_urls,
  volunteer_script = EXCLUDED.volunteer_script,
  qr_instruction = EXCLUDED.qr_instruction;

-- 4. CLEANUP: Delete old mismatched slugs if desired
DELETE FROM public.stations 
WHERE slug IN ('university-place-cafeteria', 'alumni-auditorium', 'harris-hall', 'latham-hall', 'harris-commons');
