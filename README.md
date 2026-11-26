# Paragon

Corporate website for Paragon, a professional services firm. A Next.js site
(`web/`) renders content that editors manage in a standalone Sanity Studio
(`studio/`).

- **Website:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Motion
- **CMS:** Sanity (project `yqc9zm5m`, dataset `production`)
- **Hosting:** website on Vercel; Studio on sanity.studio

## Contents

- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Content model](#content-model)
- [How the website reads content](#how-the-website-reads-content)
- [Deployment](#deployment)
- [Git workflow and hooks](#git-workflow-and-hooks)
- [Troubleshooting](#troubleshooting)

## Project structure

```
.
├── web/                    Next.js website (localhost:3000)
│   └── src/
│       ├── @types/         Global TypeScript declarations (no import needed)
│       ├── app/            Routes: /, /about, /services, /services/[slug], /contact
│       ├── components/
│       │   ├── layout/     Header, footer, navigation, containers
│       │   ├── sections/   Page sections (hero, FAQ, testimonials, ...)
│       │   ├── forms/      Enquiry form
│       │   ├── motion/     Animation wrappers (reveal, stagger, count-up, ...)
│       │   └── ui/         shadcn/ui and small primitives
│       ├── lib/            Helpers: `cn`, SEO, form validation, server-only code
│       └── sanity/         Client, image helpers, GROQ queries
├── studio/                 Sanity Studio (localhost:3333)
│   ├── schemaTypes/        documents/ (pages, collections), blocks/ (reusable), objects/
│   ├── scripts/            Maintenance scripts (see Troubleshooting)
│   └── structure.ts        Studio sidebar
├── .husky/                 Git hooks
└── package.json            Root tooling (Husky, lint-staged)
```

Each folder in `web/src` exposes an `index.ts`; import from the folder
(`@/components/ui`), not from files inside it. Client components are the
exception: they import exact files so server-only code isn't bundled for the
browser.

## Getting started

### Prerequisites

- Node.js 22.12 or newer
- pnpm 11 (`corepack enable` picks up the pinned version)
- Access to the Sanity project (ask an admin to invite you)

### Install

```bash
pnpm install              # root: Git hooks
pnpm --dir web install    # website
pnpm --dir studio install # Studio
```

### Configure

```bash
cp web/.env.example web/.env.local
```

Fill in the values (see [Environment variables](#environment-variables)).

### Run

In two terminals:

```bash
cd web && pnpm dev        # http://localhost:3000
cd studio && pnpm dev     # http://localhost:3333
```

## Environment variables

Set in `web/.env.local` locally and in the Vercel project settings for
deployments. `web/.env.example` lists them all.

| Variable                        | Required | Notes                                                             |
| ------------------------------- | -------- | ----------------------------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes      | `yqc9zm5m`                                                        |
| `NEXT_PUBLIC_SANITY_DATASET`    | Yes      | `production`                                                      |
| `NEXT_PUBLIC_SITE_URL`          | Yes      | Public site address, used for canonical links and social previews |
| `SANITY_API_WRITE_TOKEN`        | Yes      | Server-only. Lets the contact form store enquiries. Editor role.  |
| `SANITY_API_READ_TOKEN`         | No       | Server-only. Only needed for draft previews. Viewer role.         |

Create tokens at **sanity.io/manage → project → API → Tokens**. Never commit
them, never prefix them with `NEXT_PUBLIC_`, and never paste them into chat or
issues.

## Scripts

### `web/`

| Script              | What it does                |
| ------------------- | --------------------------- |
| `pnpm dev`          | Development server          |
| `pnpm build`        | Production build            |
| `pnpm start`        | Run the production build    |
| `pnpm lint`         | ESLint                      |
| `pnpm lint:fix`     | ESLint with automatic fixes |
| `pnpm format`       | Format with Prettier        |
| `pnpm format:check` | Check formatting            |
| `pnpm type-check`   | TypeScript check            |

### `studio/`

| Script                | What it does                                                         |
| --------------------- | -------------------------------------------------------------------- |
| `pnpm dev`            | Studio development server                                            |
| `pnpm build`          | Build the Studio                                                     |
| `pnpm deploy`         | Deploy the Studio to sanity.studio                                   |
| `pnpm typegen`        | Regenerate TypeScript types for the website from schemas and queries |
| `pnpm singletons:fix` | Repair duplicate singleton pages (see Troubleshooting)               |

Run `pnpm typegen` after any schema or GROQ query change, and commit the
updated `web/sanity.types.ts` with it.

## Content model

All content lives in Sanity and is edited in the Studio.

**Pages** (one each, pinned at the top of the sidebar): Site settings, Home
page, About page, Services page, Contact page. Always open them from the
sidebar.

**Reusable blocks** (sidebar → Reusable blocks): FAQ sets, Logo banners, Stats,
Calls to action, Testimonial sliders. Create a block once and pick it on any
page; editing a block updates every page that uses it. Leaving a block field
empty on a page hides that section.

**Collections:** Services, Team members, Testimonials.

**Enquiries** (sidebar → Enquiries): created by the website's contact form.
Submitted details are read-only; update the status (New, Read, Replied) as you
handle them. There are no email notifications, so check the New list regularly.

Which sections appear on a page, and in what order, is set in the page's code
in `web/src/app/`; the Studio controls the content of each section.

## How the website reads content

- Queries live in `web/src/sanity/queries/`, one file per page or topic.
- Every query goes through `cachedSanity({ query, params, perspective: "published", stega: false })`
  from `web/src/sanity/lib/live.ts`. The site uses Next.js Cache Components,
  so fetching must happen inside that shared `"use cache"` wrapper.
- `<SanityLive />` in the root layout refreshes pages when content is
  published.
- Images are resized by Sanity's image CDN through a custom `next/image`
  loader (`web/src/sanity/imageLoader.ts`).
- The contact form posts to a Server Action (`web/src/app/contact/actions.ts`)
  that validates input, filters spam (honeypot, fill time, rate limit) and
  stores an `enquiry` document using the write token.

## Deployment

### Website (Vercel)

1. Import the repository in Vercel.
2. Set **Root Directory** to `web`. The framework preset is Next.js.
3. Add the [environment variables](#environment-variables), plus
   `ENABLE_EXPERIMENTAL_COREPACK=1` so Vercel uses the pinned pnpm version.
4. Use Node.js 22.x or newer (Settings → General).
5. Allow the site's URL in Sanity's CORS list (run in `studio/`):

   ```bash
   npx sanity cors add https://your-site.vercel.app --credentials
   ```

Pushes to `main` deploy to production; other branches get preview URLs.

### Studio (sanity.studio)

```bash
cd studio
pnpm deploy
```

The hosted Studio's app ID is saved in `studio/sanity.cli.ts`. Redeploy after
any schema change so editors see it.

## Git workflow and hooks

- Branch from `dev` (`feature/…`, `fix/…`) and open pull requests into `dev`.
  See [CONTRIBUTING.md](CONTRIBUTING.md).
- **pre-commit:** blocks commits on `main` and `dev`, formats and lints staged
  files in `web/`, and type-checks `web/`.
- **pre-push:** blocks pushes from `main` and `dev`, and runs a production
  build of `web/`.
- Commit messages follow Conventional Commits.

## Troubleshooting

**Sanity requests time out** (`fetch failed`, `UND_ERR_CONNECT_TIMEOUT`, a
failing build or CLI command). Retry first. If it keeps happening, Node may be
trying an IPv6 route that doesn't work on your network:

```bash
export NODE_OPTIONS="--dns-result-order=ipv4first --network-family-autoselection-attempt-timeout=1000"
```

**Dev server shows old code or styles.** Stop it, then:

```bash
cd web && rm -rf .next && pnpm dev
```

Don't run `pnpm build` while `pnpm dev` is running; they share `.next`. If
Turbopack keeps serving stale modules, use `pnpm exec next dev --webpack`.

**Port already in use** (`3000` or `3333`). Another server is still running:

```bash
taskkill //F //PID $(netstat -ano | grep ':3333' | grep LISTENING | awk '{print $5}' | head -1)
```

**A page looks empty in the Studio or edits don't show on the site.** A
duplicate copy of a singleton page was probably edited. Run
`pnpm singletons:fix` in `studio/`, then reload the Studio. Wrong copies are
read-only, so this can't happen silently.

**Content shows in the Studio but not on the website.** Check it is published.
Never create documents with a `.` in their ID: Sanity treats those as private,
so the public website can't read them.

**`git status` lists many modified files.** That's Windows line endings;
`git diff --numstat` shows the real changes. Stage explicit paths.
