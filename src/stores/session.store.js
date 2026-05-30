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
    path: 'auth/login'
  })

  const { post: logoutPost } = useApi({
    path: 'auth/logout'
  })

  const {
    loading: meLoading,
    get: meGet,
    data: meData
  } = useApi({
    path: 'auth/me'
  })

  async function login(credentials, onSuccess = () => {}, onError = () => {}) {
    await loginPost(
      {},
      {
        headers: {
          Authorization: 'Basic ' + btoa(`${credentials.username}:${credentials.password}`)
        },
        withCredentials: false
      },
      async () => {
        await fetchUserInfo()
        sessionValid.value = true
        onSuccess()
      },
      () => {
        sessionValid.value = false
        onError()
      }
    )
  }

  async function fetchUserInfo() {
    await meGet(
      {},
      {},
      () => {
        user.value = {
          name: meData.value.name,
          email: meData.value.email
        }
        sessionValid.value = true
      },
      () => {
        user.value = null
        sessionValid.value = false
      }
    )
    return sessionValid.value
  }

  async function logout() {
    logoutPost().finally(() => {
      clearSession()
      router.push({ name: 'login' })
    })
  }

  // Drops the local session state without calling the back-end. Used when the server already told us
  // the session is gone (a 401), where calling logout would be pointless.
  function clearSession() {
    user.value = null
    sessionValid.value = false
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
    clearSession,
    isSessionValid
  }
})
