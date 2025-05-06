<script setup>
import { ref } from 'vue'

const props = defineProps({
  filter: {
    type: String,
    default: '',
    required: true,
  },
  status: {
    type: String,
    default: 'ACTIVE',
    required: true,
  },
  placeholder: {
    type: String,
    default: 'search-control.filter-not-defined',
  },
  statusOptions: {
    type: Array,
    default: () => [
      { label: 'search-control.all', value: 'ALL' },
      { label: 'search-control.inactive', value: 'INACTIVE' },
      { label: 'search-control.active', value: 'ACTIVE' },
    ],
  },
  statusInitialValue: {
    type: String,
    default: 'ACTIVE',
  },
})

const statusValue = ref(props.status)
const filterValue = ref(props.filter)

const emit = defineEmits([
  'update:status',
  'update:filter',
  'onFilterChange',
  'onFilterReset',
  'onNew',
])

function fireFilterChange() {
  emit('update:status', statusValue.value)
  emit('onFilterChange')
}

function resetFilter() {
  statusValue.value = props.statusInitialValue
  filterValue.value = ''

  emit('update:status', statusValue.value)
  emit('update:filter', filterValue.value)
  emit('onFilterReset')
}
</script>

<template>
  <SelectButton
    option-label="label"
    option-value="value"
    v-model="statusValue"
    :options="props.statusOptions"
    @change="fireFilterChange()"
  >
    <template #option="slotProps">
      {{ $t(slotProps.option.label) }}
    </template>
  </SelectButton>
  <InputGroup>
    <InputText
      v-model="filterValue"
      :placeholder="props.placeholder"
      @keydown.enter.prevent="fireFilterChange()"
      @update:modelValue="$emit('update:filter', $event)"
    />
    <Button @click="resetFilter()" icon="pi pi-times" severity="danger" />
  </InputGroup>
  <Button
    class="w-32"
    @click="fireFilterChange()"
    :label="$t('search-control.actions.search')"
  />
  <Button
    class="w-32"
    severity="success"
    @click="$emit('onNew')"
    :label="$t('search-control.actions.new')"
  />
</template>
