import { useI18n } from 'vue-i18n'

import { useNotificationHandler } from '@/composables/useNotificationHandler'

export function useHttpErrorHandler() {
  const { displayError, displayWarn } = useNotificationHandler()
  const { t } = useI18n()

  function handleError(response) {
    if (response) {
      const { data, status } = response

      if (status > 500) {
        displayError('errro.500.server-error')
      } else if (status === 422) {
        const errors = data.errors
        errors.map((error) => t(error))
        displayError(errors.join(', '), false)
      } else if (status === 400 || status === 409) {
        displayWarn(data.error)
      }
    }
  }

  return {
    handleError,
  }
}
