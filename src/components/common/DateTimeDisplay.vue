<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'short',
  },
  fixTime: {
    type: Boolean,
    default: false,
  },
})

const valueToDisplay = computed(() => {
  if (props.fixTime) {
    return new Date(props.value + 'T00:00:00')
  }
  return props.value
})
</script>

<template>
  {{ $d(valueToDisplay, props.type) }}
</template>
