<template>
  <Toast position="top-center"/>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

import { useMessagingStore } from '@/stores/messagingStore'

const { t } = useI18n()

const toast = useToast()
const messagingStore = useMessagingStore()

const summaries = {
  500: 'messages.500.summary',
  400: 'messages.400.summary',
  422: 'messages.422.summary',
  409: 'messages.409.summary'
}

function determineSeverity(httpStatus) {
  if (httpStatus >= 400 && httpStatus < 500) {
    return 'warn'
  }
  return 'error'
}

function filterMessage(messageData) {
  if (messageData.includes('ECONNREFUSED')) {
    return t('messages.500.server-unavailable')
  }
  return messageData
}

messagingStore.$subscribe((mutation, state) => {
  const summary = summaries[state.httpStatus] || summaries.default

  const toastMessage = {
    life: 5000,
    summary: t(summary),
    detail: filterMessage(state.messageData),
    severity: determineSeverity(state.httpStatus)
  }

  toast.add(toastMessage)
})
</script>
