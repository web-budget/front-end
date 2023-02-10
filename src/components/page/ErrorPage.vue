<template>
  <div class="empty">
    <div class="empty-img">
      <img :src="require(`@/assets/img/${props.image}`)" height="128" alt="" />
    </div>
    <p class="empty-title">
      {{ $t(props.title) }}
    </p>
    <p class="empty-subtitle text-muted">
      {{ $t(props.description) }}
    </p>
    <div class="empty-action">
      <a class="btn btn-primary" @click.prevent="$emit('onAction')">
        {{ $t(props.action) }}
      </a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  action: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
})

defineEmits(['onAction'])
</script>
