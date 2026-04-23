# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server (port 8080)
pnpm build      # Production build
pnpm preview    # Preview production build
pnpm lint       # ESLint with auto-fix
```

There are no tests configured in this project.

## Architecture

This is a Vue 3 SPA (webBudget front-end) using Vite, PrimeVue 4, Pinia, Vue Router 4, and Tailwind CSS 4.

### Key Patterns

**Stores** (`src/stores/`) follow a consistent Pinia composition API pattern:
- Each entity (card, wallet, cost-center, etc.) has its own store
- Stores expose: `findAll`, `findOne`, `create`, `update`, `remove`, `loading`, the entity ref, `pageRequest`, `pageResponse`
- All actions accept `onSuccess` / `onError` callbacks

**API calls** are made via `src/composables/useApi.js`, which wraps the Axios instance at `src/utilities/http.js`. The Axios instance handles auth errors globally (401 → redirect to login, 403/404/500 → redirect to error pages).

**Models** (`src/models/`) define reactive form objects and their Yup validation schemas. Forms use PrimeVue's `<Form>` component with the Yup resolver.

**Views** follow a CRUD routing convention per entity:
- `/<section>/<entity>` — list
- `/<section>/<entity>/create` — create form
- `/<section>/<entity>/:id/detail` — detail
- `/<section>/<entity>/:id/update` — edit form
- `/<section>/<entity>/:id/delete` — delete confirmation

**Layouts** (`src/components/layout/`) are set at the route level; different sections (auth, registration, financial, investment, configuration) use different layouts.

**Auth guard** in `src/router/index.js`: all routes are protected by default; mark a route `meta: { public: true }` to bypass.

### Internationalization

All user-facing strings go through `$t('key')` (or `t()` in `<script setup>`). Locale files are at `src/locales/pt_BR.json` and `src/locales/en_US.json`. Number and date formats are configured in `src/locales/index.js`.

### Shared Components

- `ItemsTable` — paginated data table
- `SearchControls` — filter/search bar for list views
- `ActionButtons` — edit/delete action buttons per row
- `PageStructure` — standard page wrapper with title/breadcrumb

### Environment Variables

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Backend base URL |
| `VITE_LOG_REQUESTS` | Enables Axios request logging |
