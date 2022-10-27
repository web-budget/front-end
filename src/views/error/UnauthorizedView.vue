<template>
  <error-page
    title='errors.403.title'
    description='errors.403.description'
    action='errors.403.action'
    image='unauthorized.png'
    @onAction='goBack()'
  />
</template>

<script setup>
import ErrorPage from '@/components/page/ErrorPage'

import router from '@/router'

function goBack() {
  router.go(-1)
}
</script>
