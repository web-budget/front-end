<template>
  <div class='w-100 text-center'>
    <button
      type='button'
      @click="$emit('onEdit')"
      class='btn btn-ghost-primary btn-icon me-2'>
      <edit-icon />
    </button>
    <button
      type='button'
      @click="$emit('onDelete')"
      class='btn btn-ghost-danger btn-icon'>
      <trash-icon />
    </button>
  </div>
</template>

<script setup>
import { EditIcon, TrashIcon } from 'vue-tabler-icons'

defineEmits(['onEdit', 'onDelete'])
</script>
