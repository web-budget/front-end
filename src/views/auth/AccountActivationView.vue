<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

import { useAccountStore } from '@/stores/account.store'

const { activate } = useAccountStore()
const { loading } = storeToRefs(useAccountStore())

const route = useRoute()

const activationSucceed = ref(false)

function activateAccount() {
  const values = {
    token: route.query.token,
    email: route.query.email,
  }

  activate(values, () => {
    activationSucceed.value = true
  })
}

onMounted(async () => {
  activateAccount()
})
</script>

<template>
  <div class="text-center flex flex-col gap-4">
    <span v-if="loading" class="text-muted-color font-medium">
      {{ $t('account-activation.activating') }}
    </span>
    <span v-if="!loading && activationSucceed" class="text-muted-color font-medium">
      {{ $t('account-activation.success') }}
    </span>
    <span v-else class="text-muted-color font-medium">
      {{ $t('account-activation.error') }}
    </span>
    <RouterLink
      :to="{ name: 'login' }"
      class="font-medium no-underline cursor-pointer text-primary"
    >
      {{ $t('account-activation.back-to-login') }}
    </RouterLink>
  </div>
</template>
