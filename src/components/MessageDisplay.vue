<template>
  <div></div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { POSITION, useToast } from 'vue-toastification'
import { useMessagingStore } from '@/stores/messaging.store'

const toast = useToast()
const messagingStore = useMessagingStore()

const { t } = useI18n()

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
    type: message.type,
  }

  if (message.noLocalize) {
    toast(message.content, toastConfig)
  } else {
    toast(t(message.content), toastConfig)
  }
}

messagingStore.$subscribe((mutation, state) => {
  displayMessage(state.message)
})
</script>
