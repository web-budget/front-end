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

    let content

    if ((typeof data === 'string' || data instanceof String) && data.includes('ECONNREFUSED')) {
      content = t('messages.500.server-unavailable')
    } else if (status === 401) {
      content = t('messages.401.no-authentication')
    } else {
      content = t(data.message)
    }

    const message = {
      type: determineSeverity(status),
      content: content
    }

    messagingStore.handleMessage(message)
  }

  return {
    handleError
  }
}
