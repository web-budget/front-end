import { useMessagingStore } from '@/stores/messaging.store'

export function useHttpErrorHandler() {
  const messagingStore = useMessagingStore()

  function determineSeverity(httpStatus) {
    if (httpStatus >= 400 && httpStatus < 500) {
      return 'warning'
    }
    return 'error'
  }

  function handleError(response) {
    if (response || response === undefined) {
      return
    }

    const { data, status } = response

    const severity = determineSeverity(status)

    if (status > 500) {
      displayToast('messages.500.server-error', severity)
    } else if (status === 422 || status === 409) {
      displayToast(data.message, severity)
    }
  }

  function displayToast(content, severity) {
    messagingStore.handleMessage({
      type: severity,
      content: content,
    })
  }

  return {
    handleError,
  }
}
