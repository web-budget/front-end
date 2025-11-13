import { ref } from 'vue'

import http from '@/services/http'

export function useApi({ path }) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const get = async (params = {}, options = {}, onSuccess = () => {}, onError = () => {}) => {
    loading.value = true
    error.value = null
    try {
      const url = `${path}${options.urlSuffix || ''}`
      const response = await http.get(url, {
        params,
        headers: {
          ...(options.headers || {}),
        },
        ...options,
      })
      data.value = response.data
      onSuccess()
    } catch (err) {
      error.value = err
      onError()
    } finally {
      loading.value = false
    }
  }

  const post = async (payload = {}, options = {}, onSuccess = () => {}, onError = () => {}) => {
    loading.value = true
    error.value = null
    try {
      const url = `${path}${options.urlSuffix || ''}`
      const response = await http.post(url, payload, {
        headers: {
          ...(options.headers || {}),
        },
      })
      data.value = response.data
      onSuccess()
    } catch (exception) {
      error.value = exception
      onError()
    } finally {
      loading.value = false
    }
  }

  const put = async (payload = {}, options = {}, onSuccess = () => {}, onError = () => {}) => {
    loading.value = true
    error.value = null
    try {
      const url = `${path}${options.urlSuffix || ''}`
      const response = await http.put(url, payload)
      data.value = response.data
      onSuccess()
    } catch (exception) {
      error.value = exception
      onError()
    } finally {
      loading.value = false
    }
  }

  const patch = async (payload = {}, options = {}, onSuccess = () => {}, onError = () => {}) => {
    loading.value = true
    error.value = null
    try {
      const url = `${path}${options.urlSuffix || ''}`
      const response = await http.patch(url, payload)
      data.value = response.data
      onSuccess()
    } catch (exception) {
      error.value = exception
      onError()
    } finally {
      loading.value = false
    }
  }

  const del = async (params = {}, options = {}, onSuccess = () => {}, onError = () => {}) => {
    loading.value = true
    error.value = null
    try {
      const url = `${path}${options.urlSuffix || ''}`
      const response = await http.delete(url, {
        params,
      })
      data.value = response.data
      onSuccess()
    } catch (exception) {
      error.value = exception
      onError()
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    error,
    loading,
    get,
    post,
    put,
    patch,
    del,
  }
}
