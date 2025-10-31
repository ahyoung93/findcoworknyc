# deployment guide

## prerequisites

1. **supabase project**
   - create a project at [supabase.com](https://supabase.com)
   - save your project URL and anon key
   - save your service role key (keep this secret!)

2. **resend account**
   - sign up at [resend.com](https://resend.com)
   - verify your domain (or use their test domain for development)
   - get your API key

3. **vercel account** (or any Next.js host)
   - sign up at [vercel.com](https://vercel.com)

## setup steps

### 1. database migration

1. go to your supabase dashboard
2. navigate to SQL Editor
3. copy the contents of `supabase/migrations/001_initial_schema.sql`
4. paste and run in SQL Editor
5. verify tables are created

### 2. environment variables

create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

fill in these values:

```env
# App
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Resend
RESEND_API_KEY=re_...

# Cron secret (generate a random string)
CRON_SECRET=your-random-secret-here

# Configuration (defaults shown)
WORDS_PER_TURN=4
MAX_CONTRIBUTORS=4
EARLY_FINISH_MIN_TURNS=3
EARLY_FINISH_IDLE_MS=600000
PROFANITY_POLICY=mask
TZ=America/New_York
```

### 3. local development

```bash
npm install
npm run dev
```

visit http://localhost:3000

### 4. deploy to vercel

#### option 1: github integration (recommended)

1. push your code to github
2. import repo in vercel dashboard
3. add all environment variables from `.env`
4. deploy

#### option 2: vercel CLI

```bash
npm i -g vercel
vercel
```

follow prompts and add environment variables when asked.

### 5. set up cron job

the daily reset cron is configured in `vercel.json` to run at midnight UTC.

to adjust for America/New_York (midnight ET):
- midnight ET is 5am UTC (during DST) or 5am UTC (standard time)
- update `vercel.json` schedule to: `"0 5 * * *"`

or, vercel will automatically run the cron based on the schedule.

**important**: in vercel dashboard, add the `CRON_SECRET` env variable to protect your endpoint.

### 6. configure resend email domain

1. in resend dashboard, add your domain
2. add DNS records they provide
3. verify domain
4. update `src/lib/email.ts` line 31:
   ```ts
   from: 'baton <no-reply@yourdomain.com>'
   ```

### 7. test the app

1. visit your deployed URL
2. start a chain
3. share the link (open in incognito/different browser)
4. add entries
5. finish the chain
6. check email notifications
7. test voting and feed

## monitoring

- check vercel logs for errors
- monitor supabase database in dashboard
- check resend dashboard for email delivery status

## scaling considerations

- supabase free tier: 500MB database, 2GB bandwidth
- resend free tier: 100 emails/day, 3,000/month
- vercel free tier: generous for hobby projects

for production:
- upgrade supabase to pro ($25/mo)
- upgrade resend to pro ($20/mo)
- vercel scales automatically

## security

- never commit `.env` to git (already in `.gitignore`)
- rotate your `CRON_SECRET` periodically
- keep `SUPABASE_SERVICE_ROLE_KEY` secret
- enable Supabase RLS policies for production (optional but recommended)

## troubleshooting

**emails not sending?**
- check resend API key
- verify domain in resend
- check vercel logs for errors

**cron not running?**
- verify `CRON_SECRET` matches in vercel env vars
- check vercel logs → cron jobs
- test manually: `curl https://yourdomain.com/api/cron/daily-reset -H "Authorization: Bearer YOUR_CRON_SECRET"`

**database errors?**
- verify migration ran successfully
- check supabase logs
- ensure service role key is correct

**images not generating?**
- @vercel/og only works on vercel edge runtime
- test OG routes: `/api/og/square?chain=YOUR_CHAIN_ID`
