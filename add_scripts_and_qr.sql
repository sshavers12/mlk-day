
-- Migration: Add fields for Volunteer Script and QR Instruction
-- The user requested these features for both main stations (Locations) and sub-stations (Stations).

-- 1. Add columns to 'locations' (Station 00-03)
alter table public.locations 
  add column if not exists volunteer_script text,
  add column if not exists qr_instruction text;

-- 2. Add columns to 'stations' (Belief, Courage, etc.)
alter table public.stations 
  add column if not exists volunteer_script text,
  add column if not exists qr_instruction text;
