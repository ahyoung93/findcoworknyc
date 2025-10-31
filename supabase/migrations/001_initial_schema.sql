-- Initial schema for baton app
-- Run this migration in your Supabase SQL editor

-- Prompts table
create table prompts (
  prompt_date date primary key,
  text text not null,
  created_at timestamptz default now()
);

-- Chains table
create table chains (
  id uuid primary key default gen_random_uuid(),
  prompt_date date not null references prompts(prompt_date),
  status text not null check (status in ('open','complete')) default 'open',
  max_contributors int not null default 4,
  words_per_turn int not null default 4,
  created_at timestamptz default now(),
  finished_at timestamptz
);

-- Create index on chains for queries
create index chains_prompt_date_idx on chains(prompt_date);
create index chains_status_idx on chains(status);

-- Entries table
create table entries (
  id bigserial primary key,
  chain_id uuid not null references chains(id) on delete cascade,
  turn_index int not null,
  text text not null,
  author_name text not null default 'anonymous',
  author_fingerprint text not null,
  created_at timestamptz default now(),
  unique (chain_id, turn_index)
);

-- Create index on entries
create index entries_chain_id_idx on entries(chain_id);

-- Notifications table
create table notifs (
  id bigserial primary key,
  chain_id uuid not null references chains(id) on delete cascade,
  email text not null,
  notified boolean default false,
  unique (chain_id, email)
);

-- Create index on notifs
create index notifs_chain_id_idx on notifs(chain_id);
create index notifs_notified_idx on notifs(notified);

-- Stories table (denormalized for feed)
create table stories (
  chain_id uuid primary key references chains(id) on delete cascade,
  prompt_date date not null,
  text text not null,
  contributors text[] not null,
  finished_at timestamptz not null
);

-- Create index on stories
create index stories_finished_at_idx on stories(finished_at desc);
create index stories_prompt_date_idx on stories(prompt_date);

-- Votes table
create table votes (
  story_id uuid not null references stories(chain_id) on delete cascade,
  voter_fingerprint text not null,
  created_at timestamptz default now(),
  primary key (story_id, voter_fingerprint)
);

-- Create index on votes
create index votes_story_id_idx on votes(story_id);

-- Initial prompt for today (run migration 002_themes.sql for full theme list)
insert into prompts (prompt_date, text) values
  (current_date, 'fantasy & mythology')
on conflict (prompt_date) do nothing;
