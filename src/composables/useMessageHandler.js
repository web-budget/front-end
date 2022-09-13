import { useI18n } from 'vue-i18n'
import { useMessagingStore } from '@/stores/messaging-store'

export function useMessageHandler() {
  const { t } = useI18n()
  const messagingStore = useMessagingStore()

  function displayWarn(detail, title = 'messages.common.warning') {
    const message = {
      severity: 'warn',
      summary: t(title),
      detail: t(detail)
    }
    messagingStore.handleMessage(message)
  }

  function displaySuccess(detail, title = 'messages.common.success') {
    const message = {
      severity: 'success',
      summary: t(title),
      detail: t(detail)
    }
    messagingStore.handleMessage(message)
  }

  function displayInfo(detail, title = 'messages.common.information') {
    const message = {
      severity: 'info',
      summary: t(title),
      detail: t(detail)
    }
    messagingStore.handleMessage(message)
  }

  function displayError(detail, title = 'messages.common.error') {
    const message = {
      severity: 'error',
      summary: t(title),
      detail: t(detail)
    }
    messagingStore.handleMessage(message)
  }

  return {
    displayWarn,
    displayError,
    displayInfo,
    displaySuccess
  }
}
