<template>
  <div class="page">
    <main-menu />
    <div class="page-wrapper">
      <page-header pre-title="home.header.pre-title" title="home.header.title" />
      <div class="page-body">

      </div>
      <page-footer />
    </div>
  </div>
</template>

<script setup>
import MainMenu from '@/components/home/MainMenu.vue'
import PageHeader from '@/components/home/PageHeader.vue'
import PageFooter from '@/components/home/PageFooter.vue'
</script>
