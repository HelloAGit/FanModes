# FanModes — TxLINE Fan Modes

Mobile-first second-screen experience for football fans. Built with Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, and Supabase/Postgres.

## Features
- **Group Sweepstake**: private groups, team assignment, live points and leaderboards.
- **AI Pundit Bot**: detects goals, red cards, odds swings; generates short fan-friendly commentary and market interpretation.
- **Hi-Lo Stats Game**: pre-update higher/lower guesses, streaks, replay across all World Cup matches.
- **TxLINE integration**: guest JWT, API token activation, fixture snapshots, live score & odds streams, Solana-anchored proof validation.

## Quickstart (local)
1. Clone repo
2. Copy `.env.example` → `.env`
3. Install dependencies: `pnpm install`
4. Start local DB (Postgres) or Supabase
5. Run migrations: `pnpm prisma:migrate` (or `psql -f migrations/`)
6. Start worker and bot (see `services/*/README.md`)
7. Start frontend: `pnpm --filter apps/web dev`

See `docs/` for full setup, Vercel and Railway/Render deployment steps.
