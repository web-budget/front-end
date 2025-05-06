<script setup>
import ErrorPage from '@/components/ErrorPage.vue'
</script>

<template>
  <error-page>
    <template #error-title>403</template>
    <template #error-detail>
      {{ $t('error.forbidden.detail') }}
    </template>
    <template #error-description>
      {{ $t('error.forbidden.description') }}
    </template>
    <template #action>
      <Button as="router-link" :label="$t('action-button.go-home')" to="/" />
    </template>
  </error-page>
</template>
