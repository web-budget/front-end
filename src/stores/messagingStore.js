import { defineStore } from 'pinia'

export const useMessagingStore = defineStore('messagingStore', {
  state: () => ({
    messageData: null,
    httpStatus: null
  }),
  actions: {
    handleMessage(message) {
      this.messageData = message.data
      this.httpStatus = message.httpStatus
    }
  }
})
