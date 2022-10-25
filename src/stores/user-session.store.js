import { defineStore } from 'pinia'

import { StorageSerializers, useStorage } from '@vueuse/core'

import jwtDecode from 'jwt-decode'

export const useUserSession = defineStore('userSessionStore', {
  state: () => ({
    session: useStorage(
      'auth_session',
      null,
      localStorage,
      { serializer: StorageSerializers.object }
    )
  }),
  actions: {
    login(subject) {
      this.session = { ...subject }
    },
    logout() {
      this.session = null
    },
    isValid() {
      if (this.session) {
        const { exp } = jwtDecode(this.session.token)
        return !(Date.now() >= exp * 1000)
      }
      return false
    }
  }
})
