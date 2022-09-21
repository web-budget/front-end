<template>
  <label class="form-label required">{{ $t(props.label) }}</label>
  <Field class="form-control" :class="{ 'is-invalid': errors }" v-bind="$attrs" :disabled="readOnly"/>
  <div class="invalid-feedback">{{ props.errors }}</div>
</template>

<script setup>
import { Field } from 'vee-validate'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  errors: {
    required: false
  }
})
</script>
