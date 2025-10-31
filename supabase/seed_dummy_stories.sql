-- Dummy stories for testing the feed
-- Run this in Supabase SQL Editor to see what the feed looks like

-- First, create some dummy chains
INSERT INTO chains (id, prompt_date, status, max_contributors, words_per_turn, created_at, finished_at) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', current_date, 'complete', 4, 4, now() - interval '2 hours', now() - interval '1 hour'),
  ('550e8400-e29b-41d4-a716-446655440002', current_date, 'complete', 4, 4, now() - interval '5 hours', now() - interval '3 hours'),
  ('550e8400-e29b-41d4-a716-446655440003', current_date, 'complete', 4, 4, now() - interval '8 hours', now() - interval '6 hours'),
  ('550e8400-e29b-41d4-a716-446655440004', current_date, 'complete', 4, 4, now() - interval '12 hours', now() - interval '10 hours'),
  ('550e8400-e29b-41d4-a716-446655440005', current_date, 'complete', 4, 4, now() - interval '20 hours', now() - interval '18 hours')
ON CONFLICT (id) DO NOTHING;

-- Create entries for each chain
INSERT INTO entries (chain_id, turn_index, text, author_name, author_fingerprint) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 0, 'elevenses canceled due', 'frodo', 'fp1'),
  ('550e8400-e29b-41d4-a716-446655440001', 1, 'to unforeseen lembas', 'sam', 'fp2'),
  ('550e8400-e29b-41d4-a716-446655440001', 2, 'bread hoarding by', 'merry', 'fp3'),
  ('550e8400-e29b-41d4-a716-446655440001', 3, 'gandalf the grey', 'pippin', 'fp4'),

  ('550e8400-e29b-41d4-a716-446655440002', 0, 'my houseplant knows', 'plantdad', 'fp5'),
  ('550e8400-e29b-41d4-a716-446655440002', 1, 'all my secrets', 'anonymous', 'fp6'),
  ('550e8400-e29b-41d4-a716-446655440002', 2, 'and judges me', 'greenthumb', 'fp7'),
  ('550e8400-e29b-41d4-a716-446655440002', 3, 'for watering irregularly', 'anonymous', 'fp8'),

  ('550e8400-e29b-41d4-a716-446655440003', 0, 'the FBI agent', 'snowden', 'fp9'),
  ('550e8400-e29b-41d4-a716-446655440003', 1, 'watching me google', 'anonymous', 'fp10'),
  ('550e8400-e29b-41d4-a716-446655440003', 2, 'is this a', 'concerned', 'fp11'),
  ('550e8400-e29b-41d4-a716-446655440003', 3, 'rash needs therapy', 'dr_phil', 'fp12'),

  ('550e8400-e29b-41d4-a716-446655440004', 0, 'rejected fortune cookie', 'confucius', 'fp13'),
  ('550e8400-e29b-41d4-a716-446655440004', 1, 'says you will', 'wiseman', 'fp14'),
  ('550e8400-e29b-41d4-a716-446655440004', 2, 'die alone surrounded', 'oracle', 'fp15'),
  ('550e8400-e29b-41d4-a716-446655440004', 3, 'by uneaten takeout', 'anonymous', 'fp16'),

  ('550e8400-e29b-41d4-a716-446655440005', 0, 'spotify wrapped revealed', 'musiclover', 'fp17'),
  ('550e8400-e29b-41d4-a716-446655440005', 1, 'i listened to', 'emo_kid', 'fp18'),
  ('550e8400-e29b-41d4-a716-446655440005', 2, 'one sad song', 'depressed', 'fp19'),
  ('550e8400-e29b-41d4-a716-446655440005', 3, 'four thousand times', 'anonymous', 'fp20')
ON CONFLICT DO NOTHING;

-- Create story entries
INSERT INTO stories (chain_id, prompt_date, text, contributors, finished_at) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', current_date, 'elevenses canceled due to unforeseen lembas bread hoarding by gandalf the grey', ARRAY['frodo', 'sam', 'merry', 'pippin'], now() - interval '1 hour'),
  ('550e8400-e29b-41d4-a716-446655440002', current_date, 'my houseplant knows all my secrets and judges me for watering irregularly', ARRAY['plantdad', 'anonymous', 'greenthumb', 'anonymous'], now() - interval '3 hours'),
  ('550e8400-e29b-41d4-a716-446655440003', current_date, 'the FBI agent watching me google is this a rash needs therapy', ARRAY['snowden', 'anonymous', 'concerned', 'dr_phil'], now() - interval '6 hours'),
  ('550e8400-e29b-41d4-a716-446655440004', current_date, 'rejected fortune cookie says you will die alone surrounded by uneaten takeout', ARRAY['confucius', 'wiseman', 'oracle', 'anonymous'], now() - interval '10 hours'),
  ('550e8400-e29b-41d4-a716-446655440005', current_date, 'spotify wrapped revealed i listened to one sad song four thousand times', ARRAY['musiclover', 'emo_kid', 'depressed', 'anonymous'], now() - interval '18 hours')
ON CONFLICT (chain_id) DO NOTHING;

-- Add some votes to make it interesting
INSERT INTO votes (story_id, voter_fingerprint) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'voter1'),
  ('550e8400-e29b-41d4-a716-446655440001', 'voter2'),
  ('550e8400-e29b-41d4-a716-446655440001', 'voter3'),
  ('550e8400-e29b-41d4-a716-446655440001', 'voter4'),
  ('550e8400-e29b-41d4-a716-446655440001', 'voter5'),
  ('550e8400-e29b-41d4-a716-446655440001', 'voter6'),
  ('550e8400-e29b-41d4-a716-446655440001', 'voter7'),
  ('550e8400-e29b-41d4-a716-446655440001', 'voter8'),

  ('550e8400-e29b-41d4-a716-446655440002', 'voter9'),
  ('550e8400-e29b-41d4-a716-446655440002', 'voter10'),
  ('550e8400-e29b-41d4-a716-446655440002', 'voter11'),

  ('550e8400-e29b-41d4-a716-446655440003', 'voter12'),
  ('550e8400-e29b-41d4-a716-446655440003', 'voter13'),
  ('550e8400-e29b-41d4-a716-446655440003', 'voter14'),
  ('550e8400-e29b-41d4-a716-446655440003', 'voter15'),
  ('550e8400-e29b-41d4-a716-446655440003', 'voter16'),

  ('550e8400-e29b-41d4-a716-446655440004', 'voter17'),
  ('550e8400-e29b-41d4-a716-446655440004', 'voter18'),

  ('550e8400-e29b-41d4-a716-446655440005', 'voter19')
ON CONFLICT DO NOTHING;
