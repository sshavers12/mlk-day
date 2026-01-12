
-- Fix Submissions Table for Public Access
-- 1. Make `submitted_by` OPTIONAL (nullable) to allow anonymous submissions.
-- 2. Add top-level `author_name` for easier access (optional but good practice).

alter table public.submissions
  alter column submitted_by drop not null;

-- Ensure author_name exists if we want to query it easily, 
-- though storing it in payload is also fine. 
-- Let's check if we strictly need to change the schema or just the component.
-- Component sends author_name in payload. Schema doesn't strictly need a column if we are okay with payload.
-- BUT, `submitted_by` MUST be nullable.
