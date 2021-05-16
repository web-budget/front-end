<template>
  <header class="hero is-dark">
    <div class="hero-head">
      <nav class="navbar">
        <div class="navbar-brand">
          <a href="/home" class="navbar-item">
            <!-- <img src="@/assets/images/library-vue.png" width="112" height="28" /> -->
          </a>
          <a class="navbar-item is-hidden-desktop"></a>
          <a class="navbar-item is-hidden-desktop"></a>
          <div class="navbar-burger burger" data-target="main-menu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div id="main-menu" class="navbar-menu">
          <div class="navbar-start">
            <router-link
              class="navbar-item" :to="{ name: 'dashboard' }">
              {{ $t('main-menu.dashboard') }}
            </router-link>
            <router-link
              class="navbar-item" :to="{ name: 'registration' }">
              {{ $t('main-menu.registration') }}
            </router-link>
            <router-link
              class="navbar-item" :to="{ name: 'financial' }">
              {{ $t('main-menu.financial') }}
            </router-link>
            <router-link
              class="navbar-item" :to="{ name: 'administration' }">
              {{ $t('main-menu.administration') }}
            </router-link>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <user-menu />
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import UserMenu from '@/components/menus/UserMenu.vue'

export default {
  name: 'main-menu',
  components: {
    UserMenu
  }
}
</script>
