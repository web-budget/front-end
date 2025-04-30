<script setup>
import ErrorPage from '@/components/ErrorPage.vue'
</script>

<template>
  <error-page>
    <template #error-title>500</template>
    <template #error-detail>
      {{ $t('errors.server-error.detail') }}
    </template>
    <template #error-description>
      {{ $t('errors.server-error.description') }}
    </template>
    <template #action>
      <Button as="router-link" :label="$t('action-buttons.go-home')" to="/" />
    </template>
  </error-page>
</template>
