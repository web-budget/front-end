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

      switch (status) {
        case 400:
          showError('error.bad-request.title', 'TODO add details')
          break
        case 401:
          showError('error.unauthorized.title', 'error.unauthorized.details')
          logout()
          break
        case 403:
          showError('error.unauthorized.title', 'error.unauthorized.details')
          break
        case 404:
          showError('error.unauthorized.title', 'error.unauthorized.details')
          break
        case 500:
          showError('error.unauthorized.title', 'error.unauthorized.details')
          break
        default:
          showError('error.unknown.title', 'error.unknown.details')
      }
    }

    return Promise.reject(error)
  },
)

export default http
