<script setup>
import { useRouter } from 'vue-router'

import { formDefaults, validationSchema } from '@/models/forgot-password.model'

const router = useRouter()

function recoverPassword({ valid, values }) {
  if (!valid) return

  console.log(values)
}

function backToLogin() {
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="text-center mb-8">
    <span class="text-muted-color font-medium">{{ $t('forgot-password.title') }}</span>
  </div>
  <Form @submit="recoverPassword" :initialValues="formDefaults" :resolver="validationSchema">
    <label for="email" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">
      {{ $t('forgot-password.form.email') }}
    </label>
    <InputText id="email" type="email" name="username" class="w-full md:w-[30rem] mb-2" />
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
