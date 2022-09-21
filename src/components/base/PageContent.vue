<template>
  <div class="container-xl">
    <div class="page-header d-print-none text-white">
      <div class="row g-2 align-items-center">
        <div class="col">
          <div class="page-pretitle">
            {{ $t(props.title) }}
          </div>
          <h2 class="page-title">
            {{ $t(props.action) }}
          </h2>
        </div>
      </div>
    </div>
  </div>
  <div class="page-body">
    <div class="container-xl">
      <div class="row row-deck row-cards">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  action: {
    type: String,
    default: ''
  }
})
</script>
