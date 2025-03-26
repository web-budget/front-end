import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'vue-router'

import { useSessionStorage } from '@vueuse/core'

export const useSessionStore = defineStore('sessionStore', () => {
  const router = useRouter()

  const session = ref(useSessionStorage('session', {}))

  const authToken = computed(() => (session.value ? session.value.token : null))
  const userName = computed(() => (session.value ? session.value.name : null))
  const userEmail = computed(() => (session.value ? session.value.email : null))

  function login(subject) {
    session.value = subject
  }

  function logout() {
    session.value = null
    router.push({ name: 'login' })
  }

  function isValid() {
    const token = authToken.value
    if (token) {
      const { exp } = jwtDecode(token)
      return Date.now() < exp * 1000
    }
    session.value = null
    return false
  }

  return {
    authToken,
    userEmail,
    userName,
    login,
    logout,
    isValid,
  }
})
