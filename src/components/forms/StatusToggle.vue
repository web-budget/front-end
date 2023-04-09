<template>
  <div class="btn-group">
    <Field
      id="rdInactive"
      type="radio"
      :value="false"
      class="btn-check"
      :name="props.name"
    />
    <label
      for="rdInactive"
      class="btn btn-outline-danger"
      :class="{ disabled: disabled }"
    >
      {{ $t('form.status.inactive') }}
    </label>
    <Field
      id="rdActive"
      type="radio"
      :value="true"
      class="btn-check"
      :name="props.name"
    />
    <label
      for="rdActive"
      class="btn btn-outline-success"
      :class="{ disabled: disabled }"
    >
      {{ $t('form.status.active') }}
    </label>
  </div>
</template>

<script setup>
import { Field } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
label.btn {
  border-color: var(--bs-btn-active-border-color) !important;
}
</style>
