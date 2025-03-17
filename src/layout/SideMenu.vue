<script setup>
import MenuItem from '@/layout/MenuItem.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in props.items" :key="item">
      <menu-item v-if="!item.separator" :item="item" :index="i"></menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>
