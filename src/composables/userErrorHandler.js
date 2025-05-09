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
        return t(`conflict.${key}`, { value: value })
      })
      detail = messages.join('\n')
    } else {
      detail = t('error.conflict.no-specific-detail')
    }

    showError(t('error.conflict.title'), detail, false)
  }

  const handleBadRequest = (data) => {
    let detail

    if (data.code) {
      detail = t(data.code)
    } else {
      detail = data.message
    }

    showError(t('error.bad-request.title'), detail, false)
  }

  const handleUnprocessableEntity = (data) => {
    console.error(data)
    showError('error.unprocessable-entity.title', 'error.unprocessable-entity.detail')
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
