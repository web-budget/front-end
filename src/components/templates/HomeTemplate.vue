<template>
  <div class="page">
    <main-menu />
    <div class="page-wrapper">
      <message-display />
      <router-view></router-view>
      <page-footer />
    </div>
  </div>
</template>

<script setup>
import MainMenu from '@/components/menu/MainMenu.vue'
import PageFooter from '@/components/page/PageFooter.vue'
import MessageDisplay from '@/components/MessageDisplay.vue'
</script>
