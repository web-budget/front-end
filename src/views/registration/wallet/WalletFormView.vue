<template>
  <page-content
    title="wallet.title"
    :action="updating ? 'pages.actions.updating' : 'pages.actions.creating'"
  >
    <Form
      ref="form"
      v-slot="{ errors }"
      @submit="selectAction"
      :initial-values="formDefaults"
      :validation-schema="validationSchema"
    >
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <status-toggle name="active" />
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <div class="col mb-3">
                  <form-field
                    type="text"
                    name="name"
                    autocomplete="off"
                    :errors="errors.name"
                    label="wallet.form.name"
                  />
                </div>
                <div class="col mb-3">
                  <form-select
                    name="type"
                    :errors="errors.type"
                    :options="walletTypes"
                    label="wallet.form.type"
                  />
                </div>
                <div class="row">
                  <div class="col-5">
                    <form-field
                      type="text"
                      name="bank"
                      :required="false"
                      autocomplete="off"
                      :errors="errors.bank"
                      label="wallet.form.bank"
                    />
                  </div>
                  <div class="col-3">
                    <form-field
                      type="text"
                      name="agency"
                      :required="false"
                      autocomplete="off"
                      :errors="errors.agency"
                      label="wallet.form.agency"
                    />
                  </div>
                  <div class="col-4">
                    <form-field
                      type="text"
                      name="number"
                      :required="false"
                      autocomplete="off"
                      :errors="errors.number"
                      label="wallet.form.number"
                    />
                  </div>
                </div>
              </div>
              <div class="col-6">
                <form-field
                  rows="4"
                  as="textarea"
                  name="description"
                  data-bs-toggle="autosize"
                  label="wallet.form.description"
                />
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col text-end">
                <a
                  @click.prevent="changeToList()"
                  class="btn btn-ghost-danger me-3"
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
  </page-content>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import router from '@/router'

import { Form } from 'vee-validate'

import { useHttpErrorHandler } from '@/composables/useHttpErrorHandler.js'
import { useMessageHandler } from '@/composables/useMessageHandler.js'

import FormField from '@/components/forms/FormField.vue'
import FormSelect from '@/components/forms/FormSelect.vue'
import PageContent from '@/components/page/PageContent.vue'
import StatusToggle from '@/components/forms/StatusToggle.vue'

import WalletClient from '@/clients/registration/wallet.client'

import {
  formDefaults,
  validationSchema,
  walletTypes,
} from '@/models/registration/wallet.model.js'

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

const { displaySuccess } = useMessageHandler()
const { handleError } = useHttpErrorHandler()

const walletClient = new WalletClient()

const form = ref(null)
const loading = ref(false)

async function prepareForUpdate() {
  try {
    loading.value = true
    const { data } = await walletClient.findById(props.id)
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
    await walletClient.create(values)
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
    await walletClient.update(props.id, values)
    prepareForUpdate()
    displaySuccess('form.messages.updated')
  } catch (error) {
    handleError(error.response)
  } finally {
    loading.value = false
  }
}

function changeToList() {
  router.push({ name: 'wallets' })
}

onMounted(() => {
  if (props.updating && props.id) {
    prepareForUpdate()
  }
})
</script>
