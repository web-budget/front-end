<template>
  <div class="w-100 text-center">
    <button
      type="button"
      @click="$emit('onEdit')"
      class="btn btn-outline-primary btn-icon me-2">
      <edit-icon />
    </button>
    <button
      type="button"
      @click="$emit('onDelete')"
      class="btn btn-outline-danger btn-icon">
      <trash-icon />
    </button>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

import {
  TrashIcon,
  EditIcon
} from 'vue-tabler-icons'

defineEmits(['onEdit', 'onDelete'])
</script>
