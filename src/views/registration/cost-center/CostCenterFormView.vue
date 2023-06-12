<template>
  <page-content
    title="cost-center.title"
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
              <div class="col-12 mb-3">
                <form-field
                  type="text"
                  name="name"
                  autocomplete="off"
                  :errors="errors.name"
                  label="cost-center.form.name"
                />
              </div>
              <div class="col-12">
                <form-field
                  rows="4"
                  as="textarea"
                  name="description"
                  data-bs-toggle="autosize"
                  label="cost-center.form.description"
                />
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="row">
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
  </page-content>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import router from '@/router'

import { Form } from 'vee-validate'

import { useHttpErrorHandler } from '@/composables/useHttpErrorHandler.js'
import { useNotificationHandler } from '@/composables/useNotificationHandler.js'

import FormField from '@/components/forms/FormField.vue'
import PageContent from '@/components/page/PageContent.vue'
import StatusToggle from '@/components/forms/StatusToggle.vue'

import CostCenterClient from '@/clients/registration/cost-center.client'

import {
  formDefaults,
  validationSchema,
} from '@/models/registration/cost-center.model.js'

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

const costCenterClient = new CostCenterClient()

const form = ref(null)
const loading = ref(false)

async function prepareForUpdate() {
  try {
    loading.value = true
    const { data } = await costCenterClient.findById(props.id)
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
    await costCenterClient.create(values)
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
    await costCenterClient.update(props.id, values)
    prepareForUpdate()
    displaySuccess('form.messages.updated')
  } catch (error) {
    handleError(error.response)
  } finally {
    loading.value = false
  }
}

function changeToList() {
  router.push({ name: 'cost-centers' })
}

onMounted(() => {
  if (props.updating && props.id) {
    prepareForUpdate()
  }
})
</script>
