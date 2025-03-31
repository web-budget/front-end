<script setup>
const props = defineProps({
  id: {
    type: String,
    default: null,
  },
  updating: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="card">
    <span v-if="props.updating">Updating {{props.id}}</span>
    <span v-else>Adding new</span>
  </div>
</template>
