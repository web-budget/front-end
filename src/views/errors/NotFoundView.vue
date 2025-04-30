<script setup>
import ErrorPage from '@/components/ErrorPage.vue'
</script>

<template>
  <error-page>
    <template #error-title>404</template>
    <template #error-detail>
      {{ $t('errors.not-found.detail') }}
    </template>
    <template #error-description>
      {{ $t('errors.not-found.description') }}
    </template>
    <template #action>
      <Button as="router-link" :label="$t('action-buttons.go-home')" to="/" />
    </template>
  </error-page>
</template>
