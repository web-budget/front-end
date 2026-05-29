# Security & Auth

This document describes authentication, route protection, and how the front-end
reacts to backend errors. The application is a browser SPA; all real
authorization is enforced by the backend — the front-end controls are for UX and
defense in depth only.

## Authentication

Authentication is **cookie/session based**. The Axios instance
(`src/utilities/http.js`) is created with `withCredentials: true`, so the
session cookie set by the backend is sent on every request.

The login flow lives in `src/stores/session.store.js`:

1. `login(credentials)` issues `POST auth/login` with an
   `Authorization: Basic <base64(username:password)>` header; the backend
   responds by setting the session cookie.
2. On success it calls `fetchUserInfo()` (`GET auth/me`) to load the current
   user and marks the session valid.
3. `logout()` calls `POST auth/logout`, clears local user state, and redirects
   to the login route regardless of the request outcome.
4. `isSessionValid()` returns the cached validity, or falls back to
   `auth/me` when the state is unknown (e.g. after a page reload).

Credentials are never persisted client-side; only the derived `user` (name,
email) and a `sessionValid` flag are kept in the Pinia store.

## Route protection

The global guard in `src/router/index.js` protects **all routes by default**:

```js
router.beforeEach((to, from, next) => {
  const { isSessionValid } = useSessionStore()
  const isPublicRoute = to.matched.some((route) => route.meta.public)
  if (!isPublicRoute && !isSessionValid()) {
    next({ name: 'login', query: { redirect: to.path } })
    return
  }
  next()
})
```

To make a route reachable without a session, mark it `meta: { public: true }`
(see `src/router/public.routes.js`).

## HTTP error handling

The response interceptor in `src/utilities/http.js` maps backend errors to
either a toast notification (`useNotification`) or a redirect to an error page
(`userErrorHandler`). Requests whose URL includes `auth/me` or `accounts/` are
**ignored** by the interceptor and rejected so the caller can handle them.

| Status | Behavior |
|---|---|
| `400` Bad Request | Warn toast with the localized backend message |
| `409` Conflict | Warn toast listing the conflicting fields |
| `422` Unprocessable Entity | Warn toast |
| `401` Unauthorized | **No-op** (`TODO`: should log out / redirect to login) |
| `403` Forbidden | Redirect to the `403` page |
| `500` Server Error | Redirect to the `500` page |
| other / unknown | Generic error toast |
| network failure (`ERR_NETWORK`) | Connection-failure toast |

> **Known gap:** `401` is currently a no-op (an explicit `TODO` in the code), so
> an expired session is not actively handled at the interceptor level — the
> route guard catches it on the next navigation instead. There is no dedicated
> `404` branch. See [testing.md](./testing.md) for related hardening work.

## Secrets & configuration

No secrets are stored in the repository. The committed `.env.development` and
`.env.production` files contain only the backend base URL and a request-logging
flag — see [development.md](./development.md#environment-variables). Real
deployments should provide `VITE_API_URL` via the deployment environment rather
than relying on the checked-in defaults.
