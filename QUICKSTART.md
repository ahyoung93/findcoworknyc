# quick start

get baton running locally in 5 minutes.

## 1. clone and install

```bash
cd baton
npm install
```

## 2. set up supabase

1. create project at [supabase.com](https://supabase.com)
2. go to SQL Editor
3. paste contents of `supabase/migrations/001_initial_schema.sql`
4. run it
5. grab your keys from Settings → API

## 3. set up resend

1. sign up at [resend.com](https://resend.com)
2. for local dev, you can use their test domain
3. grab your API key

## 4. configure env

```bash
cp .env.example .env
```

edit `.env`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

# from supabase settings → API
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# from resend dashboard
RESEND_API_KEY=re_...

# generate any random string
CRON_SECRET=dev-secret-12345
```

## 5. run

```bash
npm run dev
```

visit http://localhost:3000

## test the flow

1. click "start a chain"
2. write 4 words
3. copy the baton link
4. open in incognito/private window
5. add 4 more words
6. repeat until chain is full (4 contributors)
7. click "finish & notify"
8. check the story page

## next steps

- see DEPLOYMENT.md for production setup
- see CONTRIBUTING.md for development guidelines
- modify prompts in the migration file
- adjust config in `.env`

## troubleshooting

**can't connect to supabase?**
- double-check your URL and keys
- make sure migration ran successfully

**emails not working?**
- verify resend API key
- for local dev, check resend logs (emails might go to test inbox)

**OG images not showing?**
- they only work in production on vercel
- locally you'll see fallback errors (this is expected)

that's it. you're running.
