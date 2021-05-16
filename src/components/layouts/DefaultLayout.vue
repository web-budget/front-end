<template>
  <div>
    <main-menu />
    <div id="content" class="section">
      <router-view/>
    </div>
  </div>
</template>

<script>
import MainMenu from '@/components/menus/MainMenu.vue'

export default {
  name: 'default-layout',
  components: {
    MainMenu
  }
}
</script>
