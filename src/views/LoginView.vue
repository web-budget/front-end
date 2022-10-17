<template>
  <div class="card card-md">
    <div class="card-body">
      <h2 class="card-title text-center mb-4">{{ $t('login.title') }}</h2>
      <div class="mb-3">
        <label class="form-label">
          {{ $t('login.form.username') }}
        </label>
        <input-text
          class="form-control"
          v-model="form.username"
          :placeholder="$t('login.form.username-placeholder')"
        />
      </div>
      <div class="mb-2">
        <label class="form-label">
          {{ $t('login.form.password') }}
          <span class="form-label-description">
            <router-link :to="{ name: 'forgot-password' }">
              {{ $t('login.action.forgot-password') }}
            </router-link>
          </span>
        </label>
        <div class="input-group input-group-flat">
          <password
            :feedback="false"
            input-class="form-control"
            v-model="form.password"
            :placeholder="$t('login.form.password-placeholder')"
          />
        </div>
      </div>
      <div class="form-footer">
        <button @click="doLogin()" class="btn btn-primary w-100">{{ $t('login.action.sign-in') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

import router from '@/router'

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'

const form = reactive({
  username: '',
  password: ''
})

function doLogin() {
  router.push({ name: 'home' })
}
</script>
