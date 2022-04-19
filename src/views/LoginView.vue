<template>
  <div class="card card-md">
    <div class="card-body">
      <h2 class="card-title text-center mb-4">{{ $t('login.title') }}</h2>
      <div class="mb-3">
        <label class="form-label">
          {{ $t('login.form.username') }}
        </label>
        <InputText
          class="form-control"
          v-model="credentials.username"
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
          <Password
            :feedback="false"
            input-class="form-control"
            v-model="credentials.password"
            :placeholder="$t('login.form.password-placeholder')"
          />
        </div>
      </div>
      <div class="form-footer">
        <button @click="onSubmit()" class="btn btn-primary w-100">{{ $t('login.action.sign-in') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'

const credentials = reactive({
  username: '',
  password: ''
})

function onSubmit() {
  console.log(this.credentials)
}
</script>

<style scoped>
.p-password.p-inputwrapper {
  width: 100%;
}
</style>
