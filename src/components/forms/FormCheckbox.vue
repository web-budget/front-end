<script setup>
import { toRefs } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
  },
  modelValue: {
    type: null,
  },
  value: {
    type: Boolean,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
})

const { name } = toRefs(props)

const { value } = useField(name, undefined, {
  type: 'checkbox',
  checkedValue: true,
  uncheckedValue: false,
})

defineEmits(['onChange', 'onUpdate:modelValue'])
</script>

<template>
  <label class="form-check form-check-inline">
    <input
      type="checkbox"
      v-model="value"
      class="form-check-input"
      @change="$emit('onChange')"
    />
    <span class="form-check-label">{{ $t(props.label) }}</span>
  </label>
</template>
