-- Update today's prompt to use the new theme system
-- Run this in your Supabase SQL editor

-- Update today's theme (first in the shuffled list)
update prompts
set text = 'parking lots'
where prompt_date = current_date;

-- If no row exists for today, insert it
insert into prompts (prompt_date, text) values
  (current_date, 'parking lots')
on conflict (prompt_date) do nothing;
