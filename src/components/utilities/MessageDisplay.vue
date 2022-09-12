<template>
  <Toast position="top-center"/>
</template>

<script setup>
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

import { useMessagingStore } from '@/stores/messaging-store'

const toast = useToast()
const messagingStore = useMessagingStore()

function displayMessage(message) {
  const toastMessage = {
    life: 5000,
    ...message
  }
  toast.add(toastMessage)
}

messagingStore.$subscribe((mutation, state) => {
  displayMessage(state.message)
})
</script>
