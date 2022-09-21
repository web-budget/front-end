import { useI18n } from 'vue-i18n'
import { useMessagingStore } from '@/stores/messaging-store'

export function useMessageHandler() {
  const { t } = useI18n()
  const messagingStore = useMessagingStore()

  function displayWarn(detail) {
    display(detail, 'warning')
  }

  function displaySuccess(detail) {
    display(detail, 'success')
  }

  function displayInfo(detail) {
    display(detail, 'info')
  }

  function displayError(detail) {
    display(detail, 'error')
  }

  function display(detail, type = 'default') {
    const message = {
      type: type,
      content: t(detail)
    }
    messagingStore.handleMessage(message)
  }

  return {
    display,
    displayWarn,
    displayError,
    displayInfo,
    displaySuccess
  }
}
