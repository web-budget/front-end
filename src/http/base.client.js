import axios from 'axios'

import { useSessionStore } from '@/stores/session.store'

const backendUrl = import.meta.env.VITE_API_URL
const debugEnabled = import.meta.env.VITE_LOG_REQUESTS || false

const { authToken } = useSessionStore()

const configureClient = (context) => {
  const options = {
    baseURL: `${backendUrl}/${context}`,
    timeout: 20000,
  }
  return axios.create(options)
}

class BaseClient {
  constructor(context = null, requireAuth = false) {
    this.client = configureClient(context)

    if (requireAuth) {
      this.client.interceptors.request.use((request) => {
        request.headers.Authorization = `Bearer ${authToken}`
        return request
      })
    }

    if (debugEnabled === 'true') {
      this.client.interceptors.request.use(request => {
        const requestData = {
          method: request.method.toUpperCase(),
          url: `${request.baseURL}${request.url}`,
          ...request.params,
        }
        console.info(requestData)
        return request
      })
    }

    this.client.interceptors.response.use(
      (success) => Promise.resolve(success),
      (error) => {
        console.log(error) // FIXME
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
