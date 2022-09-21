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
import MainMenu from '@/components/base/MainMenu.vue'
import PageFooter from '@/components/base/PageFooter.vue'
import MessageDisplay from '@/components/base/MessageDisplay.vue'
</script>
