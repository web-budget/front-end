import i18n from '@/locales'

import { useRouter } from 'vue-router'

import { useNotification } from '@/composables/useNotification'

export function useErrorHandler() {
  const router = useRouter()
  const { showError } = useNotification()

  const handleConflict = (conflicts) => {
    let detail

    if (conflicts) {
      const messages = Object.entries(conflicts).map(([key, value]) => {
        return t(`conflicts.${key}`, { name: value })
      })
      detail = messages.join('\n')
    } else {
      detail = t('errors.conflict.no-specific-detail')
    }
    showError(t('errors.conflict.title'), detail, false)
  }

  const handleBadRequest = (data) => {
    console.error(data) // FIXME show bad request errors
    showError('errors.bad-request.title', '')
  }

  const handleUnprocessableEntity = (data) => {
    console.error(data)
    showError('errors.unprocessable-entity.title', 'errors.unprocessable-entity.detail')
  }

  const handleForbidden = () => {
    router.push({ name: '403' })
  }

  const handleInternalServerError = (data) => {
    console.error(data)
    router.push({ name: '500' })
  }

  function t(text, parameters = {}) {
    return i18n.global.t(text, parameters)
  }

  return {
    handleConflict,
    handleForbidden,
    handleBadRequest,
    handleUnprocessableEntity,
    handleInternalServerError,
  }
}
