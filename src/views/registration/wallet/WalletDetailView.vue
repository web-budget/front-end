<template>
  <page-content
    title="wallet.title"
    :action="deleting ? 'pages.actions.deleting' : 'pages.actions.detailing'"
  >
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <status-toggle name="active" disabled />
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-6">
              <div class="col mb-3">
                <form-field disabled name="name" label="wallet.form.name" />
              </div>
              <div class="col mb-3">
                <form-select
                  disabled
                  name="type"
                  :options="walletTypes"
                  label="wallet.form.type"
                />
              </div>
              <div class="row">
                <div class="col-5">
                  <form-field disabled name="bank" label="wallet.form.bank" />
                </div>
                <div class="col-3">
                  <form-field
                    disabled
                    name="agency"
                    label="wallet.form.agency"
                  />
                </div>
                <div class="col-4">
                  <form-field
                    disabled
                    name="number"
                    label="wallet.form.number"
                  />
                </div>
              </div>
            </div>
            <div class="col-6">
              <form-field
                disabled
                as="textarea"
                name="description"
                data-bs-toggle="autosize"
                label="wallet.form.description"
              />
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div v-if="deleting" class="row align-items-center">
            <div class="col text-end">
              {{ $t('form.actions.delete-confirm') }}
            </div>
            <div class="col-auto">
              <a
                @click.prevent="doDelete()"
                class="btn btn-danger me-3"
                :class="{ disabled: loading }"
              >
                {{ $t('form.actions.yes') }}
              </a>
              <a
                @click.prevent="changeToList()"
                class="btn btn-primary"
                :class="{ disabled: loading }"
              >
                {{ $t('form.actions.no') }}
              </a>
            </div>
          </div>
          <div v-else class="row">
            <div class="col text-end">
              <a
                class="btn btn-ghost-secondary me-3"
                @click.prevent="changeToList()"
              >
                {{ $t('form.actions.back-to-list') }}
              </a>
              <a class="btn btn-primary me-3" @click.prevent="changeToEdit()">
                {{ $t('form.actions.edit') }}
              </a>
              <a class="btn btn-danger" @click.prevent="changeToDelete()">
                {{ $t('form.actions.delete') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </page-content>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import router from '@/router'

import { useForm } from 'vee-validate'

import { useHttpErrorHandler } from '@/composables/useHttpErrorHandler.js'
import { useMessageHandler } from '@/composables/useMessageHandler.js'

import FormField from '@/components/forms/FormField.vue'
import FormSelect from '@/components/forms/FormSelect.vue'
import PageContent from '@/components/page/PageContent.vue'
import StatusToggle from '@/components/forms/StatusToggle.vue'

import { walletTypes } from '@/models/registration/wallet.model.js'

import WalletClient from '@/clients/registration/wallet.client'

const props = defineProps({
  id: {
    type: String,
    default: null,
  },
  deleting: {
    type: Boolean,
    default: false,
  },
})

const { setValues } = useForm()
const { displaySuccess } = useMessageHandler()
const { handleError } = useHttpErrorHandler()

const loading = ref(false)

const walletClient = new WalletClient()

async function doDelete() {
  try {
    loading.value = true
    await walletClient.delete(props.id)
    router.push({ name: 'wallets' })
    displaySuccess('form.messages.deleted')
  } catch (error) {
    handleError(error.response)
  } finally {
    loading.value = false
  }
}

function changeToEdit() {
  router.push({
    name: 'wallets.update',
    params: { id: props.id },
  })
}

function changeToDelete() {
  router.push({
    name: 'wallets.delete',
    params: { id: props.id },
  })
}

function changeToList() {
  router.push({ name: 'wallets' })
}

onMounted(async () => {
  if (props.id) {
    try {
      const { data } = await walletClient.findById(props.id)
      setValues({ ...data })
    } catch (error) {
      handleError(error.response)
    }
  }
})
</script>
