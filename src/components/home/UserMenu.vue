<template>
  <div class="nav-item dropdown">
    <a href="#" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
      <vue-gravatar :email="currentUser.email" class="avatar avatar-sm" />
      <div class="d-none d-xl-block ps-2">
        <div>{{ currentUser.name }}</div>
        <div class="mt-1 small text-muted">{{ currentUser.role }}</div>
      </div>
    </a>
    <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
      <a href="#" class="dropdown-item">{{ $t('user-menu.profile') }}</a>
      <a href="#" class="dropdown-item">{{ $t('user-menu.change-password') }}</a>
      <div class="dropdown-divider"></div>
      <a @click="doLogout" class="dropdown-item">{{ $t('user-menu.logout') }}</a>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'

// TODO mock, should come from state holder
const currentUser = {
  name: 'Admin',
  email: 'admin@webbudget.com.br',
  role: 'ADMINISTRATOR'
}

function doLogout() {
  // TODO do logout stuff here
  router.push({ name: 'login' })
}
</script>
