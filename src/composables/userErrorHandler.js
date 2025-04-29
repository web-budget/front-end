import i18n from '@/locales'

import { useNotification } from '@/composables/useNotification'

export function useErrorHandler() {
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
    console.log(data) // FIXME show bad request errors
    showError('errors.bad-request.title', '')
  }

  const handleUnprocessableEntity = (violations) => {
    console.log(violations) // FIXME show validation errors
    showError('errors.unprocessable-entity.title', '')
  }

  function t(text, parameters = {}) {
    return i18n.global.t(text, parameters)
  }

  return {
    handleConflict,
    handleBadRequest,
    handleUnprocessableEntity,
  }
}
