// Configuration values with defaults
export const config = {
  wordsPerTurn: parseInt(process.env.WORDS_PER_TURN || '4', 10),
  maxContributors: parseInt(process.env.MAX_CONTRIBUTORS || '4', 10),
  earlyFinishMinTurns: parseInt(process.env.EARLY_FINISH_MIN_TURNS || '3', 10),
  earlyFinishIdleMs: parseInt(process.env.EARLY_FINISH_IDLE_MS || '600000', 10),
  profanityPolicy: process.env.PROFANITY_POLICY || 'mask',
  timezone: process.env.TZ || 'America/New_York',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  cronSecret: process.env.CRON_SECRET || 'dev-secret',
}
