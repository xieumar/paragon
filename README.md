# Paragon

> Next.js frontend backed by a Sanity Studio and content lake.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Git Hooks](#git-hooks)
- [Contributing](#contributing)

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **CMS:** Sanity (standalone Studio, `next-sanity` in the app)
- **Code quality:** ESLint, Prettier
- **Git hooks:** Husky, lint-staged

## Project Structure

```
.
├── web/             # Next.js app (localhost:3000)
├── studio/          # Sanity Studio, standalone (localhost:3333)
├── .agents/         # Agent skills (sanity-best-practices)
├── .husky/          # Git hooks
├── .github/         # PR template
├── skills-lock.json # Pinned agent skill versions
└── package.json     # Root tooling (Husky, lint-staged)
```

## Getting Started

### Prerequisites

- Node.js 22.12 or higher
- pnpm 11

### Installation

```bash
# Root: installs Husky and lint-staged, and activates git hooks
pnpm install

# Web app
cd web && pnpm install

# Studio
cd ../studio && pnpm install
```

### Run

```bash
# Terminal 1 - Next.js at http://localhost:3000
cd web && pnpm dev

# Terminal 2 - Sanity Studio at http://localhost:3333
cd studio && pnpm dev
```

Both origins must be in the Sanity project's CORS list
(`npx sanity cors add http://localhost:3000 --credentials`).

## Environment Variables

Create `web/.env.local`:

| Variable                        | Description                                           |
| ------------------------------- | ----------------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID (`yqc9zm5m`)                        |
| `NEXT_PUBLIC_SANITY_DATASET`    | Dataset (`production`)                                |
| `SANITY_API_READ_TOKEN`         | Optional, server-only. Needed for drafts/Visual Edit. |

Never commit `.env*` files or tokens.

## Available Scripts

Run in `web/`:

| Script              | Description                     |
| ------------------- | ------------------------------- |
| `pnpm dev`          | Start development server        |
| `pnpm build`        | Build for production            |
| `pnpm start`        | Start production server         |
| `pnpm lint`         | Run ESLint                      |
| `pnpm lint:fix`     | Fix ESLint errors automatically |
| `pnpm format`       | Format code with Prettier       |
| `pnpm format:check` | Check formatting                |
| `pnpm type-check`   | Run TypeScript type checking    |

Run in `studio/`: `pnpm dev`, `pnpm build`, `pnpm deploy`.

## Git Hooks

- **pre-commit:** blocks commits on `main`/`dev`, formats and lints staged
  `web/` files, then type-checks `web`.
- **pre-push:** blocks pushes from `main`/`dev`, then builds `web`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
