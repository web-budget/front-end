<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle"
      href="#navbar-base"
      data-bs-toggle="dropdown"
      role="button"
      aria-expanded="false"
    >
      <span class="nav-link-icon d-md-none d-lg-inline-block">
        <slot name="icon"></slot>
      </span>
      <span class="nav-link-title">{{ $t(props.label) }}</span>
    </a>
    <div class="dropdown-menu">
      <div class="dropdown-menu-columns">
        <slot name="items"></slot>
      </div>
    </div>
  </li>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
})
</script>
