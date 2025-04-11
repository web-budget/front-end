import { useToast } from 'primevue'
import { useI18n } from 'vue-i18n'

export function useNotification() {
  const i18n = useI18n()
  const toast = useToast()

  function success(title, detail, localize = true) {
    showToast('success', title, detail, localize)
  }

  function info(title, detail, localize = true) {
    showToast('info', title, detail, localize)
  }

  function warn(title, detail, localize = true) {
    showToast('warn', title, detail, localize)
  }

  function error(title, detail, localize = true) {
    showToast('error', title, detail, localize)
  }

  function showToast(severity, summary, detail, localize) {
    toast.add({
      severity: severity,
      summary: localize ? i18n.t(summary) : summary,
      detail: localize ? i18n.t(detail) : detail,
      life: 4000,
    })
  }

  return {
    warn,
    success,
    info,
    error,
  }
}
