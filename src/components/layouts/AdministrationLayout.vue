<template>
  <div class="columns">
    <aside class="column is-2">
      <b-menu>
        <b-menu-list :label="$t('page-menu.administration.title')">
          <b-menu-item tag="router-link" :label="$t('page-menu.administration.users')"
            :to="{ name: 'users' }"/>
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
  name: 'administration-layout',
  components: {
    FadeTransition
  }
}
</script>
