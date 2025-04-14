<script setup>
const props = defineProps({
  name: {
    type: String
  },
})

const stateOptions = [
  { label: 'status.active', value: true },
  { label: 'status.inactive', value: false },
]
</script>

<template>
  <SelectButton :name="props.name" option-label="label" option-value="value" :options="stateOptions">
    <template #option="slotProps">
      {{ $t(slotProps.option.label) }}
    </template>
  </SelectButton>
</template>
