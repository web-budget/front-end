import axios from 'axios'

import { useSessionStore } from '@/stores/session.store'
import { useRouter } from 'vue-router'

const backendUrl = import.meta.env.VITE_API_URL
const debugEnabled = import.meta.env.VITE_LOG_REQUESTS || false

const { authToken, logout } = useSessionStore()

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

class BaseClient {
  constructor(context = null, requireAuth = false) {
    const router = useRouter()

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
          console.log(error) // FIXME
        }
        return Promise.reject(error)
      },
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

export default BaseClient
