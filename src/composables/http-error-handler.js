import { useI18n } from 'vue-i18n'
import { useMessagingStore } from '@/stores/messaging-store'

export function useHttpErrorHandler() {
  const { t } = useI18n()
  const messagingStore = useMessagingStore()

  function filterMessage(messageData) {
    if (messageData.includes('ECONNREFUSED')) {
      return t('messages.500.server-unavailable')
    }
    return messageData
  }

  function determineSeverity(httpStatus) {
    if (httpStatus >= 400 && httpStatus < 500) {
      return 'warn'
    }
    return 'error'
  }

  function handleError(response) {
    const summaries = {
      500: 'messages.500.summary',
      400: 'messages.400.summary',
      422: 'messages.422.summary',
      409: 'messages.409.summary'
    }

    const { data, status } = response

    const summary = summaries[status] || summaries.default

    const message = {
      severity: determineSeverity(status),
      summary: t(summary),
      detail: filterMessage(data)
    }

    messagingStore.handleMessage(message)
  }

  return {
    handleError
  }
}
