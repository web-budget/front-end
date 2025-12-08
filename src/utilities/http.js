import axios from 'axios'

import { useNotification } from '@/composables/useNotification'
import { useErrorHandler } from '@/composables/userErrorHandler'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20000,
  withCredentials: true
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.config.url.includes('auth/me')) return Promise.reject(error)

    const { showError } = useNotification()

    const {
      handleConflict,
      handleBadRequest,
      handleUnprocessableEntity,
      handleForbidden,
      handleInternalServerError
    } = useErrorHandler()

    if (error.response) {
      const { status, data } = error.response
      switch (status) {
        case 400:
          handleBadRequest(data.message)
          break
        case 422:
          handleUnprocessableEntity(data.message)
          break
        case 409:
          handleConflict(data.message)
          break
        case 401:
          // TODO logout and go to login?
          break
        case 403:
          handleForbidden()
          break
        case 500:
          handleInternalServerError(data)
          break
        default:
          showError('error.unknown.title', 'error.unknown.details')
      }
    } else if (error.code.includes('ERR_NETWORK')) {
      showError('error.connection-failure.title', 'error.connection-failure.details')
    }

    return Promise.reject(error)
  }
)

export default http
