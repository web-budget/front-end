<script setup>
import { Field } from 'vee-validate'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  options: {
    type: Object,
    required: true,
  },
  selectOneLabel: {
    type: String,
    default: 'form.actions.select-one',
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

function valueByOption(selectedOption) {
  return (
    Object.keys(props.options).find(
      (key) => props.options[key] === selectedOption
    ) || null
  )
}

function optionByValue(value) {
  return props.options[value]
}
</script>

<template>
  <label class="form-label" :class="{ required: required }">
    {{ $t(props.label) }}
  </label>
  <Field
    as="select"
    v-slot="{ value }"
    :name="props.name"
    :disabled="disabled"
    class="form-select form-control"
    :class="{ 'is-invalid': errors }"
  >
    <option value="">
      {{ $t(selectOneLabel) }}
    </option>
    <option
      :key="option"
      v-for="option in options"
      :value="valueByOption(option)"
      :selected="value === optionByValue(value)"
    >
      {{ $t(option) }}
    </option>
  </Field>
  <div class="invalid-feedback">{{ props.errors }}</div>
</template>
