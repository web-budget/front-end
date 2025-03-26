<script setup>
import { ref } from 'vue'

import SideMenu from '@/layout/SideMenu.vue'
import PageStructure from '@/components/PageStructure.vue'

const items = ref([
  {
    label: 'menu.investment',
    items: [
      { label: 'stocks.menu', icon: 'pi pi-fw pi-bookmark', to: '#' },
      { label: 'funds.menu', icon: 'pi pi-fw pi-shopping-bag', to: '#' },
      { label: 'current-position.menu', icon: 'pi pi-fw pi-chart-bar', to: '#' }
    ],
  },
])
</script>

<template>
  <page-structure>
    <template #side-menu>
      <side-menu :items="items"></side-menu>
    </template>
  </page-structure>
</template>
