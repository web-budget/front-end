<template>
  <div class="card card-md">
    <Form
      v-slot="{ errors }"
      @submit="doPasswordRecover"
      :initial-values="formDefaults"
      :validation-schema="passwordSchema"
    >
      <div class="card-body">
        <h2 class="card-title text-center mb-4">
          {{ $t('recover-password.title') }}
        </h2>
        <p class="text-muted mb-4 text-center">
          {{ $t('recover-password.subtitle') }}
        </p>
        <div class="mb-3">
          <form-field
            type="password"
            name="password"
            autocomplete="off"
            :errors="errors.password"
            label="recover-password.form.password"
          />
        </div>
        <div class="mb-3">
          <form-field
            type="password"
            autocomplete="off"
            name="confirmation"
            :errors="errors.confirmation"
            label="recover-password.form.password-confirmation"
          />
        </div>
        <div class="form-footer">
          <button
            type="submit"
            :class="{ disabled: loading }"
            class="btn btn-primary w-100"
          >
            {{ $t('recover-password.action.change-password') }}
          </button>
        </div>
      </div>
    </Form>
  </div>
  <div class="text-center text-muted mt-3">
    <router-link :to="{ name: 'login' }">
      {{ $t('recover-password.action.back-to-login') }}
    </router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { reactive, ref } from 'vue'

import { Form } from 'vee-validate'

import FormField from '@/components/forms/FormField.vue'

import UserAccountClient from '@/clients/user-account.client'

import { useNotificationHandler } from '@/composables/useNotificationHandler'
import { useHttpErrorHandler } from '@/composables/useHttpErrorHandler'

import { passwordSchema } from '@/models/administration/user.model'

const route = useRoute()

const formDefaults = reactive({
  password: '',
  confirmation: '',
})

const { displaySuccess } = useNotificationHandler()
const { handleError } = useHttpErrorHandler()

const userAccountClient = new UserAccountClient()

const loading = ref(false)

async function doPasswordRecover(values, { resetForm }) {
  try {
    loading.value = true
    await userAccountClient.recoverPassword({
      token: route.query.token,
      email: route.query.email,
      password: values.password,
    })
    resetForm()
    displaySuccess('recover-password.password-changed')
  } catch (error) {
    handleError(error.response)
  } finally {
    loading.value = false
  }
}
</script>
