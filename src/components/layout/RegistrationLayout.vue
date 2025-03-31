<script setup>
import { ref } from 'vue'

import SideMenu from '@/components/layout/SideMenu.vue'
import PageStructure from '@/components/PageStructure.vue'

const items = ref([
  {
    label: 'menu.registration',
    items: [
      {
        label: 'cards.menu',
        icon: 'pi pi-fw pi-credit-card',
        to: '/registration/cards',
      },
      {
        label: 'wallets.menu',
        icon: 'pi pi-fw pi-wallet',
        to: '/registration/wallets',
      },
      {
        label: 'cost-centers.menu',
        icon: 'pi pi-fw pi-sitemap',
        to: '/registration/cost-centers',
      },
      {
        label: 'financial-periods.menu',
        icon: 'pi pi-fw pi-calendar',
        to: '/registration/financial-periods',
      },
      {
        label: 'movement-classes.menu',
        icon: 'pi pi-fw pi-tag',
        to: '/registration/movement-classes',
      },
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
