<template>
  <label class="form-label required">{{ $t(props.label) }}</label>
  <MultiSelect
    display="chip"
    v-bind="$attrs"
    class="form-control"
    v-model="inputValue"
    option-value="value"
    :disabled="disabled"
    :options="authorities"
    :option-label="translateLabel"
    :class="{ 'is-invalid': errors }"
    :placeholder="$t('form.actions.select-one')"
  >
    <template #option="slotProps">
      {{ $t(slotProps.option.name) }}
    </template>
  </MultiSelect>
  <div class="invalid-feedback">{{ props.errors }}</div>
</template>

<script setup>
import { toRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useField } from 'vee-validate'

import authorities from '@/models/administration/authorities.model'

import MultiSelect from 'primevue/multiselect'

const { t } = useI18n()

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  errors: {
    required: false,
  },
  value: {
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
})

const name = toRef(props, 'name')

const { value: inputValue } = useField(name, undefined, {
  initialValue: props.value,
})

function translateLabel(selected) {
  return t(selected.name)
}
</script>

<style lang="scss">
.p-multiselect {
  padding: 0;
  height: 36px;
}

.p-multiselect:hover {
  border-color: #d9dbde !important;
}

div.p-multiselect-label:not(.p-placeholder) {
  padding: 0.2rem 0.5rem !important;
}
</style>
