<template>
  <div class="container container-tight py-4">
    <div class="text-center mb-4">
      <span class="wb-logo">web</span>
      <span class="wb-logo wb-logo-black">Budget</span>
    </div>
    <message-display />
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

import MessageDisplay from '@/components/MessageDisplay.vue'

onMounted(() => {
  document.body.classList.add('d-flex', 'flex-column')
  document
    .querySelector('#app')
    .classList.add('page', 'page-center', 'adjust-logo')
})
</script>

<style lang="scss">
.adjust-logo {
  top: -120px;
}
</style>
