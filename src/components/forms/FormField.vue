<template>
  <label class='form-label required'>{{ $t(props.label) }}</label>
  <Field
    v-bind='$attrs'
    class='form-control'
    :readonly='readonly'
    :disabled='disabled'
    :class="{ 'is-invalid': errors }" />
  <div class='invalid-feedback'>{{ props.errors }}</div>
</template>

<script setup>
import { Field } from 'vee-validate'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  errors: {
    required: false
  }
})
</script>
