import i18n from '@/locales'

import { ref } from 'vue'
import { defineStore } from 'pinia'

const { t } = i18n.global

export const useNotificationStore = defineStore('notificationStore', () => {
  const notification = ref({})

  function notify(type, content, localize = true) {
    notification.value = {
      type: type,
      content: localize ? t(content) : content,
    }
  }

  return {
    notify,
    notification,
  }
})
