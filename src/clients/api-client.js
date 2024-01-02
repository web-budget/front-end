import axios from 'axios'

import router from '@/router'

import { useUserSession } from '@/stores/user-session.store'

import { useNotificationHandler } from '@/composables/useNotificationHandler'

const { displayError } = useNotificationHandler()
const { authToken, logout } = useUserSession()

const backendUrl = import.meta.env.VITE_API_URL
const debugEnabled = import.meta.env.VITE_LOG_REQUESTS || false

const configureClient = (context) => {
  const options = {
    baseURL: `${backendUrl}/${context}`,
    timeout: 20000,
  }
  return axios.create(options)
}

const authInterceptor = (config) => {
  config.headers.Authorization = `Bearer ${authToken}`
  return config
}

const loggingInterceptor = (config) => {
  const requestData = {
    method: config.method.toUpperCase(),
    url: `${config.baseURL}${config.url}`,
    ...config.params,
  }
  console.info(requestData)
  return config
}

class ApiClient {
  constructor(context = null, requireAuth = false) {
    this.client = configureClient(context)

    if (requireAuth) {
      this.client.interceptors.request.use(authInterceptor)
    }

    if (debugEnabled === 'true') {
      this.client.interceptors.request.use(loggingInterceptor)
    }

    this.client.interceptors.response.use(
      (success) => Promise.resolve(success),
      (error) => {
        if (error.response) {
          const { status } = error.response
          if (status === 401) {
            logout()
          } else if (status === 403) {
            router.push({ name: 'unauthorized' })
          }
        } else {
          displayError('errors.network-error')
        }

        if (debugEnabled) {
          console.error(error)
        }

        return Promise.reject(error)
      }
    )
  }

  head(path, conf = {}) {
    return this.client
      .head(path, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }

  options(path, conf = {}) {
    return this.client
      .options(path, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }

  get(path, conf = {}) {
    return this.client
      .get(path, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }

  post(path, data = {}, conf = {}) {
    return this.client
      .post(path, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }

  put(path, data = {}, conf = {}) {
    return this.client
      .put(path, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }

  patch(path, data = {}, conf = {}) {
    return this.client
      .patch(path, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }

  delete(path, conf = {}) {
    return this.client
      .delete(path, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }
}

export default ApiClient
