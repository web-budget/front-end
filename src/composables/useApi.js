import { ref } from 'vue'

import http from '@/services/http'

import { useSessionStore } from '@/stores/session.store'

export function useApi({ path, requiresAuth = true }) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const { token } = useSessionStore()

  const getHeaders = () => {
    const headers = {}
    if (requiresAuth) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return headers
  }

  const get = async (params = {}, options = {}) => {
    loading.value = true
    error.value = null
    try {
      const url = `${path}${options.urlSuffix || ''}`
      const response = await http.get(url, {
        params,
        headers: {
          ...getHeaders(),
          ...(options.headers || {}),
        },
        ...options,
      })
      data.value = response.data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const post = async (payload = {}, options = {}) => {
    loading.value = true
    error.value = null
    try {
      const response = await http.post(path, payload, {
        headers: {
          ...getHeaders(),
          ...(options.headers || {}),
        },
        ...options,
      })
      data.value = response.data
    } catch (exception) {
      error.value = exception
    } finally {
      loading.value = false
    }
  }

  const put = async (payload = {}, options = {}) => {
    loading.value = true
    error.value = null
    try {
      const url = `${path}${options.urlSuffix || ''}`
      const response = await http.put(url, payload, {
        headers: getHeaders(),
      })
      data.value = response.data
    } catch (exception) {
      error.value = exception
    } finally {
      loading.value = false
    }
  }

  const del = async (params = {}, options = {}) => {
    loading.value = true
    error.value = null
    try {
      const url = `${path}${options.urlSuffix || ''}`
      const response = await http.delete(url, {
        params,
        headers: getHeaders(),
      })
      data.value = response.data
    } catch (exception) {
      error.value = exception
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
    del,
  }
}
