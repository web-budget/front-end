<template>
  <main-menu />
  <div class="page-wrapper">
    <message-display />
    <router-view></router-view>
    <page-footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

import MainMenu from '@/components/menu/MainMenu.vue'
import PageFooter from '@/components/page/PageFooter.vue'
import MessageDisplay from '@/components/NotificationDisplay.vue'

onMounted(() => {
  document.querySelector('#app').classList.add('page')
})
</script>
