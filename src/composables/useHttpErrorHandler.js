import { useI18n } from 'vue-i18n'
import { useMessagingStore } from '@/stores/messaging-store'

export function useHttpErrorHandler() {
  const { t } = useI18n()
  const messagingStore = useMessagingStore()

  function filterMessage(responseData) {
    if ((typeof responseData === 'string' || responseData instanceof String) && responseData.includes('ECONNREFUSED')) {
      return t('messages.500.server-unavailable')
    }
    return t(responseData.message)
  }

  function determineSeverity(httpStatus) {
    if (httpStatus >= 400 && httpStatus < 500) {
      return 'warning'
    }
    return 'error'
  }

  function handleError(response) {
    const { data, status } = response

    const message = {
      type: determineSeverity(status),
      content: filterMessage(data)
    }

    messagingStore.handleMessage(message)
  }

  return {
    handleError
  }
}
