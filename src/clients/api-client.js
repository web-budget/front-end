
import axios from 'axios'

const getClient = (context, requireAuth) => {
  const options = {
    baseURL: `${process.env.VUE_APP_API_URL || 'http://localhost:8080'}/${context}`,
    timeout: 600
  }

  // if (requireAuth && store.getters['authentication/isAuthenticated']) {
  //   options.headers = {
  //     'Content-type': 'application/json',
  //     Authorization: `Bearer ${store.getters['authentication/accessToken']}`
  //   }
  // }

  return axios.create(options)
}

class ApiClient {
  constructor(context = null, requireAuth = true) {
    this.client = getClient(context, requireAuth)
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
