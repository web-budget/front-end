import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { useApi } from '@/composables/useApi'

export const useSessionStore = defineStore('sessionStore', () => {
  const user = ref(null)
  const sessionValid = ref(null)

  const isAuthenticated = computed(() => !!user.value)

  const { post: loginPost, loading: loginLoading } = useApi({
    path: 'auth/login',
  })

  const { post: logoutPost } = useApi({
    path: 'auth/logout',
  })

  const {
    loading: meLoading,
    get: meGet,
    data: meData,
  } = useApi({
    path: 'auth/me',
  })

  async function login(credentials, onSuccess = () => {}, onError = () => {}) {
    try {
      await loginPost(
        {},
        {
          headers: {
            Authorization: 'Basic ' + btoa(`${credentials.username}:${credentials.password}`),
          },
          withCredentials: false,
        },
        async () => {
          await fetchUserInfo()
          sessionValid.value = true
          onSuccess()
        },
        () => {
          sessionValid.value = false
          onError()
        },
      )
    } catch (error) {
      sessionValid.value = false
      throw error
    }
  }

  async function fetchUserInfo() {
    try {
      await meGet()
      if (meLoading.value === false && meData.value) {
        user.value = {
          name: meData.value.name,
          email: meData.value.email,
        }
        sessionValid.value = true
        return true
      }
    } catch (error) {
      user.value = null
      sessionValid.value = false
      throw error
    }
  }

  async function logout() {
    logoutPost().finally(() => {
      user.value = null
      sessionValid.value = false
    })
  }

  async function isSessionValid() {
    if (sessionValid.value !== null) {
      return sessionValid.value
    }
    return await fetchUserInfo()
  }

  return {
    user,
    loading: computed(() => loginLoading.value || meLoading.value),
    isAuthenticated,
    login,
    logout,
    isSessionValid,
  }
})
