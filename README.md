# Posha

**Eat well, the Indian way.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-india--eats.vercel.app-black?style=flat&logo=vercel&logoColor=white)](https://india-eats.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Posha is a diet and nutrition platform built for Indian eating patterns — from regional thalis to pregnancy confinement meals — serving anyone who has ever found generic calorie trackers culturally tone-deaf.

## Live App

**[india-eats.vercel.app](https://india-eats.vercel.app/)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Rupii/posha-indian-diet)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) |
| Auth & Database | Supabase (Postgres + Auth) |
| ORM & Migrations | Prisma |
| Styling | Tailwind CSS |
| Monorepo | Turborepo |
| Deployment | Vercel |

## Monorepo Structure

```
apps/web                   — Next.js 14 frontend
packages/db                — Prisma schema + migrations
packages/nutrition-engine  — Macro calculation, plan generation, swap engine
packages/recipe-search     — Search + filter logic
packages/ui                — Shared React components
data/                      — IFCT ingredient data, seed recipes
```

## Quick Start

```bash
npm install
cp .env.example .env.local
# Fill in Supabase credentials in .env.local
npm run db:push
npm run db:seed
npm run dev
```

## Features

- **Regional meal plans** — South, North, East, and West Indian cuisines with state-level personalisation
- **Dual-unit portions** — Log food in grams or traditional katori measures; the engine converts transparently
- **Intelligent meal swap** — Swap any dish for a nutritionally equivalent alternative within your region and dietary preference
- **Pregnancy trimester tracking** — Macro and micronutrient targets shift automatically across the three trimesters with folate and iron emphasis
- **40-day postpartum confinement** — Dedicated meal plans for the sautela / jaapa period with warming, lactation-supportive foods
- **Condition tracks** — Tailored guidance for PCOS, type-2 diabetes, hypertension, thyroid disorders, and post-surgical recovery
- **Myth-busting** — Evidence-backed clarifications on common Indian food myths (ghee, rice, coconut oil, and more) surfaced contextually in the app

## License

MIT
