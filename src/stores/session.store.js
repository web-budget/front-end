import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

import { useApi } from '@/composables/useApi'

export const useSessionStore = defineStore('sessionStore', () => {
  const router = useRouter()

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
    error: meError,
    data: meData,
  } = useApi({
    path: 'auth/me',
  })

  async function login(credentials, onSuccess = () => {}, onError = () => {}) {
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
  }

  async function fetchUserInfo() {
    await meGet(
      {},
      {},
      () => {
        user.value = {
          name: meData.value.name,
          email: meData.value.email,
        }
        sessionValid.value = true
      },
      () => {
        user.value = null
        sessionValid.value = false
      }
    )
  }

  async function logout() {
    logoutPost().finally(() => {
      user.value = null
      sessionValid.value = false
      router.push({ name: 'login' })
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
