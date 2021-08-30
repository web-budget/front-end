<template>
  <div class="columns">
    <fade-transition :duration="200" origin="center top" mode="out-in">
      <router-view />
    </fade-transition>
  </div>
</template>

<script>
import { FadeTransition } from 'vue2-transitions'

export default {
  name: 'error-layout',
  components: {
    FadeTransition
  }
}
</script>
