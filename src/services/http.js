import axios from 'axios'

import { useSessionStore } from '@/stores/session.store'

import { useNotification } from '@/composables/useNotification'
import { useErrorHandler } from '@/composables/userErrorHandler'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20000,
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const { logout } = useSessionStore()

    const { showError } = useNotification()

    const {
      handleConflict,
      handleBadRequest,
      handleUnprocessableEntity,
      handleForbidden,
      handleInternalServerError,
    } = useErrorHandler()

    if (error.response) {
      const { status, data } = error.response
      switch (status) {
        case 400:
          handleBadRequest(data)
          break
        case 422:
          handleUnprocessableEntity(data)
          break
        case 409:
          handleConflict(data.conflicts)
          break
        case 401:
          logout()
          break
        case 403:
          handleForbidden()
          break
        case 500:
          handleInternalServerError(data)
          break
        default:
          showError('errors.unknown.title', 'error.unknown.details')
      }
    } else if (error.code.includes('ERR_NETWORK')) {
      showError('errors.connection-failure.title', 'errors.connection-failure.details')
    }

    return Promise.reject(error)
  },
)

export default http
