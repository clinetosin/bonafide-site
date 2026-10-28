-- Bonafide Pawnshop: initial schema. Run in the Supabase SQL editor.

create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  kind text not null check (kind in ('item', 'car')),
  category text not null,
  brand text not null,
  name text not null,
  ref_line text,
  price_naira bigint not null,
  condition text,
  box_papers text,
  location text,
  certificate_no text unique not null,
  inspected_on date not null,
  pawn_eligible boolean default false,
  manufacturer_url text,
  specialist_note text,
  specs jsonb default '[]'::jsonb,
  checks jsonb default '[]'::jsonb,
  photos jsonb default '[]'::jsonb,      -- studio photos of the actual item
  spin_frames jsonb default '[]'::jsonb, -- 360° turntable frames
  car_details jsonb,                     -- VIN, mileage history, customs, etc.
  status text not null default 'available' check (status in ('available', 'reserved', 'sold')),
  created_at timestamptz default now()
);

create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  listing_slug text not null,
  listing_kind text not null,
  email text not null,
  phone text not null,
  deposit_naira bigint not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'cancelled', 'refunded')),
  paid_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists valuation_requests (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  category text,
  mode text not null check (mode in ('sell', 'pawn')),
  details jsonb not null,
  photo_paths text[] default '{}',
  phone text not null,
  status text not null default 'new',
  created_at timestamptz default now()
);

-- Listings are public to read; everything else is server-only (service role).
alter table listings enable row level security;
alter table reservations enable row level security;
alter table valuation_requests enable row level security;

create policy "Public can read listings" on listings for select using (true);

-- Private bucket for seller photos
insert into storage.buckets (id, name, public)
values ('valuation-photos', 'valuation-photos', false)
on conflict (id) do nothing;
