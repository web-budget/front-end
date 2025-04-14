import i18n from '@/locales'

import { ToastEventBus } from 'primevue'

export function useNotification() {

  function showSuccess(title, detail, localize = true) {
    showToast('success', title, detail, localize)
  }

  function showInfo(title, detail, localize = true) {
    showToast('info', title, detail, localize)
  }

  function showWarn(title, detail, localize = true) {
    showToast('warn', title, detail, localize)
  }

  function showError(title, detail, localize = true) {
    showToast('error', title, detail, localize)
  }

  function showToast(severity, summary, detail, localize) {
    ToastEventBus.emit('add', {
      severity: severity,
      summary: localize ? i18n.global.t(summary) : summary,
      detail: localize ? i18n.global.t(detail) : detail,
      life: 4000,
    })
  }

  return {
    showWarn,
    showSuccess,
    showInfo,
    showError,
  }
}
