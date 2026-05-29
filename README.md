# webBudget front-end

The front-end application for the webBudget project — a Vue 3 single-page
application for managing budgets, wallets, cards, cost centers, and financial
periods.

## Toolchain

| Concern | Tool |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Build tool / dev server | Vite 7 |
| Package manager | **pnpm** (pinned to `9.15.4`) |
| UI library | PrimeVue 4 (Sakai-based theme) + PrimeIcons |
| Styling | Tailwind CSS 4 + Sass |
| State management | Pinia 3 |
| Routing | Vue Router 4 |
| Internationalization | vue-i18n 11 (pt-BR / en-US) |
| Form validation | Yup 1 |
| Charts | Chart.js 4 |
| Linting / formatting | ESLint 9 + Prettier 3 |

## Prerequisites

Before working on this project you should have:

- **Node.js** — a current LTS release (Node 20+ recommended). The repository
  does not yet pin a version; until it does, use the latest LTS.
- **pnpm** — this project is pinned to pnpm and should not be installed with
  npm or yarn. Enable it via Corepack (bundled with Node):

  ```bash
  corepack enable
  corepack prepare pnpm@9.15.4 --activate
  ```

  Verify with `pnpm --version`.

## Project setup

```bash
git clone <repository-url>
cd front-end
pnpm install     # install dependencies
pnpm dev         # start the dev server on http://localhost:8080
```

The dev server expects the backend at the URL in `.env.development`
(`VITE_API_URL`, default `http://localhost:8085`).

### Available scripts

```bash
pnpm dev        # start dev server (port 8080)
pnpm build      # production build (outputs to dist/)
pnpm preview    # preview the production build locally
pnpm lint       # run ESLint with auto-fix
```

## Developing with WebStorm (JetBrains)

WebStorm ships with bundled Vue, ESLint, and Prettier support — no extra
plugins are required. After opening the project:

1. **Package manager** — Settings → *Languages & Frameworks* → *Node.js*, set
   the package manager to **pnpm**.
2. **ESLint** — Settings → *Languages & Frameworks* → *JavaScript* → *Code
   Quality Tools* → *ESLint*: choose **Automatic ESLint configuration** and
   enable *Run eslint --fix on save*.
3. **Prettier** — Settings → *Languages & Frameworks* → *JavaScript* →
   *Prettier*: point it at the project's `prettier` package, enable *On save*
   and *On code reformatting*, and apply it to `{**/*,*}.{js,mjs,cjs,jsx,vue}`.
4. **Path alias** — the `@` → `src` alias is read from `jsconfig.json` and
   resolved automatically.
5. **EditorConfig** — keep EditorConfig support enabled so the project's
   indentation and charset settings apply.

> WebStorm IDE files live in `.idea/` and are git-ignored, so a fresh clone
> starts without them — apply the settings above once per machine.

## Documentation

Architecture and contributor details live in [`docs/`](./docs) and
[`CLAUDE.md`](./CLAUDE.md):

- [docs/project-structure.md](./docs/project-structure.md) — source layout and
  patterns.
- [docs/development.md](./docs/development.md) — build/dev configuration and
  environment variables.
- [docs/security.md](./docs/security.md) — authentication and error handling.
- [docs/testing.md](./docs/testing.md) — current testing gap and the planned
  approach.

## Roadmap notes

- **No automated tests yet.** There is no test runner configured; adding Vitest
  + Vue Test Utils (unit/component) and Playwright (E2E) is a planned
  improvement — see [docs/testing.md](./docs/testing.md).
- **Node version is unpinned.** Adding an `engines` field / `.nvmrc` is
  recommended so local and CI environments stay aligned.
