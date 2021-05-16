<template>
  <div class="columns">
    <aside class="column is-2">
      <b-menu>
        <b-menu-list :label="$t('page-menu.dashboard.title')">
        </b-menu-list>
      </b-menu>
    </aside>
    <fade-transition :duration="200" origin="center top" mode="out-in">
      <router-view />
    </fade-transition>
  </div>
</template>

<script>
import { FadeTransition } from 'vue2-transitions'

export default {
  name: 'dashboard-layout',
  components: {
    FadeTransition
  }
}
</script>
