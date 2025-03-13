<script setup>
import PageFooter from '@/layout/PageFooter.vue'
import TopBar from '@/layout/TopBar.vue'
</script>

<template>
  <div class="layout-wrapper layout-static layout-static-inactive">
    <top-bar></top-bar>
    <div class="layout-main-container">
      <div class="layout-main">
        <router-view></router-view>
      </div>
      <page-footer></page-footer>
    </div>
    <div class="layout-mask animate-fadein"></div>
  </div>
  <Toast />
</template>
