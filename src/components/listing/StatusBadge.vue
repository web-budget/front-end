<template>
  <span v-if="props.active" class="badge rounded-pill bg-success">{{ $t('grid.status.active') }}</span>
  <span v-else class="badge rounded-pill bg-danger">{{ $t('grid.status.inactive') }}</span>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
</script>
