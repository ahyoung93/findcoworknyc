# contributing

## tone & voice

the most important thing: **keep it lowercase, minimal, and deadpan.**

### examples of good copy
- "locked in. pass it to someone equally chaotic."
- "you're finishing the thing. no pressure."
- "it's done. somehow."
- "democracy, but for nonsense."
- "saved — open instagram and post from recents."

### examples of bad copy
- ❌ "Amazing! Your contribution has been added!"
- ❌ "Join our creative community!"
- ❌ "Share your masterpiece with the world!"

### rules
1. lowercase everything (except proper nouns, brand names if needed)
2. no exclamation marks
3. max 2 sentences
4. self-aware, dry humor
5. never use: "creative", "community", "amazing", "awesome", "incredible"
6. sound like a friend texting at 2am

## code style

- use typescript strictly
- prefer functional components
- keep components small and focused
- name files with PascalCase for components, kebab-case for utilities
- export types from `src/types/index.ts`

## adding features

1. check if it fits the vibe (minimal, essential)
2. open an issue first for discussion
3. keep PRs focused on one thing
4. update README if adding configuration
5. test locally before submitting

## what we're looking for

- bug fixes
- performance improvements
- better mobile experience
- accessibility improvements
- more prompt ideas (in migration file)
- UI polish (but keep it minimal)

## what we're NOT looking for

- user accounts/auth (this is anonymous by design)
- complex features (comments, replies, threads, etc.)
- gamification beyond simple upvotes
- anything that breaks the minimal vibe

## submitting

1. fork the repo
2. create a branch: `git checkout -b fix/your-fix`
3. commit: `git commit -m "fix: describe what you fixed"`
4. push: `git push origin fix/your-fix`
5. open a pull request

keep commit messages lowercase and descriptive.

## testing locally

```bash
npm install
npm run dev
```

make sure you have `.env` configured (see DEPLOYMENT.md)

## questions?

open an issue. keep it casual.
