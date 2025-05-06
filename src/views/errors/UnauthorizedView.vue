<script setup>
import ErrorPage from '@/components/ErrorPage.vue'
</script>

<template>
  <error-page>
    <template #error-title>401</template>
    <template #error-detail>
      {{ $t('error.unauthorized.detail') }}
    </template>
    <template #error-description>
      {{ $t('error.unauthorized.description') }}
    </template>
    <template #action>
      <Button as="router-link" :label="$t('action-button.go-login')" to="/auth/login" />
    </template>
  </error-page>
</template>
