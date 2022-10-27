<template>
  <div></div>
</template>

<script setup>
import { POSITION, useToast } from 'vue-toastification'
import { useMessagingStore } from '@/stores/messaging.store'

const toast = useToast()
const messagingStore = useMessagingStore()

function displayMessage(message) {
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
    type: message.type
  }

  toast(message.content, toastConfig)
}

messagingStore.$subscribe((mutation, state) => {
  displayMessage(state.message)
})
</script>
