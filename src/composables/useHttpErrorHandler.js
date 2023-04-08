import { useMessagingStore } from '@/stores/messaging.store'

import { useI18n } from 'vue-i18n'

export function useHttpErrorHandler() {
  const messagingStore = useMessagingStore()
  const { t } = useI18n()

  function determineSeverity(httpStatus) {
    if (httpStatus >= 400 && httpStatus < 500) {
      return 'warning'
    }
    return 'error'
  }

  function handleError(response) {
    if (response) {
      const { data, status } = response

      const severity = determineSeverity(status)

      if (status > 500) {
        displayToast({
          type: severity,
          content: 'errro.500.server-error',
        })
      } else if (status === 422) {
        const errors = data.errors
        errors.map((error) => t(error))
        displayToast({
          noLocalize: true,
          type: severity,
          content: errors.join(', '),
        })
      } else if (status === 400 || status === 409) {
        displayToast({
          type: severity,
          content: data.error,
        })
      }
    }
  }

  function displayToast(message) {
    messagingStore.handleMessage(message)
  }

  return {
    handleError,
  }
}
