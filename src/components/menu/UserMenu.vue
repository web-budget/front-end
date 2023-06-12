<template>
  <div class="nav-item dropdown">
    <a
      href="#"
      class="nav-link d-flex lh-1 text-reset p-0"
      data-bs-toggle="dropdown"
      aria-label="Open user menu"
    >
      <vue-gravatar email="admin@admin.com" class="avatar avatar-sm" />
      <div class="d-none d-xl-block ps-2">
        <div v-once>{{ userName }}</div>
        <div v-once class="mt-1 small text-muted">
          {{ userEmail }}
        </div>
      </div>
    </a>
    <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
      <a href="#" class="dropdown-item">{{ $t('user-menu.profile') }}</a>
      <a href="#" class="dropdown-item">{{
        $t('user-menu.change-password')
      }}</a>
      <div class="dropdown-divider"></div>
      <a @click="doLogout" class="dropdown-item">{{
        $t('user-menu.logout')
      }}</a>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import router from '@/router'

import { useUserSession } from '@/stores/user-session.store'

const userSessionStore = useUserSession()
const { logout } = userSessionStore
const { userName, userEmail } = storeToRefs(userSessionStore)

function doLogout() {
  logout()
  router.push({ name: 'login' })
}
</script>
