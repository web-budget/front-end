import { ref } from 'vue'

import http from '@/utilities/http'

export function useApi({ path }) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  // Pull the request-level options the global error interceptor understands (e.g. the statuses the
  // caller will handle itself) and forward them onto the Axios config.
  const requestConfig = (options = {}) => ({
    ...(options.handledStatuses ? { handledStatuses: options.handledStatuses } : {})
  })

  const run = async (request, onSuccess, onError) => {
    loading.value = true
    error.value = null
    try {
      const response = await request()
      data.value = response.data
      onSuccess()
    } catch (exception) {
      error.value = exception.normalized ?? exception
      onError(error.value)
    } finally {
      loading.value = false
    }
  }

  const get = async (params = {}, options = {}, onSuccess = () => {}, onError = () => {}) => {
    const url = `${path}${options.urlSuffix || ''}`
    await run(
      () =>
        http.get(url, {
          params,
          headers: { ...(options.headers || {}) },
          ...requestConfig(options)
        }),
      onSuccess,
      onError
    )
  }

  const post = async (payload = {}, options = {}, onSuccess = () => {}, onError = () => {}) => {
    const url = `${path}${options.urlSuffix || ''}`
    await run(
      () =>
        http.post(url, payload, {
          headers: { ...(options.headers || {}) },
          ...requestConfig(options)
        }),
      onSuccess,
      onError
    )
  }

  const put = async (payload = {}, options = {}, onSuccess = () => {}, onError = () => {}) => {
    const url = `${path}${options.urlSuffix || ''}`
    await run(() => http.put(url, payload, requestConfig(options)), onSuccess, onError)
  }

  const patch = async (payload = {}, options = {}, onSuccess = () => {}, onError = () => {}) => {
    const url = `${path}${options.urlSuffix || ''}`
    await run(() => http.patch(url, payload, requestConfig(options)), onSuccess, onError)
  }

  const del = async (params = {}, options = {}, onSuccess = () => {}, onError = () => {}) => {
    const url = `${path}${options.urlSuffix || ''}`
    await run(() => http.delete(url, { params, ...requestConfig(options) }), onSuccess, onError)
  }

  return {
    data,
    error,
    loading,
    get,
    post,
    put,
    patch,
    del
  }
}
