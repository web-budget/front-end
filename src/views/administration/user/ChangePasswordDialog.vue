<template>
  <simple-modal
    @onClose="onClose()"
    id="changePasswordDialog"
    title="modal.change-password.title"
  >
    <Form
      ref="form"
      @submit="doPasswordChange"
      :initial-values="formDefaults"
      v-slot="{ errors, handleReset }"
      :validation-schema="passwordSchema"
    >
      <div class="modal-body">
        <div class="row">
          <div class="col-12 mb-3">
            <form-field
              type="password"
              name="password"
              autocomplete="new-password"
              :errors="errors.password"
              label="user.form.password"
            />
          </div>
          <div class="col-12 mb-3">
            <form-field
              type="password"
              name="confirmation"
              autocomplete="new-password"
              :errors="errors.confirmation"
              label="user.form.confirmation"
            />
          </div>
          <div class="col-12">
            <form-checkbox
              name="temporary"
              :value="true"
              label="user.form.temporary-password"
            />
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          @click="handleReset"
          data-bs-dismiss="modal"
          class="btn btn-ghost-danger"
        >
          {{ $t('form.actions.cancel') }}
        </button>
        <button
          type="submit"
          class="btn btn-primary"
          data-bs-dismiss="modal"
          :class="{ disabled: loading }"
        >
          {{ $t('form.actions.change') }}
        </button>
      </div>
    </Form>
  </simple-modal>
</template>

<script setup>
import { reactive, ref } from 'vue'

import { Form } from 'vee-validate'

import { useHttpErrorHandler } from '@/composables/useHttpErrorHandler'
import { useMessageHandler } from '@/composables/useMessageHandler'

import SimpleModal from '@/components/SimpleModal.vue'
import FormField from '@/components/forms/FormField.vue'
import FormCheckbox from '@/components/forms/FormCheckbox.vue'

import UserClient from '@/clients/administration/user.client'

import { passwordSchema } from '@/models/administration/user.model.js'

const { handleError } = useHttpErrorHandler()
const { displaySuccess } = useMessageHandler()

const form = ref(null)
const loading = ref(false)

const userClient = new UserClient()

const props = defineProps({
  userId: {
    type: String,
    default: null,
    required: true,
  },
})

const formDefaults = reactive({
  password: '',
  confirmation: '',
  temporary: true,
})

async function doPasswordChange(values, { resetForm }) {
  try {
    loading.value = true
    await userClient.updatePassword(props.userId, values)
    resetForm()
    displaySuccess('form.messages.password-updated')
  } catch (error) {
    handleError(error.response)
  } finally {
    loading.value = false
  }
}

function onClose() {
  form.value.resetForm()
}
</script>
