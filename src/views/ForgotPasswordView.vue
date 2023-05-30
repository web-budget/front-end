<template>
  <div class="card card-md">
    <div class="card-body">
      <h2 class="card-title text-center mb-4">
        {{ $t('forgot-password.title') }}
      </h2>
      <p class="text-muted mb-4 text-center">
        {{ $t('forgot-password.subtitle') }}
      </p>
      <div class="mb-3">
        <label class="form-label">
          {{ $t('forgot-password.form.email') }}
        </label>
        <input
          type="email"
          v-model="email"
          class="form-control"
          :placeholder="$t('forgot-password.form.email-placeholder')"
        />
      </div>
      <div class="form-footer">
        <button class="btn btn-primary w-100" @click="doRecover()">
          {{ $t('forgot-password.action.send-email') }}
        </button>
      </div>
    </div>
  </div>
  <div class="text-center text-muted mt-3">
    <i18n-t tag="label" keypath="forgot-password.footer">
      <router-link :to="{ name: 'login' }">
        {{ $t('forgot-password.action.send-me-back') }}
      </router-link>
    </i18n-t>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import UserAccountClient from '@/clients/user-account.client'

import { useHttpErrorHandler } from '@/composables/useHttpErrorHandler'
import { useMessageHandler } from '@/composables/useMessageHandler'

const userAccountClient = new UserAccountClient()

const { displayInfo } = useMessageHandler()
const { handleError } = useHttpErrorHandler()

const email = ref('')
const loading = ref(false)

async function doRecover() {
  try {
    loading.value = true
    await userAccountClient.forgotPassword(email.value)
    email.value = ''
    displayInfo('forgot-password.wait')
  } catch (error) {
    handleError(error.response)
  } finally {
    loading.value = false
  }
}
</script>
