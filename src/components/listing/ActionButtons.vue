<template>
  <Button
    v-tooltip.left="{ value: $t('action-buttons.edit'), showDelay: 700 }"
    icon="pi pi-pen-to-square"
    severity="primary"
    @click="$emit('onEdit')"
  />
  <Button
    v-tooltip="{ value: $t('action-buttons.delete'), showDelay: 700 }"
    class="ml-2"
    icon="pi pi-trash"
    severity="danger"
    @click="$emit('onDelete')"
  />
</template>

<script setup>
defineEmits(['onEdit', 'onDelete'])
</script>
