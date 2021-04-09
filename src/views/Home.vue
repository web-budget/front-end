<template>
  <div>
    <h1>Home</h1>
    <Menu />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

import Menu from '@/components/Menu.vue'

@Options({
  components: {
    Menu
  }
})
export default class Home extends Vue {}
</script>
