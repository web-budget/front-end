<template>
  <error-page
    title='errors.401.title'
    description='errors.401.description'
    action='errors.401.action'
    image='not-authorized.png'
    @onAction='doLogoutAndRedirect()'
  />
</template>

<script setup>
import ErrorPage from '@/components/base/ErrorPage'

import router from '@/router'

import { useUserSession } from '@/stores/user-session.store'

function doLogoutAndRedirect() {
  useUserSession().logout()
  router.push({ name: 'login' })
}
</script>
