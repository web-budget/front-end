<script setup>
const props = defineProps({
  id: {
    type: String,
    default: null,
  },
  deleting: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="card">
    <span v-if="props.deleting">Deleting {{props.id}}</span>
    <span v-else>Viewing {{props.id}}</span>
  </div>
</template>
