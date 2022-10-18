<template>
  <div class='card card-md'>
    <div class='card-body'>
      <h2 class='card-title text-center mb-4'>{{ $t('recover-password.title') }}</h2>
      <p class='text-muted mb-4 text-center'>{{ $t('recover-password.subtitle') }}</p>
      <div class='mb-3'>
        <label class='form-label'>
          {{ $t('recover-password.form.password') }}
        </label>
        <password
          :feedback='false'
          input-class='form-control'
          v-model='form.password'
          :placeholder="$t('recover-password.form.password-placeholder')"
        />
      </div>
      <div class='mb-3'>
        <label class='form-label'>
          {{ $t('recover-password.form.new-password') }}
        </label>
        <password
          :feedback='false'
          input-class='form-control'
          v-model='form.newPassword'
          :placeholder="$t('recover-password.form.new-password-placeholder')"
        />
      </div>
      <div class='form-footer'>
        <button class='btn btn-primary w-100' @click='onSubmit()'>
          {{ $t('recover-password.action.change-password') }}
        </button>
      </div>
    </div>
  </div>
  <div class='text-center text-muted mt-3'>
    <router-link :to="{ name: 'login' }">{{ $t('recover-password.action.back-to-login') }}</router-link>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

import Password from 'primevue/password'

const route = useRoute()

const form = reactive({
  password: '',
  newPassword: ''
})

function onSubmit() {
  console.log(form)
  console.log(route.params.token)
}
</script>
