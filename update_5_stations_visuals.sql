-- Update Station Visuals with Generated Posters

-- Station 1: Belief
UPDATE public.stations
SET poster_url = 'assets/images/station-01-belief.png',
    map_visual_url = 'assets/images/station-01-belief.png'
WHERE slug = '01-belief';

-- Station 2: Courage
UPDATE public.stations
SET poster_url = 'assets/images/station-02-courage.png',
    map_visual_url = 'assets/images/station-02-courage.png'
WHERE slug = '02-courage';

-- Station 3: Identity
UPDATE public.stations
SET poster_url = 'assets/images/station-03-identity.png',
    map_visual_url = 'assets/images/station-03-identity.png'
WHERE slug = '03-identity';

-- Station 4: Listening
UPDATE public.stations
SET poster_url = 'assets/images/station-04-listening.png',
    map_visual_url = 'assets/images/station-04-listening.png'
WHERE slug = '04-listening';

-- Station 5: Preparation
UPDATE public.stations
SET poster_url = 'assets/images/station-05-preparation.png',
    map_visual_url = 'assets/images/station-05-preparation.png'
WHERE slug = '05-preparation';
