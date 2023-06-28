<template>
  <div class="card card-md">
    <div v-if="activationSuccess" class="card-body">
      <h2 class="card-title text-center mb-4">
        {{ $t('account-activation.title-success') }}
      </h2>
      <p class="text-muted text-center">
        <router-link :to="{ name: 'login' }">
          {{ $t('account-activation.action.send-me-back') }}
        </router-link>
      </p>
    </div>
    <div v-else class="card-body">
      <h2 class="card-title text-center mb-4">
        {{ $t('account-activation.title-error') }}
      </h2>
      <p class="text-muted text-center">
        {{ $t('account-activation.subtitle-error') }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { useRoute } from 'vue-router'

import UserAccountClient from '@/clients/user-account.client'

const userAccountClient = new UserAccountClient()

const route = useRoute()

const loading = ref(false)
const activationSuccess = ref(false)

async function doAccountActivation() {
  try {
    loading.value = true
    await userAccountClient.activateAccount({
      token: route.query.token,
      email: route.query.email,
    })
    activationSuccess.value = true
  } catch (error) {
    console.error(error.message)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  doAccountActivation()
})
</script>
