<template>
  <div></div>
</template>

<script setup>
import { watch } from 'vue'

import { POSITION, useToast } from 'vue-toastification'
import { useNotificationStore } from '@/stores/notification.store'

const toast = useToast()

const notificationStore = useNotificationStore()

function display(notification) {
  const toastConfig = {
    timeout: 5000,
    position: POSITION.TOP_CENTER,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    closeButton: 'button',
    icon: true,
    type: notification.type,
  }

  toast(notification.content, toastConfig)
}

watch(
  () => notificationStore.notification,
  () => display(notificationStore.notification)
)
</script>
