# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Overview

webBudget front-end — a Vue 3 SPA built with Vite, PrimeVue 4, Pinia, Vue
Router 4, and Tailwind CSS 4. Code uses the Composition API with `<script
setup>`.

## Commands

```bash
pnpm dev        # Dev server on http://localhost:8080
pnpm build      # Production build
pnpm preview    # Preview the production build
pnpm lint       # ESLint with auto-fix
```

Use **pnpm** (pinned via `packageManager`), not npm/yarn. There is **no test
suite** — see [docs/testing.md](./docs/testing.md).

## Conventions to follow

- **Stores** (`src/stores/`): one Pinia composition-API store per entity,
  exposing `findAll`, `findOne`, `create`, `update`, `remove`, `loading`, the
  entity ref, `pageRequest`, `pageResponse`. Actions take `onSuccess`/`onError`
  callbacks.
- **API calls** go through `useApi({ path })` (`src/composables/useApi.js`),
  which wraps the Axios instance in `src/utilities/http.js`. Errors are handled
  globally there.
- **Models** (`src/models/`): reactive form objects + Yup schemas, consumed by
  PrimeVue's `<Form>` with the Yup resolver.
- **Views** use a CRUD route convention per entity (`list` / `create` /
  `:id/detail` / `:id/update` / `:id/delete`), split by section in
  `src/router/`.
- **Layouts** (`src/components/layout/`) are set at the route level, one per
  section.
- **i18n**: all user-facing strings via `$t('key')` / `t()`; catalogs in
  `src/locales/{pt_BR,en_US}.json`.
- **PrimeVue components are auto-imported** (via `unplugin-vue-components`) — do
  not import them manually.
- **Routes are protected by default**; add `meta: { public: true }` to bypass
  the auth guard.

## Detailed docs

- [docs/project-structure.md](./docs/project-structure.md) — directory layout,
  patterns, and shared components.
- [docs/development.md](./docs/development.md) — toolchain, Vite config,
  environment variables, code style.
- [docs/security.md](./docs/security.md) — auth flow, route guard, and HTTP
  error handling.
- [docs/testing.md](./docs/testing.md) — testing gap and the recommended future
  setup.
