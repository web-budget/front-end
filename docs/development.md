# Development & Build

## Toolchain

| Concern | Tool |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Build tool / dev server | Vite 7 |
| Package manager | **pnpm** (pinned to `pnpm@9.15.4` via `packageManager`) |
| UI library | PrimeVue 4 (+ `@primevue/forms`, PrimeIcons) |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) + Sass |
| State management | Pinia 3 |
| Routing | Vue Router 4 |
| i18n | vue-i18n 11 |
| Validation | Yup 1 |
| Charts | Chart.js 4 |
| Linting / formatting | ESLint 9 (flat config) + Prettier 3 |

## Commands

Run with pnpm:

```bash
pnpm install    # Install dependencies
pnpm dev        # Start the dev server on http://localhost:8080
pnpm build      # Production build (outputs to dist/)
pnpm preview    # Serve the production build locally
pnpm lint       # ESLint with --fix over .vue/.js/.jsx/.cjs/.mjs
```

There is currently no test script — see [testing.md](./testing.md).

## Vite configuration

`vite.config.mjs` configures:

- Dev server **port 8080** (`server.port`).
- The `@` alias → `./src`.
- `@vitejs/plugin-vue`, `@tailwindcss/vite`, and
  `unplugin-vue-components` with the `PrimeVueResolver` (PrimeVue components are
  auto-imported; do not import them manually).
- `optimizeDeps` with `noDiscovery: true` and `include: ['yup']`.

> The `unplugin-vue-components` plugin generates `components.d.ts` at the project
> root; it is git-ignored and should not be edited or committed.

## Environment variables

Vite loads variables from `.env.<mode>` files. Both files are committed and
contain non-secret defaults; only `VITE_`-prefixed variables are exposed to the
client.

| Variable | Purpose | dev default | prod default |
|---|---|---|---|
| `VITE_API_URL` | Backend base URL used by the Axios instance | `http://localhost:8085` | `http://localhost:8080` |
| `VITE_LOG_REQUESTS` | Enables Axios request logging | `true` | `false` |

For real deployments, override `VITE_API_URL` through the deployment environment
rather than editing the committed file.

## Code style

Formatting is enforced by Prettier (`.prettierrc.json`): 2-space indentation, no
semicolons, single quotes, no trailing commas, 100-character print width.
`.editorconfig` mirrors the indentation and charset settings. ESLint uses the
flat config in `eslint.config.js` (`@eslint/js` recommended +
`eslint-plugin-vue` essential + Prettier integration).
