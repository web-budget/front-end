<template>
  <div class="container-xl">
    <div class="page-header d-print-none text-white">
      <div class="row g-2 align-items-center">
        <div class="col">
          <div class="page-pretitle">
            {{ $t(props.preTitle) }}
          </div>
          <h2 class="page-title">
            {{ $t(props.title) }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  preTitle: {
    type: String,
    default: ''
  }
})
</script>
