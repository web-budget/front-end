<script setup>
import { ref } from 'vue'

import SideMenu from '@/layout/SideMenu.vue'
import PageStructure from '@/components/PageStructure.vue'

const items = ref([
  {
    label: 'menu.registration',
    items: [
      { label: 'cards.menu', icon: 'pi pi-fw pi-credit-card', to: '#' },
      { label: 'wallets.menu', icon: 'pi pi-fw pi-wallet', to: '#' },
      {
        label: 'cost-centers.menu',
        icon: 'pi pi-fw pi-sitemap',
        to: '/registration/cost-centers',
      },
      { label: 'financial-periods.menu', icon: 'pi pi-fw pi-calendar', to: '#' },
      { label: 'movement-classes.menu', icon: 'pi pi-fw pi-tag', to: '#' },
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
