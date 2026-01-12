-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS (Extends Auth)
create table public.users (
  id uuid references auth.users not null primary key,
  email text,
  role text check (role in ('admin', 'volunteer')) default 'volunteer',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.users enable row level security;

-- LOCATIONS
create table public.locations (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  poster_url text,
  story text,
  youtube_url text,
  display_order integer default 0,
  is_published boolean default false,
  updated_by uuid references public.users(id),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
alter table public.locations enable row level security;

-- STATIONS
create table public.stations (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  poster_url text,
  description text,
  youtube_url text,
  display_order integer default 0,
  is_published boolean default false,
  updated_by uuid references public.users(id),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
alter table public.stations enable row level security;

-- ANNOUNCEMENTS
create table public.announcements (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  body text,
  starts_at timestamp with time zone,
  ends_at timestamp with time zone,
  is_published boolean default false,
  updated_by uuid references public.users(id),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
alter table public.announcements enable row level security;

-- STATION STATUS
create table public.station_status (
  id uuid default uuid_generate_v4() primary key,
  station_id uuid references public.stations(id),
  status text check (status in ('Not Ready', 'Ready', 'Live', 'Issue')) default 'Not Ready',
  note text,
  updated_by uuid references public.users(id),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
alter table public.station_status enable row level security;

-- SUBMISSIONS
create table public.submissions (
  id uuid default uuid_generate_v4() primary key,
  submitted_by uuid references public.users(id),
  target_type text check (target_type in ('location', 'station', 'announcement')),
  target_id uuid, -- specific ID if editing
  title text,
  content_type text check (content_type in ('youtube_link', 'text_update', 'image_url')),
  payload text,
  notes text,
  status text check (status in ('pending', 'approved', 'rejected')) default 'pending',
  reviewed_by uuid references public.users(id),
  reviewed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
alter table public.submissions enable row level security;

-- POLICIES (Simplified for initial setup)
-- Public read access for published content
create policy "Public locations are viewable by everyone" on locations for select using (is_published = true);
create policy "Public stations are viewable by everyone" on stations for select using (is_published = true);

-- Admin/Volunteer access needs to be handled via secure role checks in app or policies
-- For now, allowing authenticated read for dashboard
create policy "Auth users can view all" on locations for select using (auth.role() = 'authenticated');
create policy "Auth users can view all" on stations for select using (auth.role() = 'authenticated');

-- Seed Data (Locations)
insert into locations (slug, title, poster_url, story, display_order, is_published) values
('university-place-cafeteria', 'University Place Cafeteria', 'assets/images/university-poster.jpg', 'The Gathering. The starting point. Like the mass meetings of the civil rights era, we begin with community orientation.', 1, true),
('alumni-auditorium', 'Alumni Auditorium', 'assets/images/alumni-auditorium-poster.jpg', 'The Threshold. We exit the comfort of the gathering and walk to the Auditorium. This is the space of confrontation and history.', 2, true),
('harris-commons', 'Harris Commons', 'assets/images/harris-commons-poster.jpg', 'The Processing. A necessary pause. After the weight of the Auditorium, we enter Harris Commons to breathe and process.', 3, true),
('latham-hall', 'Latham Hall', 'assets/images/latham-hall-poster.jpg', 'The Reflection. The core interactive zone. Here, we engage with the 5 Stations of Preparation.', 4, true);

-- Seed Data (Stations)
insert into stations (slug, title, poster_url, description, display_order, is_published) values
('01-belief', 'Belief', 'assets/images/station-01-belief-poster.jpg', 'Name the conviction that holds you steady when everything else shifts.', 1, true),
('02-courage', 'Courage', 'assets/images/station-02-courage-poster.jpg', 'Call out the moment you choose bravery over comfort.', 2, true),
('03-identity', 'Identity', 'assets/images/station-03-identity-poster.jpg', 'Who are you when nobody is watching and nobody is clapping.', 3, true),
('04-listening', 'Listening', 'assets/images/station-04-listening-poster.jpg', 'Justice starts when we listen long enough to be changed.', 4, true),
('05-preparation', 'Preparation', 'assets/images/station-05-preparation-poster.jpg', 'Freedom is built. What are you training for right now.', 5, true);
