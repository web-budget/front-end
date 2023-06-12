import { useNotificationStore } from '@/stores/notification.store'

export function useNotificationHandler() {
  const { notify } = useNotificationStore()

  function displayWarn(content, localize = true) {
    notify('warning', content, localize)
  }

  function displaySuccess(content, localize = true) {
    notify('success', content, localize)
  }

  function displayInfo(content, localize = true) {
    notify('info', content, localize)
  }

  function displayError(content, localize = true) {
    notify('error', content, localize)
  }

  return {
    displayWarn,
    displayError,
    displayInfo,
    displaySuccess,
  }
}
