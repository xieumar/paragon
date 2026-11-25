# Contributing Guide

Thank you for contributing! Please follow these guidelines.

## Branching Strategy

### Main branches

- **`main`**: production (protected, 2 approvals)
- **`staging`**: pre-production testing (protected, 1 approval)
- **`dev`**: active development (protected)

### Working branches

Create them from `dev`:

- `feature/*`: new features (e.g. `feature/user-authentication`)
- `fix/*`: bug fixes
- `refactor/*`: refactoring
- `docs/*`: documentation
- `hotfix/*`: urgent production fixes (from `main`)

## Development Workflow

```bash
git checkout dev
git pull origin dev
git checkout -b feature/your-feature-name

# make changes, then
git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
```

Husky runs automatically: formatting and lint on staged files plus a type-check
on commit, and a production build on push. Then open a PR from your branch into
`dev` and wait for checks and approval.

## Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>
```

Types: `feat`, `fix`, `refactor`, `style`, `docs`, `test`, `chore`, `perf`,
`ci`.

Examples:

```
feat(auth): implement JWT token refresh
fix: resolve login form validation error
chore: upgrade next.js
```

## Testing Your Changes

Run in `web/` before pushing:

```bash
pnpm format && pnpm lint && pnpm type-check && pnpm build
```

## Code Review Checklist

- [ ] All automated checks pass
- [ ] Code follows project style guidelines
- [ ] No `console.log()` (use `console.warn`/`console.error` if needed)
- [ ] No TypeScript `any` types
- [ ] No ESLint warnings or errors
- [ ] Components are properly typed
- [ ] No hardcoded values (use constants or env variables)
- [ ] Responsive design tested (if UI changes)

## Common Mistakes to Avoid

- Don't commit directly to `main`, `staging`, or `dev`
- Don't use `var`; use `const` or `let`
- Don't ignore TypeScript errors
- Don't commit `.env` files or secrets

## Pull Request Process

1. Update the README/docs if needed.
2. Ensure all checks pass.
3. Required approvals: `dev` ← feature branch: none (checks must pass);
   `staging` ← `dev`: 1; `main` ← `staging`: 2.
4. Delete the branch after merge.

## Reporting Bugs / Suggesting Features

Open an issue with a clear description. For bugs include steps to reproduce,
expected vs. actual behavior, and your environment. For features include the
use case and proposed solution.
