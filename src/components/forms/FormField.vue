<script setup>
import { Field } from 'vee-validate'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: true,
  },
  errors: {
    required: false,
  },
})
</script>

<template>
  <label class="form-label" :class="{ required: required }">
    {{ $t(props.label) }}
  </label>
  <Field
    v-bind="$attrs"
    class="form-control"
    :readonly="readonly"
    :disabled="disabled"
    :class="{ 'is-invalid': errors }"
  />
  <div class="invalid-feedback">{{ props.errors }}</div>
</template>
