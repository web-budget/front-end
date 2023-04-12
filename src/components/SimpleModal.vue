<template>
  <div
    :id="props.id"
    role="dialog"
    tabindex="-1"
    aria-hidden="true"
    class="modal modal-blur fade"
    @click="$emit('onClose')"
    @keyup.esc="$emit('onClose')"
  >
    <div class="modal-dialog modal-dialog-centered" role="document" @click.stop>
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $t(props.title) }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @click="$emit('onClose')"
          />
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})

defineEmits(['onClose'])
</script>
