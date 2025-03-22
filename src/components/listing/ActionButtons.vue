<template>
  <Button icon="pi pi-pen-to-square" severity="primary" @click="$emit('onEdit')" />
  <Button icon="pi pi-trash" severity="danger" @click="$emit('onDelete')" />
</template>

<script setup>
defineEmits(['onEdit', 'onDelete'])
</script>
