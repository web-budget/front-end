<template>
  <page-content
    title="user.title"
    :action="updating ? 'pages.actions.updating' : 'pages.actions.creating'"
  >
    <Form
      ref="form"
      v-slot="{ errors }"
      @submit="selectAction"
      :initial-values="formDefaults"
      :validation-schema="
        updating ? updateValidationSchema : createValidationSchema
      "
    >
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <status-toggle name="active" />
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-5">
                <form-field
                  type="text"
                  name="name"
                  autocomplete="off"
                  :errors="errors.name"
                  label="user.form.name"
                />
              </div>
              <div class="col-4">
                <form-field
                  type="text"
                  name="email"
                  :disabled="updating"
                  autocomplete="off"
                  :errors="errors.email"
                  label="user.form.email"
                />
              </div>
              <div class="col-3">
                <form-select
                  name="defaultLanguage"
                  :options="defaultLanguages"
                  :errors="errors.defaultLanguage"
                  label="user.form.default-language"
                />
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-6">
                <div class="row">
                  <div class="col-6">
                    <form-field
                      type="password"
                      name="password"
                      :disabled="updating"
                      autocomplete="new-password"
                      :errors="errors.password"
                      label="user.form.password"
                    />
                  </div>
                  <div class="col-6">
                    <form-field
                      type="password"
                      name="confirmation"
                      :disabled="updating"
                      autocomplete="new-password"
                      :errors="errors.confirmation"
                      label="user.form.confirmation"
                    />
                  </div>
                </div>
              </div>
              <div class="col-6">
                <multi-value-form-field
                  name="authorities"
                  label="user.form.authorities"
                  :errors="errors.authorities"
                />
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col" v-show="updating">
                <a
                  class="btn btn-ghost-warning me-3"
                  data-bs-toggle="modal"
                  data-bs-target="#changePasswordDialog"
                >
                  {{ $t('form.actions.change-password') }}
                </a>
              </div>
              <div class="col" v-show="!updating">
                <form-checkbox
                  id="chNotifyActivation"
                  :value="true"
                  name="sendActivationEmail"
                  label="user.form.request-account-activation"
                />
              </div>
              <div class="col text-end">
                <a
                  class="btn btn-ghost-danger me-3"
                  @click.prevent="changeToList()"
                >
                  {{ $t('form.actions.cancel') }}
                </a>
                <button
                  type="submit"
                  class="btn btn-primary"
                  :class="{ disabled: loading }"
                >
                  <span v-if="updating">
                    {{ $t('form.actions.update') }}
                  </span>
                  <span v-else>
                    {{ $t('form.actions.create') }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
    <change-password-dialog v-if="props.id" :userId="props.id" />
  </page-content>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import router from '@/router'

import { Form } from 'vee-validate'

import { useHttpErrorHandler } from '@/composables/useHttpErrorHandler.js'
import { useNotificationHandler } from '@/composables/useNotificationHandler.js'

import FormField from '@/components/forms/FormField.vue'
import FormSelect from '@/components/forms/FormSelect.vue'
import PageContent from '@/components/page/PageContent.vue'
import StatusToggle from '@/components/forms/StatusToggle.vue'
import MultiValueFormField from '@/components/forms/MultiValueFormField.vue'

import ChangePasswordDialog from '@/views/administration/user/ChangePasswordDialog.vue'

import UserClient from '@/clients/administration/user.client'

import {
  formDefaults,
  defaultLanguages,
  updateValidationSchema,
  createValidationSchema,
} from '@/models/administration/user.model.js'
import FormCheckbox from '@/components/forms/FormCheckbox.vue'

const props = defineProps({
  id: {
    type: String,
    default: null,
  },
  updating: {
    type: Boolean,
    default: false,
  },
})

const { displaySuccess } = useNotificationHandler()
const { handleError } = useHttpErrorHandler()

const userClient = new UserClient()

const form = ref(null)
const loading = ref(false)

async function prepareForUpdate() {
  try {
    loading.value = true
    const { data } = await userClient.findById(props.id)
    form.value.setValues({ ...data })
  } catch (error) {
    handleError(error.response)
  } finally {
    loading.value = false
  }
}

function selectAction(values, { resetForm }) {
  if (props.updating) {
    doUpdate(values)
  } else {
    doCreate(values, resetForm)
  }
}

async function doCreate(values, resetForm) {
  try {
    loading.value = true
    await userClient.create(values)
    resetForm()
    displaySuccess('form.messages.created')
  } catch (error) {
    handleError(error.response)
  } finally {
    loading.value = false
  }
}

async function doUpdate(values) {
  try {
    loading.value = true
    console.log(values)
    await userClient.update(props.id, values)
    await prepareForUpdate()
    displaySuccess('form.messages.updated')
  } catch (error) {
    handleError(error.response)
  } finally {
    loading.value = false
  }
}

function changeToList() {
  router.push({ name: 'users' })
}

onMounted(() => {
  if (props.updating && props.id) {
    prepareForUpdate()
  }
})
</script>

<style scoped>
#chNotifyActivation {
  position: relative;
  top: 8px;
}
</style>
