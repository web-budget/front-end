# Project Structure

This document describes how the webBudget front-end source is organized and the
conventions each area follows. It is a Vue 3 SPA built with Vite, PrimeVue 4,
Pinia, Vue Router 4, and Tailwind CSS 4.

## Directory layout

```
src/
├── assets/              # Fonts, layout assets, global styles (tailwind.css, styles.scss)
├── components/
│   ├── common/          # CurrencyDisplay, DateTimeDisplay
│   ├── forms/           # Reusable form widgets (StatusToggle)
│   ├── layout/          # Section layouts, side menu, top bar, footer
│   ├── listing/         # ItemsTable, SearchControls, ActionButtons, StatusBadge
│   ├── ErrorPage.vue    # Shared error-page shell
│   ├── FloatingConfigurator.vue
│   └── PageStructure.vue
├── composables/         # useApi, useNotification, userErrorHandler
├── locales/             # i18n setup + pt_BR / en_US message catalogs
├── models/              # Reactive form objects + Yup schemas; paging models
│   └── registration/    # Entity-specific models (card, wallet, ...)
├── router/              # Route definitions, split per section + auth guard
├── stores/              # Pinia stores, one per entity
│   └── registration/    # Entity stores (card, wallet, cost-center, ...)
├── utilities/
│   ├── http.js          # Axios instance + global response interceptor
│   └── primevue/        # Theme preset + PrimeVue pt-BR localization
└── views/               # Route components, grouped by section
    ├── auth/            # Login, forgot/recover password, account activation
    ├── configuration/
    ├── errors/          # 403, 404, 500, unauthorized pages
    ├── financial/
    ├── investment/
    └── registration/    # cards, wallets, cost-centers, classifications, financial-periods
```

## Key patterns

### Stores (`src/stores/`)

Each entity (card, wallet, cost-center, classification, financial-period) has its
own store written with the Pinia composition API. Stores expose a consistent
surface:

- `findAll`, `findOne`, `create`, `update`, `remove`
- `loading`, the entity ref, `pageRequest`, `pageResponse`
- All actions accept `onSuccess` / `onError` callbacks

### API calls

API calls are made through `src/composables/useApi.js`, which wraps the shared
Axios instance at `src/utilities/http.js`. `useApi({ path })` returns
`{ data, error, loading, get, post, put, patch, del }`, and each verb accepts
`(payload/params, options, onSuccess, onError)`. The Axios instance handles
errors globally — see [security.md](./security.md#http-error-handling).

### Models (`src/models/`)

Models define reactive form objects and their Yup validation schemas. Forms use
PrimeVue's `<Form>` component with the Yup resolver. Paging is modeled by
`page-request.js` and `page-response.js`.

### Views and routing

Views follow a CRUD routing convention per entity:

| Route | Purpose |
|---|---|
| `/<section>/<entity>` | list |
| `/<section>/<entity>/create` | create form |
| `/<section>/<entity>/:id/detail` | detail |
| `/<section>/<entity>/:id/update` | edit form |
| `/<section>/<entity>/:id/delete` | delete confirmation |

Routes are split by section (`registration`, `financial`, `investment`,
`configuration`, `public`) and aggregated in `src/router/index.js`.

### Layouts (`src/components/layout/`)

Layouts are assigned at the route level. Different sections (auth, registration,
financial, investment, configuration) use different layouts (`AuthLayout`,
`RegistrationLayout`, `FinancialLayout`, `InvestmentLayout`,
`ConfigurationLayout`, `HomeLayout`).

### Internationalization

All user-facing strings go through `$t('key')` (or `t()` in `<script setup>`).
Message catalogs live in `src/locales/pt_BR.json` and `src/locales/en_US.json`;
number and date formats are configured in `src/locales/index.js`. PrimeVue's own
labels are localized via `src/utilities/primevue/localization_pt-BR.json`.

### Shared components

- `ItemsTable` — paginated data table
- `SearchControls` — filter/search bar for list views
- `ActionButtons` — edit/delete action buttons per row
- `PageStructure` — standard page wrapper with title/breadcrumb
- `CurrencyDisplay` / `DateTimeDisplay` — locale-aware value formatting
- `StatusBadge` / `StatusToggle` — active/inactive state display and editing
