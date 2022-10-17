import { defineStore } from 'pinia'

export const useMessagingStore = defineStore('messagingStore', {
  state: () => ({
    message: null
  }),
  actions: {
    handleMessage(message) {
      this.message = message
    }
  }
})
