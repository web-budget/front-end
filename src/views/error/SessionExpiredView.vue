<template>
  <error-page
    title="errors.401.title"
    description="errors.401.description"
    action="errors.401.action"
    image="session-expired.png"
    @onAction="doLogoutAndRedirect()"
  />
</template>

<script setup>
import ErrorPage from '@/components/page/ErrorPage.vue'

import router from '@/router'

import { useUserSession } from '@/stores/user-session.store'

function doLogoutAndRedirect() {
  useUserSession().logout()
  router.push({ name: 'login' })
}
</script>
