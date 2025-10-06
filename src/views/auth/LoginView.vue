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
      doAfterLoginNavigation()
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

async function validateSession() {
  const isValid = await isSessionValid()
  if (isValid) {
    doAfterLoginNavigation()
  }
}

onMounted(async () => {
  await validateSession()
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
    <Button type="submit" class="w-full mt-6" :loading="loading" :label="$t('login.form.sign-in')" />
    <div class="flex justify-center mt-8">
      <RouterLink
        :to="{ name: 'forgot-password' }"
        class="font-medium no-underline cursor-pointer text-primary"
      >
        {{ $t('login.form.forgot-password') }}
      </RouterLink>
    </div>
  </Form>
</template>
