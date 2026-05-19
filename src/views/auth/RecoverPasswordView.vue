<script setup>
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

import { useAccountStore } from '@/stores/account.store'

import { useNotification } from '@/composables/useNotification'
import { formDefaults, validationSchema } from '@/models/recover-password.model'

const route = useRoute()
const router = useRouter()

const { showSuccess, showError } = useNotification()

const { recoverPassword } = useAccountStore()
const { loading } = storeToRefs(useAccountStore())

function recover({ valid, values }) {
  if (!valid) return

  const data = {
    token: route.query.token,
    email: route.query.email,
    password: values.password
  }

  recoverPassword(
    data,
    () => {
      showSuccess('notification.success', 'notification.recover-password.success')
      router.push({ name: 'login' })
    },
    () => {
      showError('notification.error', 'notification.recover-password.error')
    }
  )
}
</script>

<template>
  <div class="text-center mb-8">
    <span class="text-muted-color font-medium">{{ $t('recover-password.title') }}</span>
  </div>
  <Form @submit="recover" :resolver="validationSchema" :initialValues="formDefaults">
    <label for="email" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">
      {{ $t('recover-password.form.password') }}
    </label>
    <InputText
      id="password"
      type="password"
      name="password"
      class="w-full md:w-120 mb-6"
      :placeholder="$t('recover-password.form.password-placeholder')"
    />
    <label for="email" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">
      {{ $t('recover-password.form.confirmation') }}
    </label>
    <InputText
      id="confirmation"
      type="password"
      name="confirmation"
      class="w-full md:w-120 mb-2"
      :placeholder="$t('recover-password.form.confirmation-placeholder')"
    />
    <div class="flex items-center justify-between mt-8 mb-6 gap-8">
      <Button type="submit" class="w-full" :loading="loading" :label="$t('form.recover')" />
    </div>
  </Form>
</template>
