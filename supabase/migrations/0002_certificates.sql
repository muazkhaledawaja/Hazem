-- Turn the `projects` table into a Certificates & Internships showcase.
-- Run this once in the Supabase SQL editor.

-- 1. Add image column and wipe existing rows.
alter table public.projects add column if not exists image_url text;
delete from public.projects;

-- 2. Storage bucket for uploaded certificate/internship images.
insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do nothing;

-- 3. Public read policy so anon clients can list/fetch objects.
drop policy if exists "public read portfolio images" on storage.objects;
create policy "public read portfolio images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'portfolio-images');
