<template>
  <error-page
    title="errors.403.title"
    description="errors.403.description"
    action="errors.403.action"
    image="unauthorized.png"
    @onAction="goBack()"
  />
</template>

<script setup>
import ErrorPage from '@/components/page/ErrorPage.vue'

import router from '@/router'

function goBack() {
  router.push({ name: 'home' })
}
</script>
