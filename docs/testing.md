# Testing

## Current state

> **There is no automated test suite in this project today.** There is no test
> script in `package.json`, no test runner configured, and no test files in
> `src/`. The `.gitignore` references `coverage/` and `cypress/` directories,
> but neither tooling is currently installed or wired up.

This is a known gap and a **future improvement**, documented here so the intended
direction is clear when tests are added.

## Recommended testing structure (future)

The recommendations below match the project's existing tooling (Vite + Vue 3)
and are the conventional choices for this stack.

### Unit & component tests — Vitest + Vue Test Utils

- **Vitest** integrates directly with the existing Vite config, so the `@` alias
  and plugins work without extra setup.
- **Vue Test Utils** (`@vue/test-utils`) for mounting and asserting on
  components.
- Suggested layout: colocate `*.spec.js` files next to the unit under test, or
  mirror `src/` under a top-level `tests/` directory.
- High-value first targets:
  - Composables — `useApi`, `userErrorHandler`, `useNotification` (pure logic,
    easy to mock Axios).
  - Pinia stores — the `findAll/findOne/create/update/remove` flows and their
    `onSuccess`/`onError` callbacks.
  - Yup model schemas in `src/models/` — validation rules per entity.
- Add a script such as `"test": "vitest"` (and `"test:coverage": "vitest run
  --coverage"`) when introduced.

### End-to-end tests — Playwright

- **Playwright** for browser-level flows (login, CRUD per entity, route-guard
  redirects).
- Cover the auth happy path and the public/protected route behavior described in
  [security.md](./security.md#route-protection).

## Other hardening worth tracking

- Resolve the `401` interceptor `TODO` in `src/utilities/http.js` (currently a
  no-op) and add a test that asserts an expired session redirects to login.
- Pin the Node.js runtime — there is no `engines` field or `.nvmrc`; add one when
  CI is introduced so local and CI environments match.
