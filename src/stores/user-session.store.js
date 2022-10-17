import { defineStore } from 'pinia'

import router from '@/router'

export const useUserSession = defineStore('userSessionStore', {
  state: () => ({
    subject: null
  }),
  actions: {
    login(subject) {
      this.subject = subject
      // TODO save to local storage
      router.go({ name: 'home' })
    },
    logout() {
      this.subject = null
      // TODO clear local storage
      router.go({ name: 'login' })
    },
    isValid() {
      return this.state != null
    },
    handleAuthenticationError() {
      this.logout()
    },
    handleAuthorizationError() {
      router.go({ name: 'unauthorized' })
    }
  }
})
