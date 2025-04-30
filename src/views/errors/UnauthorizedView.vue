<script setup>
import ErrorPage from '@/components/ErrorPage.vue'
</script>

<template>
  <error-page>
    <template #error-title>401</template>
    <template #error-detail>
      {{ $t('errors.unauthorized.detail') }}
    </template>
    <template #error-description>
      {{ $t('errors.unauthorized.description') }}
    </template>
    <template #action>
      <Button as="router-link" :label="$t('action-buttons.go-login')" to="/auth/login" />
    </template>
  </error-page>
</template>
