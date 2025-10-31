# database setup

## initial migration

run `001_initial_schema.sql` in your supabase SQL editor to create all tables.

## seed dummy stories (optional)

to see what the feed looks like with content, run `seed_dummy_stories.sql` in your supabase SQL editor.

this will create 5 fun example stories:

1. **"elevenses canceled due to unforeseen lembas bread hoarding by gandalf the grey"**
   8 upvotes • frodo, sam, merry, pippin

2. **"my houseplant knows all my secrets and judges me for watering irregularly"**
   3 upvotes • plantdad, anonymous, greenthumb, anonymous

3. **"the FBI agent watching me google is this a rash needs therapy"**
   5 upvotes • snowden, anonymous, concerned, dr_phil

4. **"rejected fortune cookie says you will die alone surrounded by uneaten takeout"**
   2 upvotes • confucius, wiseman, oracle, anonymous

5. **"spotify wrapped revealed i listened to one sad song four thousand times"**
   1 upvote • musiclover, emo_kid, depressed, anonymous

these are just for testing the UI - you can delete them anytime by running:

```sql
DELETE FROM stories WHERE chain_id LIKE '550e8400-e29b-41d4-a716-44665544000%';
DELETE FROM chains WHERE id LIKE '550e8400-e29b-41d4-a716-44665544000%';
```
