<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useAccountStore } from '@/stores/account.store'
import { useNotification } from '@/composables/useNotification'

import { formDefaults, validationSchema } from '@/models/forgot-password.model'

const router = useRouter()

const { showSuccess } = useNotification()

const { forgotPassword } = useAccountStore()
const { loading } = storeToRefs(useAccountStore())

const theForm = ref()

function recoverPassword({ valid, values }) {
  if (!valid) return

  forgotPassword(values, () => {
    showSuccess('notification.success', 'notification.forgot-password.requested')
    theForm.value.reset()
  })
}

function backToLogin() {
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="text-center mb-8">
    <span class="text-muted-color font-medium">{{ $t('forgot-password.title') }}</span>
  </div>
  <Form
    ref="theForm"
    @submit="recoverPassword"
    :initialValues="formDefaults"
    :resolver="validationSchema"
  >
    <label for="email" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">
      {{ $t('forgot-password.form.email') }}
    </label>
    <InputText
      id="email"
      type="email"
      name="email"
      class="w-full md:w-120 mb-2"
      :placeholder="$t('forgot-password.form.email-placeholder')"
    />
    <div class="flex items-center justify-between mt-8 mb-6 gap-8">
      <Button
        class="w-full"
        variant="outlined"
        :loading="loading"
        :label="$t('form.back')"
        @click.prevent="backToLogin()"
      />
      <Button type="submit" class="w-full" :loading="loading" :label="$t('form.recover')" />
    </div>
  </Form>
</template>
