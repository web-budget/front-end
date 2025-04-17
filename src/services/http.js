import axios from 'axios'

import { useSessionStore } from '@/stores/session.store'

import { useNotification } from '@/composables/useNotification'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20000,
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const { showError } = useNotification()
    const { logout } = useSessionStore()

    if (error.response) {
      const status = error.response.status

      console.log(error.response)

      switch (status) {
        case 400:
          showError('errors.bad-request.title', '') // TODO get details from response
          break
        case 422:
          showError('errors.unprocessable-entity.title', '') // TODO get details from response
          break
        case 409:
          showError('errors.conflict.title', '') // TODO get details from response
          break
        case 401:
          logout()
          break
        case 403:
          // TODO redirect to 403 page
          break
        case 404:
          // TODO redirect to 404 page
          break
        case 500:
          // TODO redirect to 500 page
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
