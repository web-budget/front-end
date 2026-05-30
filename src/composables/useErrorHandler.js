import i18n from '@/locales'
import router from '@/router'

import { useNotification } from '@/composables/useNotification'
import { useSessionStore } from '@/stores/session.store'

/**
 * Central place to turn an Axios error into a user-facing reaction.
 *
 * The back-end answers every error with Spring's ProblemDetail shape plus two extra properties:
 *   - `code`: a stable identifier of the problem (e.g. `resource-not-found`, `field-validation-failed`)
 *   - `parameters`: optional contextual values used to build a localized message
 *
 * Infrastructure errors (401/403/5xx/network) are always handled here. Business errors (400/409/422)
 * are handled here by default, unless the caller declared it will handle that status itself (see
 * `handledStatuses` in `useApi`).
 */
export function useErrorHandler() {
  const { showWarn, showError } = useNotification()

  /** Build a predictable object out of any Axios error. */
  function normalize(error) {
    if (error?.code === 'ERR_NETWORK') {
      return { status: null, code: null, parameters: null, detail: null, isNetwork: true }
    }

    const response = error?.response
    const data = response?.data ?? {}

    return {
      status: response?.status ?? null,
      code: data.code ?? null,
      parameters: data.parameters ?? null,
      detail: data.detail ?? null,
      isNetwork: false
    }
  }

  /**
   * Apply the global reaction for a normalized error. Returns nothing; side effects are a toast,
   * a navigation or a console log depending on the category.
   */
  function handle(normalized) {
    if (normalized.isNetwork) {
      showError('error.connection-failure.title', 'error.connection-failure.details')
      return
    }

    const { status } = normalized

    if (status >= 500 || status === null) {
      handleServerError(normalized)
      return
    }

    switch (status) {
      case 400:
        handleBadRequest(normalized)
        break
      case 401:
        handleUnauthorized()
        break
      case 403:
        handleForbidden()
        break
      case 404:
        handleNotFound()
        break
      case 409:
        handleConflict(normalized)
        break
      case 422:
        handleUnprocessableEntity()
        break
      default:
        handleUnknown(normalized)
    }
  }

  function handleBadRequest({ code, parameters }) {
    const detail = code
      ? t(`error.bad-request.${code}`, parameters ?? {})
      : t('error.unknown.details')

    // Data integrity violations (e.g. deleting a record still referenced elsewhere) are a hard
    // failure rather than a recoverable validation issue, so they are surfaced as an error.
    if (code === 'data-integrity-violation') {
      showError(t('error.bad-request.title'), detail, false)
    } else {
      showWarn(t('error.bad-request.title'), detail, false)
    }
  }

  function handleConflict({ parameters }) {
    const messages = Object.entries(parameters ?? {}).map(([key, value]) =>
      t(`error.conflict.${key}`, { value })
    )
    showWarn(t('error.conflict.title'), messages.join('\n'), false)
  }

  function handleUnprocessableEntity() {
    showWarn('error.unprocessable-entity.title', 'error.unprocessable-entity.details')
  }

  function handleNotFound() {
    showWarn('error.not-found.detail', 'error.not-found.description')
  }

  function handleUnauthorized() {
    const session = useSessionStore()
    session.clearSession()

    const current = router.currentRoute.value
    if (current.name !== 'login') {
      router.push({ name: 'login', query: { redirect: current.fullPath } })
    }
  }

  function handleForbidden() {
    router.push({ name: '403' })
  }

  function handleServerError(normalized) {
    // Unexpected scenario: log everything we have for debugging, but never surface it to the user.
    console.error('[web-budget] unexpected server error', normalized)
    router.push({ name: '500' })
  }

  function handleUnknown(normalized) {
    console.error('[web-budget] unhandled error', normalized)
    showError('error.unknown.title', 'error.unknown.details')
  }

  function t(text, parameters = {}) {
    return i18n.global.t(text, parameters)
  }

  return {
    normalize,
    handle
  }
}
