<template>
  <div>
    <main-menu />
    <error-handler></error-handler>
    <div id="content" class="section">
      <router-view/>
    </div>
  </div>
</template>

<script>
import MainMenu from '@/components/menus/MainMenu.vue'

import ErrorHandler from '@/components/ErrorHandler.vue'

export default {
  name: 'default-layout',
  components: {
    MainMenu,
    ErrorHandler
  }
}
</script>
