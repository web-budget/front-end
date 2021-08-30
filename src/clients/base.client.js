import axios from 'axios'

import store from '@/store'

const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:8080'

const getClient = (baseUrl, secured) => {
  const options = {
    baseURL: baseUrl
  }

  if (secured && store.getters['userSession/isLoggedIn']) {
    options.headers = {
      'Content-type': 'application/json',
      Authorization: `Bearer ${store.getters['userSession/accessToken']}`
    }
  }

  const axiosClient = axios.create(options)

  axiosClient.interceptors.request.use(
    function(request) {
      return request
    },
    function(error) {
      store.dispatch('errorHandler/catchError', error.response)
      return Promise.reject(error)
    }
  )

  axiosClient.interceptors.response.use(
    function(response) {
      return response
    },
    function(error) {
      store.dispatch('errorHandler/catchError', error.response)
      return Promise.reject(error)
    }
  )

  return axiosClient
}

class BaseService {
  constructor(path, secured = true) {
    this.client = getClient(`${apiUrl}/${path}`, secured)
  }

  get(url, conf = {}) {
    return this.client.get(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  }

  delete(url, conf = {}) {
    return this.client.delete(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  }

  head(url, conf = {}) {
    return this.client.head(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  }

  options(url, conf = {}) {
    return this.client.options(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  }

  post(url, data = {}, conf = {}) {
    return this.client.post(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  }

  put(url, data = {}, conf = {}) {
    return this.client.put(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  }

  patch(url, data = {}, conf = {}) {
    return this.client.patch(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  }
}

export default BaseService
