-- Migration: Upgrade Station Visuals & Data logic

-- 1. Downgrade existing "5 Stations" to sub_station
UPDATE public.stations 
SET type = 'sub_station' 
WHERE slug IN ('01-belief', '02-courage', '03-identity', '04-listening', '05-preparation');

-- 2. Insert or Update the 4 Main Stations
-- Station 00: Cafeteria
INSERT INTO public.stations (slug, title, display_order, type, description, poster_url, map_visual_url, experience_visual_urls)
VALUES (
  'university-place-cafeteria',
  'Station 00: Cafeteria',
  0,
  'station',
  'The Gathering. The starting point. Like the mass meetings of the civil rights era, we begin with community orientation. This space invites reflection and participation at your own pace.',
  'assets/images/station_00_poster_map_1768200644777.png',
  'assets/images/station_00_poster_map_1768200644777.png',
  ARRAY['assets/images/station_00_experience_1768200664028.png']
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  display_order = EXCLUDED.display_order,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  poster_url = EXCLUDED.poster_url,
  map_visual_url = EXCLUDED.map_visual_url,
  experience_visual_urls = EXCLUDED.experience_visual_urls;

-- Station 01: Alumni Hall
INSERT INTO public.stations (slug, title, display_order, type, description, poster_url, map_visual_url, experience_visual_urls)
VALUES (
  'alumni-auditorium',
  'Station 01: Alumni Hall',
  1,
  'station',
  'The Threshold. We exit the comfort of the gathering and walk to the Auditorium. This is the space of confrontation and history. Allow yourself to feel the weight of the history here.',
  'assets/images/station_01_poster_map_1768200680016.png',
  'assets/images/station_01_poster_map_1768200680016.png',
  ARRAY['assets/images/station_01_experience_1768200697024.png']
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  display_order = EXCLUDED.display_order,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  poster_url = EXCLUDED.poster_url,
  map_visual_url = EXCLUDED.map_visual_url,
  experience_visual_urls = EXCLUDED.experience_visual_urls;

-- Station 02: Harris Hall
INSERT INTO public.stations (slug, title, display_order, type, description, poster_url, map_visual_url, experience_visual_urls)
VALUES (
  'harris-hall',
  'Station 02: Harris Hall',
  2,
  'station',
  'The Processing. A necessary pause. After the weight of the Auditorium, we enter Harris Hall to breathe and process. Here you are invited to create.',
  'assets/images/station_02_poster_map_1768200722625.png',
  'assets/images/station_02_poster_map_1768200722625.png',
  ARRAY['assets/images/station_02_experience_1768200742586.png']
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  display_order = EXCLUDED.display_order,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  poster_url = EXCLUDED.poster_url,
  map_visual_url = EXCLUDED.map_visual_url,
  experience_visual_urls = EXCLUDED.experience_visual_urls;

-- Haris Commons might exist as harris-commons, we should rename or remove it if reusing the same row
-- If slug 'harris-commons' exists, delete it or update snake_case. 
-- Assuming 'harris-hall' is new or we want to migrate.
DELETE FROM public.stations WHERE slug = 'harris-commons';

-- Station 03: Latham Hall
INSERT INTO public.stations (slug, title, display_order, type, description, poster_url, map_visual_url, experience_visual_urls)
VALUES (
  'latham-hall',
  'Station 03: Latham Hall',
  3,
  'station',
  'The Reflection. The core interactive zone. Move through the stations at your own pace. Scan the codes to hear the voices of the movement.',
  'assets/images/station_03_poster_map_1768200757815.png',
  'assets/images/station_03_poster_map_1768200757815.png',
  ARRAY['assets/images/station_03_experience_1768200773847.png']
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  display_order = EXCLUDED.display_order,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  poster_url = EXCLUDED.poster_url,
  map_visual_url = EXCLUDED.map_visual_url,
  experience_visual_urls = EXCLUDED.experience_visual_urls;
