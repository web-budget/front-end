import axios from 'axios'

import router from '@/router'

import { useUserSession } from '@/stores/user-session.store'

const userSession = useUserSession()

const configureClient = (context) => {
  const options = {
    baseURL: `${process.env.VUE_APP_API_URL || 'http://localhost:8080'}/${context}`
  }
  return axios.create(options)
}

const authInterceptor = config => {
  config.headers.Authorization = `Bearer ${userSession.session.token}`
  config.headers.common.Accept = 'Application/json'
  config.headers['Access-Control-Allow-Origin'] = '*'
  return config
}

const loggingInterceptor = config => {
  const params = JSON.stringify(config.params)
  console.info(`Sending [${config.method.toUpperCase()}] to [${config.baseURL}/${config.url}] with params [${params}]`)
  return config
}

class ApiClient {
  constructor(context = null, requireAuth = false) {
    this.client = configureClient(context, requireAuth)

    if (requireAuth) {
      this.client.interceptors.request.use(authInterceptor)
    }

    const debugEnabled = process.env.VUE_APP_LOG_REQUESTS || false
    if (debugEnabled) {
      this.client.interceptors.request.use(loggingInterceptor)
    }

    this.client.interceptors.response.use(
      success => Promise.resolve(success),
      error => {
        const status = error.response.status

        if (status === 401) {
          router.push({ name: 'session-expired' })
        } else if (status === 403) {
          router.push({ name: 'unauthorized' })
        }
        return Promise.reject(error)
      }
    )
  }

  head(path, conf = {}) {
    return this.client.head(path, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  }

  options(path, conf = {}) {
    return this.client.options(path, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  }

  get(path, conf = {}) {
    return this.client.get(path, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  }

  post(path, data = {}, conf = {}) {
    return this.client.post(path, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  }

  put(path, data = {}, conf = {}) {
    return this.client.put(path, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  }

  patch(path, data = {}, conf = {}) {
    return this.client.patch(path, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  }

  delete(path, conf = {}) {
    return this.client.delete(path, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  }
}

export default ApiClient
