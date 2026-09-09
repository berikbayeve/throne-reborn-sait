# Throne Reborn Sait

Static site built with Vite (vanilla JS), deployed to GitHub Pages.

## Commands

- `npm run dev` — local dev server with live reload
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint
- `npm run format` — Prettier, writes changes
- `npm run format:check` — Prettier, check only (used in CI)

## Workflow

- Work happens on feature branches, merged into `main` via pull request.
- CI (`.github/workflows/ci.yml`) runs lint, format check, and build on every PR.
- Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `dist/` to GitHub Pages automatically.

## Notes

- `vite.config.js` sets `base: '/throne-reborn-sait/'` to match the GitHub Pages project URL. If the repo is ever renamed, update this to match.
