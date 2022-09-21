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
import MainMenu from '@/components/home/MainMenu.vue'
import PageFooter from '@/components/home/PageFooter.vue'
import MessageDisplay from '@/components/base/MessageDisplay.vue'
</script>
