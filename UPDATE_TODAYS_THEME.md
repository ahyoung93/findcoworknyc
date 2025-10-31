# update today's theme

the date now auto-updates every day, but you need to set today's theme in the database.

## quick update

go to your supabase dashboard → SQL Editor and run:

```sql
UPDATE prompts
SET text = 'fantasy & mythology'
WHERE prompt_date = current_date;
```

or insert if it doesn't exist:

```sql
INSERT INTO prompts (prompt_date, text)
VALUES (current_date, 'fantasy & mythology')
ON CONFLICT (prompt_date)
DO UPDATE SET text = 'fantasy & mythology';
```

## available themes (rotates automatically via cron)

- fantasy & mythology
- side quests
- superpowers
- surveillance
- plants
- cryptids
- anxiety
- boss battles
- fortune cookies
- conspiracy theories
- the multiverse
- demons
- parallel universes
- the afterlife
- time travel
- aliens
- robots
- dreams
- pets
- food
- music
- technology
- dating
- villains
- weather
- magic
- ghosts
- space
- ocean
- monsters

the cron job rotates through these automatically at midnight ET. the theme is intentionally broad to let people interpret it however they want!
