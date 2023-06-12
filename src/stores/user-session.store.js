import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { StorageSerializers, useStorage } from '@vueuse/core'

import router from '@/router'

import jwtDecode from 'jwt-decode'

export const useUserSession = defineStore('userSessionStore', () => {
  const session = ref(
    useStorage('auth_session', null, localStorage, {
      serializer: StorageSerializers.object,
    })
  )

  const authToken = computed(() => (session.value ? session.value.token : null))
  const userName = computed(() => (session.value ? session.value.name : null))
  const userEmail = computed(() => (session.value ? session.value.email : null))

  function login(subject) {
    session.value = { ...subject }
  }

  function logout() {
    session.value = null
    router.push({ name: 'login' })
  }

  function isValid() {
    if (authToken.value) {
      const { exp } = jwtDecode(authToken.value)
      return Date.now() < exp * 1000
    }
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
