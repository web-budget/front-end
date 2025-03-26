<script setup>
import { useRoute } from 'vue-router'
import { useLayout } from '@/layout/composables/layout'
import { useSessionStore } from '@/stores/session.store'

const { toggleDarkMode, isDarkTheme } = useLayout()

const { logout } = useSessionStore()

const route = useRoute()

function isActive(menu) {
  return route.path.includes(menu)
}
</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <router-link to="/" class="layout-topbar-logo">
        <span class="wb-logo" style="font-size: 1.5em">web</span>
        <span class="wb-logo wb-logo-black" style="font-size: 1.5em">Budget</span>
      </router-link>
    </div>

    <div class="layout-main-menu">
      <router-link
        to="/registration"
        :class="['layout-main-menu-item', { 'active-route': isActive('registration') }]"
      >
        {{ $t('menu.registration') }}
      </router-link>
      <router-link
        to="/financial"
        :class="['layout-main-menu-item', { 'active-route': isActive('financial') }]"
      >
        {{ $t('menu.financial') }}
      </router-link>
      <router-link
        to="/investment"
        :class="['layout-main-menu-item', { 'active-route': isActive('investment') }]"
      >
        {{ $t('menu.investment') }}
      </router-link>
      <router-link
        to="/configuration"
        :class="['layout-main-menu-item', { 'active-route': isActive('configuration') }]"
      >
        {{ $t('menu.configuration') }}
      </router-link>
    </div>

    <div class="layout-topbar-actions">
      <div class="layout-config-menu">
        <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
          <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
        </button>
      </div>

      <button
        class="layout-topbar-menu-button layout-topbar-action"
        v-styleclass="{
          selector: '@next',
          enterFromClass: 'hidden',
          enterActiveClass: 'animate-scalein',
          leaveToClass: 'hidden',
          leaveActiveClass: 'animate-fadeout',
          hideOnOutsideClick: true,
        }"
      >
        <i class="pi pi-ellipsis-v"></i>
      </button>

      <div class="layout-topbar-menu hidden lg:block">
        <div class="layout-topbar-menu-content">
          <button type="button" class="layout-topbar-action">
            <i class="pi pi-calendar"></i>
            <span>Calendar</span>
          </button>
          <button type="button" class="layout-topbar-action">
            <i class="pi pi-inbox"></i>
            <span>Messages</span>
          </button>
          <button type="button" class="layout-topbar-action" @click="logout()">
            <i class="pi pi-user"></i>
            <span>Profile</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
