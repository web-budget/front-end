<template>
  <div class="col-3 pe-2">
    <div class="btn-group w-100">
      <input
        id="rdAll"
        type="radio"
        name="rdStatus"
        value="ALL"
        class="btn-check"
        v-model="selectedStatus"
        @click="$emit('onFilter')"
        @change="$emit('update:status', $event.target.value)">
      <label for="rdAll" class="btn btn-outline-primary">
        {{ $t('search-controls.status.all') }}
      </label>
      <input
        id="rdActive"
        type="radio"
        name="rdStatus"
        value="ACTIVE"
        class="btn-check"
        v-model="selectedStatus"
        @click="$emit('onFilter')"
        @change="$emit('update:status', $event.target.value)">
      <label for="rdActive" class="btn btn-outline-success">
        {{ $t('search-controls.status.active') }}
      </label>
      <input
        id="rdInactive"
        type="radio"
        name="rdStatus"
        value="INACTIVE"
        class="btn-check"
        v-model="selectedStatus"
        @click="$emit('onFilter')"
        @change="$emit('update:status', $event.target.value)">
      <label for="rdInactive" class="btn btn-outline-danger" >
        {{ $t('search-controls.status.inactive') }}
      </label>
    </div>
  </div>
  <div class="col-8 pe-2">
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        :value="props.filter"
        :placeholder="props.placeholder"
        @keydown.enter.prevent="$emit('onFilter')"
        @input="$emit('update:filter', $event.target.value)">
      <button type="button" class="btn" @click="$emit('onFilter')">
        <search-icon/>
      </button>
    </div>
  </div>
  <div class="col-1">
    <button type="button" class="btn btn-primary w-100" @click="$emit('onAdd')">
      {{ $t('search-controls.actions.add') }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { SearchIcon } from 'vue-tabler-icons'

const props = defineProps({
  filter: {
    type: String,
    default: '',
    required: true
  },
  status: {
    type: String,
    default: 'ACTIVE',
    required: true
  },
  placeholder: {
    type: String,
    default: 'Filtering fields not defined'
  }
})

const selectedStatus = ref(props.status)

defineEmits(['onFilter', 'onAdd', 'update:filter', 'update:status'])
</script>

<style scoped>
.btn .icon {
  margin: 0;
}
</style>
