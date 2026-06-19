-- Schema planejado. Não aplicar em produção antes de validar licença da tradução bíblica.

create table if not exists public.bible_versions (
  id text primary key,
  name text not null,
  abbreviation text not null,
  language text not null default 'pt-BR',
  copyright_status text not null,
  license_notes text,
  source_url text,
  is_active boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.bible_books (
  id text primary key,
  name text not null,
  abbreviation text not null,
  testament text not null,
  order_index int not null
);

create table if not exists public.bible_chapters (
  id uuid primary key default gen_random_uuid(),
  book_id text not null references public.bible_books(id),
  chapter_number int not null,
  unique(book_id, chapter_number)
);

create table if not exists public.bible_verses (
  id uuid primary key default gen_random_uuid(),
  version_id text not null references public.bible_versions(id),
  book_id text not null references public.bible_books(id),
  chapter_number int not null,
  verse_number int not null,
  text text not null,
  unique(version_id, book_id, chapter_number, verse_number)
);

create table if not exists public.reading_blocks (
  id text primary key,
  day_number int not null unique,
  book_id text not null references public.bible_books(id),
  title text not null,
  reference_label text not null,
  start_chapter int not null,
  start_verse int,
  end_chapter int not null,
  end_verse int
);

create table if not exists public.player_reflections (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null,
  day_number int not null,
  book_id text not null,
  verse_reference text,
  note text,
  shared boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(player_id, day_number)
);
