-- Admin dashboard schema for Mohamed Hazem portfolio.
-- Run this once in the Supabase SQL editor, then create the owner user
-- manually via Authentication > Users > Add user (email + password).

-- Enable UUID generation.
create extension if not exists "pgcrypto";

-- Reusable trigger to keep updated_at current.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------- projects ----------
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text not null,
  accent text not null default '#62b6cb',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger projects_set_updated_at before update on public.projects
  for each row execute function public.set_updated_at();

-- ---------- experience ----------
create table public.experience (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text not null,
  period text not null,
  description text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger experience_set_updated_at before update on public.experience
  for each row execute function public.set_updated_at();

-- ---------- videos ----------
create table public.videos (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  embed text,
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger videos_set_updated_at before update on public.videos
  for each row execute function public.set_updated_at();

-- ---------- skill_groups ----------
create table public.skill_groups (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  tone text not null default 'pacific', -- one of: pacific | fresh | frozen
  items text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger skill_groups_set_updated_at before update on public.skill_groups
  for each row execute function public.set_updated_at();

-- ---------- site_content (singletons: about, contact) ----------
create table public.site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
create trigger site_content_set_updated_at before update on public.site_content
  for each row execute function public.set_updated_at();

-- ---------- RLS ----------
-- Anonymous + authenticated users may only SELECT.
-- All writes happen via the service-role key from Server Actions after
-- our own session check.
alter table public.projects      enable row level security;
alter table public.experience    enable row level security;
alter table public.videos        enable row level security;
alter table public.skill_groups  enable row level security;
alter table public.site_content  enable row level security;

create policy "public read projects"     on public.projects     for select using (true);
create policy "public read experience"   on public.experience   for select using (true);
create policy "public read videos"       on public.videos       for select using (true);
create policy "public read skill_groups" on public.skill_groups for select using (true);
create policy "public read site_content" on public.site_content for select using (true);

-- ---------- Seed data (current portfolio content) ----------
insert into public.projects (title, category, description, accent, sort_order) values
  ('Vigour Gym Campaign',       'Advertising',         'Fitness-focused promotional content for a local gym brand.',            '#62b6cb', 10),
  ('Dr. Ahmed Dentistry',       'Advertising',         'Educational and marketing videos for dental practice.',                 '#5fa8d3', 20),
  ('180° Charity Documentary',  'Filmmaking',          'Short documentary on volunteer food distribution efforts.',             '#bee9e8', 30),
  ('LSBU Summer Programme',     'University Projects', 'Academic and cultural engagement project — London, UK.',                '#62b6cb', 40),
  ('Brand Identity Concepts',   'Advertising',         'Strategic brand development and visual identity work.',                 '#5fa8d3', 50),
  ('Etisalat Event Campaigns',  'University Projects', 'Corporate event planning and creative brief development.',              '#bee9e8', 60);

insert into public.experience (role, company, period, description, sort_order) values
  ('Brand & Marketing Communication', 'Etisalat',                     'Oct 2025 – Feb 2026',
   'Events management specialist — organized corporate events, prepared creative briefs and proposals, coordinated with internal teams and external vendors.', 10),
  ('Media & Communications Intern',   'Sphinx International Airport', 'Sep 2025',
   'Generated marketing ideas to enhance airport visibility. Contributed to campaign brainstorming and supported digital and on-ground branding.',              20),
  ('Video Editor',                    'PO3 Marketing Agency',         'Aug – Oct 2024',
   'Edited promotional videos for Vigour Gym and Doctor Ahmed Dentistry. End-to-end editing: transitions, sound design, and visual effects.',                   30),
  ('Documentary Production',          '180 Degree Charity',           '2024',
   'Led creative direction on a short documentary — planning, shooting, and final edit showcasing volunteer food distribution efforts.',                        40);

insert into public.videos (slug, title, description, embed, featured, sort_order) values
  ('main', 'Showreel 2026',                   'A collection of my best work across advertising, filmmaking, and brand campaigns.', null, true,  10),
  ('v1',   'Vigour Gym — Promo',              'Fitness-focused campaign edit with dynamic transitions and sound design.',          null, false, 20),
  ('v2',   'Dr. Ahmed Dentistry — Spot',      'Educational marketing video for dental practice awareness.',                        null, false, 30),
  ('v3',   '180° Charity Documentary',        'Short documentary on volunteer food distribution efforts.',                         null, false, 40);

insert into public.skill_groups (title, tone, items, sort_order) values
  ('Creative',  'pacific', array['Storytelling','Video Editing','Ad Directing','Visual Communication'],       10),
  ('Strategic', 'fresh',   array['Brand Consulting','Marketing Strategy','Promotional Content','Event Management'], 20),
  ('Tools',     'frozen',  array['Premiere Pro','After Effects','Photoshop','Canva'],                          30);

insert into public.site_content (key, value) values
  ('about', jsonb_build_object(
    'bioPrimary',   'Driven and imaginative Mass Communication student specializing in advertising, filmmaking, and brand development. Experienced in producing promotional content for real clients and passionate about inspiring brands with fresh, strategic marketing ideas.',
    'bioSecondary', 'Adept at storytelling, video editing, and visual communication. Eager to grow in advertisement directing, marketing, and brand consulting.',
    'badgeTop',     'BUE / LSBU',
    'badgeBottom',  'Dual Degree',
    'stats', jsonb_build_array(
      jsonb_build_object('value','3+','label','Projects'),
      jsonb_build_object('value','2','label','Clients'),
      jsonb_build_object('value','2','label','Internships')
    )
  )),
  ('contact', jsonb_build_object(
    'email',    'mohamedhazem69@gmail.com',
    'phone',    '+20 110 008 9064',
    'linkedin', 'https://www.linkedin.com/in/mohamed-hazem-914a60360/',
    'blurb',    'Open for collaborations in advertising, filmmaking, and brand consulting.'
  ));
