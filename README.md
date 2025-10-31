# baton

a 4×4 pass-it-on sentence game. mobile-first.

## what it does

- 4 people write 4 words each
- daily chaos prompt resets at midnight ET
- no login required
- share to instagram in one tap
- democracy, but for nonsense

## setup

1. **install dependencies**
   ```bash
   npm install
   ```

2. **set up supabase**
   - create a new project at [supabase.com](https://supabase.com)
   - copy `.env.example` to `.env` and fill in your keys
   - run the migration in SQL Editor: `supabase/migrations/001_initial_schema.sql`

3. **set up resend**
   - get an API key at [resend.com](https://resend.com)
   - add to `.env`

4. **run locally**
   ```bash
   npm run dev
   ```

## deploy to vercel

1. connect your repo
2. add environment variables from `.env.example`
3. set up cron job:
   - go to project settings → cron jobs
   - add job: `0 0 * * *` → `/api/cron/daily-reset`
   - set `CRON_SECRET` env var

## structure

```
src/
├── app/
│   ├── api/          # API routes
│   ├── c/[id]/       # chain write page
│   ├── s/[id]/       # story share page
│   ├── explore/      # feed explorer
│   └── page.tsx      # home
├── components/       # react components
├── lib/             # utilities
└── types/           # typescript types
```

## tone

lowercase. minimal. deadpan. sounds like a friend sending you a meme at 2am.

examples:
- "locked in. pass it to someone equally chaotic."
- "you're finishing the thing. no pressure."
- "it's done. somehow."

## tech

- next.js 14 (app router)
- typescript
- tailwind css
- supabase postgres
- @vercel/og for images
- resend for email
