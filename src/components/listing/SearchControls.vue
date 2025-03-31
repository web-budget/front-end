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
    default: 'search-controls.filter-not-defined',
  },
  statusOptions: {
    type: Array,
    default: () => [
      { label: 'search-controls.all', value: 'ALL' },
      { label: 'search-controls.inactive', value: 'INACTIVE' },
      { label: 'search-controls.active', value: 'ACTIVE' },
    ],
    required: true,
  },
})

const statusValue = ref(props.status)
const filterValue = ref(props.filter)

const emit = defineEmits(['update:status', 'onFilterChange', 'onNew'])

function fireFilterChange() {
  emit('update:status', statusValue.value)
  emit('onFilterChange')
}

function resetFilter() {
  statusValue.value = 'ACTIVE'
  filterValue.value = null

  emit('update:status', statusValue.value)
  emit('update:filter', filterValue.value)
  emit('onFilterChange')
}
</script>

<template>
  <SelectButton
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
    class="w-1/12"
    @click="fireFilterChange()"
    :label="$t('search-controls.actions.search')"
  />
  <Button
    class="w-1/12"
    severity="success"
    @click="$emit('onNew')"
    :label="$t('search-controls.actions.new')"
  />
</template>
