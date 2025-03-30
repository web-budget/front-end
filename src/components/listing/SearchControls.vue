<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const translation = useI18n()

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
})

const statusValue = ref(props.status)
const filterValue = ref(props.filter)

const options = [
  {
    label: translation.t('search-controls.all'),
    value: 'ALL',
  },
  {
    label: translation.t('search-controls.inactive'),
    value: 'INACTIVE',
  },
  {
    label: translation.t('search-controls.active'),
    value: 'ACTIVE',
  },
]

const emit = defineEmits(['update:status', 'onFilterChange'])

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
    v-model="statusValue"
    :options="options"
    option-label="label"
    option-value="value"
    @change="fireFilterChange()"
  />
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
