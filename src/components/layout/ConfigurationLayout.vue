<script setup>
import { ref } from 'vue'

import SideMenu from '@/components/layout/SideMenu.vue'
import PageStructure from '@/components/PageStructure.vue'

const items = ref([
  {
    label: 'menu.configuration',
    items: [
      { label: 'users.menu', icon: 'pi pi-fw pi-users', to: '#' },
      {
        label: 'integrations.menu',
        icon: 'pi pi-fw pi-arrow-right-arrow-left',
        to: '#',
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
