import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'

import { useSessionStorage } from '@vueuse/core'

import { useApi } from '@/composables/useApi'

function isTokenExpired(token) {
  const { exp } = jwtDecode(token)
  const now = Math.floor(Date.now() / 1000)
  return exp < now
}

export const useSessionStore = defineStore('sessionStore', () => {
  const token = useSessionStorage('auth_token', null)

  const user = ref(null)

  const isAuthenticated = computed(() => !!token.value)

  const { data, loading, post } = useApi({
    path: '/token',
    requiresAuth: false,
  })

  async function login({ username, password }) {
    await post(
      {},
      {
        headers: {
          Authorization: 'Basic ' + btoa(`${username}:${password}`),
        },
      },
    )

    if (data.value?.token) {
      token.value = data.value.token
      user.value = {
        name: data.value.name,
        email: data.value.email,
      }
    } else {
      throw new Error('Login failed')
    }
  }

  function logout() {
    token.value = null
    user.value = null
  }

  function isSessionValid() {
    if (!token.value || isTokenExpired(token.value)) {
      logout()
      return false
    }
    return true
  }

  return {
    token,
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    isSessionValid,
  }
})
