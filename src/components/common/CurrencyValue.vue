<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: [Number, null],
    default: null,
    required: true,
  },
  zeroIfNull: {
    type: Boolean,
    default: false,
  }
})

const displayZero = computed(() => props.value === null && props.zeroIfNull)
</script>

<template>
  <span v-if="props.value">
    {{ $n(props.value, 'currency') }}
  </span>
  <span v-if="displayZero">
    {{ $n(0, 'currency') }}
  </span>
</template>
