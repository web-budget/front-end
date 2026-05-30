import axios from 'axios'

import { useErrorHandler } from '@/composables/useErrorHandler'

// Endpoints that bootstrap or own the auth flow. They manage their own errors (including 401s),
// so the global handler must stay out of their way to avoid redirect loops on the login screen.
const SELF_HANDLED_URLS = ['auth/me', 'auth/login', 'accounts/']

// Infrastructure problems are never delegated to the calling component.
function isAlwaysGlobal(normalized) {
  return (
    normalized.isNetwork ||
    normalized.status === null ||
    normalized.status === 401 ||
    normalized.status === 403 ||
    normalized.status >= 500
  )
}

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20000,
  withCredentials: true
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const { normalize, handle } = useErrorHandler()

    const normalized = normalize(error)

    // Expose the normalized payload so components/stores can react to it without re-parsing.
    error.normalized = normalized

    const url = error.config?.url ?? ''
    const isSelfHandled = SELF_HANDLED_URLS.some((ignored) => url.includes(ignored))

    if (!isSelfHandled) {
      const handledStatuses = error.config?.handledStatuses ?? []
      const componentOwnsIt =
        !isAlwaysGlobal(normalized) && handledStatuses.includes(normalized.status)

      if (!componentOwnsIt) {
        handle(normalized)
      }
    }

    return Promise.reject(error)
  }
)

export default http
