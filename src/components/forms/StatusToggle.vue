<template>
  <div class="btn-group">
    <Field
      id="rdInactive"
      type="radio"
      :value="false"
      class="btn-check"
      :name="props.name" />
    <label for="rdInactive" class="btn btn-outline-danger" :class="{ 'disabled': readOnly }">
      {{ $t('form.status.inactive') }}
    </label>
    <Field
      id="rdActive"
      type="radio"
      :value="true"
      class="btn-check"
      :name="props.name" />
    <label for="rdActive" class="btn btn-outline-success" :class="{ 'disabled': readOnly }">
      {{ $t('form.status.active') }}
    </label>
  </div>
</template>

<script setup>
import { Field } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  readOnly: {
    type: Boolean,
    default: false
  }
})
</script>
