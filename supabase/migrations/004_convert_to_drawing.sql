-- Convert baton from text-based to drawing-based
-- Changes: 4 people/4 words → 3 people/30 seconds

-- Update chains table
alter table chains
  alter column max_contributors set default 3,
  rename column words_per_turn to seconds_per_turn;

alter table chains
  alter column seconds_per_turn set default 30;

-- Update entries table to store drawing data
alter table entries
  rename column text to drawing_data;

alter table entries
  alter column drawing_data type jsonb using drawing_data::jsonb;

-- Update stories table to store image URL
alter table stories
  rename column text to image_url;

-- Add comment for clarity
comment on column entries.drawing_data is 'JSON array of drawing strokes: [{color, points: [[x,y], ...]}]';
comment on column stories.image_url is 'URL/path to the completed drawing image in Supabase Storage';
