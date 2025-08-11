<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

import { useNotification } from '@/composables/useNotification'

import { useSessionStore } from '@/stores/session.store'

import { formDefaults, validationSchema } from '@/models/credentials.model'

const route = useRoute()
const router = useRouter()

const { loading } = storeToRefs(useSessionStore())

const { isSessionValid, login } = useSessionStore()

const { showError } = useNotification()

async function doLogin({ values }) {
  await login(
    values,
    () => {
      router.push({ name: 'home' })
    },
    () => {
      showError('error.login.detail', 'error.login.description')
    },
  )
}

function doAfterLoginNavigation() {
  const redirectTo = route.query.redirect
  if (redirectTo) {
    router.push({ path: redirectTo })
  } else {
    router.push({ name: 'home' })
  }
}

function validateSession() {
  const isValid = isSessionValid()
  if (isValid) {
    doAfterLoginNavigation()
  }
}

onMounted(async () => {
  validateSession()
})
</script>

<template>
  <div class="text-center mb-8">
    <span class="text-muted-color font-medium">{{ $t('login.title') }}</span>
  </div>
  <Form @submit="doLogin" :initialValues="formDefaults" :resolver="validationSchema">
    <label for="email" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">
      {{ $t('login.form.email') }}
    </label>
    <InputText
      id="email"
      type="email"
      name="username"
      class="w-full md:w-[30rem] mb-8"
      :placeholder="$t('login.form.email-placeholder')"
    />
    <label
      for="password"
      class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"
    >
      {{ $t('login.form.password') }}
    </label>
    <Password
      fluid
      id="password"
      class="mb-4"
      :feedback="false"
      :toggleMask="true"
      name="password"
      :placeholder="$t('login.form.password-placeholder')"
    ></Password>
    <div class="flex items-center justify-between mt-8 mb-6 gap-8">
      <div class="flex items-center">
        <Checkbox binary class="mr-2" id="rememberme" name="remember"></Checkbox>
        <label for="rememberme">{{ $t('login.form.remember-me') }}</label>
      </div>
      <RouterLink
        :to="{ name: 'forgot-password' }"
        class="font-medium no-underline ml-2 text-right cursor-pointer text-primary"
      >
        {{ $t('login.form.forgot-password') }}
      </RouterLink>
    </div>
    <Button type="submit" class="w-full" :loading="loading" :label="$t('login.form.sign-in')" />
  </Form>
</template>
