import { useI18n } from 'vue-i18n'
import { useMessagingStore } from '@/stores/messaging.store'

export function useHttpErrorHandler() {
  const { t } = useI18n()
  const messagingStore = useMessagingStore()

  function determineSeverity(httpStatus) {
    if (httpStatus >= 400 && httpStatus < 500) {
      return 'warning'
    }
    return 'error'
  }

  function handleError(response) {
    const {
      data,
      status
    } = response

    const severity = determineSeverity(status)
    const dataIsString = typeof data === 'string' || data instanceof String

    if (dataIsString && data.includes('ECONNREFUSED')) {
      displayToast(t('messages.500.server-unavailable'), severity)
    } else if (status > 500) {
      displayToast(t('messages.500.server-error'), severity)
    } else if (status === 422 || status === 409) {
      displayToast(t(data.message), severity)
    }
  }

  function displayToast(content, severity) {
    messagingStore.handleMessage({
      type: severity,
      content: content
    })
  }

  return {
    handleError
  }
}
