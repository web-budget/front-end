import i18n from '@/locales'

import { useRouter } from 'vue-router'

import { useNotification } from '@/composables/useNotification'

export function useErrorHandler() {
  const router = useRouter()
  const { showWarn } = useNotification()

  const handleConflict = (message) => {
    const parameters = Object.entries(message.parameters).map(([key, value]) => {
      return t(`error.conflict.${key}`, { value: value })
    })
    const detail = parameters.join('\n')

    showWarn(t(`error.conflict.title`), detail, false)
  }

  const handleBadRequest = (message) => {
    const detail = t(`error.bad-request.${message.key}`, message.parameters)
    showWarn(t('error.bad-request.title'), detail, false)
  }

  const handleUnprocessableEntity = (data) => {
    console.error(data)
    showWarn('error.unprocessable-entity.title', 'error.unprocessable-entity.detail')
  }

  const handleForbidden = () => {
    console.error('error.forbidden')
    router.push({ name: '403' })
  }

  const handleInternalServerError = (data) => {
    console.error(data)
    router.push({ name: '500' })
  }

  function t(text, parameters = {}) {
    return i18n.global.t(text, parameters)
  }

  return {
    handleConflict,
    handleForbidden,
    handleBadRequest,
    handleUnprocessableEntity,
    handleInternalServerError,
  }
}
