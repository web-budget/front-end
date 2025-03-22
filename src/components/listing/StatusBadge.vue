<template>
  <Tag v-if="props.active" :value="$t('status-badge.active')" severity="success"></Tag>
  <Tag v-else :value="$t('status-badge.inactive')" severity="danger"></Tag>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
})
</script>
