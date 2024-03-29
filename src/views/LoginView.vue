<template>
  <div class="card card-md">
    <div class="card-body">
      <h2 class="card-title text-center mb-4">{{ $t('login.title') }}</h2>
      <div class="mb-3">
        <label class="form-label">
          {{ $t('login.form.username') }}
        </label>
        <input
          type="email"
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
          <input
            type="password"
            class="form-control"
            v-model="credentials.password"
            :placeholder="$t('login.form.password-placeholder')"
          />
        </div>
      </div>
      <div class="form-footer">
        <a
          @click.prevent="doLogin()"
          class="btn btn-primary w-100"
          :class="{ disabled: loading }"
        >
          {{ $t('login.action.sign-in') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import router from '@/router'

import TokenClient from '@/clients/administration/token.client'

import { useUserSession } from '@/stores/user-session.store'

import { useNotificationHandler } from '@/composables/useNotificationHandler'

const { login, isValid } = useUserSession()

const route = useRoute()

const loading = ref(false)
const credentials = reactive({
  username: '',
  password: '',
})

const { displayWarn } = useNotificationHandler()

async function doLogin() {
  const tokenClient = new TokenClient()

  try {
    loading.value = true
    const { data } = await tokenClient.generate(credentials)
    login(data)
    doAfterLoginNavigation()
  } catch (error) {
    if (error.response) {
      const { status } = error.response
      if (status === 401 || status === 403) {
        displayWarn('login.errors.unauthorized')
      }
    }
  } finally {
    loading.value = false
  }
}

function doAfterLoginNavigation() {
  const redirectTo = route.query.redirect

  if (redirectTo) {
    router.push({ path: redirectTo })
  } else {
    router.push({ name: 'home' })
  }
}

onMounted(() => {
  if (isValid()) {
    doAfterLoginNavigation()
  }
})
</script>
