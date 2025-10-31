-- Run this in Supabase SQL editor to verify today's prompt
select prompt_date, text, created_at
from prompts
where prompt_date = current_date;
