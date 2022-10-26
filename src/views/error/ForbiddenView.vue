<template>
  <error-page
    title='errors.403.title'
    description='errors.403.description'
    action='errors.403.action'
    image='denied.png'
    @onAction='goBack()'
  />
</template>

<script setup>
import ErrorPage from '@/components/base/ErrorPage'

import router from '@/router'

function goBack() {
  router.go(-1)
}
</script>
