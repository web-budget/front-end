<script setup>
import { ref } from 'vue'

import SideMenu from '@/components/layout/SideMenu.vue'
import PageStructure from '@/components/PageStructure.vue'

const items = ref([
  {
    label: 'menu.financial',
    items: [
      { label: 'period-movements.menu', icon: 'pi pi-fw pi-calendar', to: '#' },
      { label: 'recurrent-movements.menu', icon: 'pi pi-fw pi-sync', to: '#' },
      { label: 'credit-card-invoice.menu', icon: 'pi pi-fw pi-credit-card', to: '#' },
      { label: 'period-closing.menu', icon: 'pi pi-fw pi-chart-line', to: '#' },
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
