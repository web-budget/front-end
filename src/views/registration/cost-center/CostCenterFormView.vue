<template>
  <page-content
    title='cost-center.title'
    :action="updating ? 'pages.actions.updating' : 'pages.actions.creating'">
    <Form
      v-slot='{ errors }'
      @submit='selectAction'
      :initial-values='formDefaults'
      :validation-schema='validationSchema'>
      <div class='col-12'>
        <div class='card'>
          <div class='card-header'>
            <status-toggle name='active' />
          </div>
          <div class='card-body'>
            <div class='row'>
              <div class='col-12 mb-3'>
                <form-field
                  type='text'
                  name='name'
                  autocomplete='off'
                  :errors='errors.name'
                  label='cost-center.form.name'
                />
              </div>
              <div class='col-12'>
                <form-field
                  rows='4'
                  as='textarea'
                  name='description'
                  data-bs-toggle='autosize'
                  label='cost-center.form.description'
                />
              </div>
            </div>
          </div>
          <div class='card-footer'>
            <div class='row'>
              <div class='col text-end'>
                <a class='btn btn-ghost-secondary me-3' @click.prevent='goBack()'>
                  {{ $t('form.actions.back') }}
                </a>
                <button type='submit' class='btn btn-primary' :class="{ 'disabled': loading }">
                  <span v-if='updating'>
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
import { onMounted, reactive, ref } from 'vue'

import router from '@/router'

import { Form } from 'vee-validate'

import { useHttpErrorHandler } from '@/composables/useHttpErrorHandler.js'
import { useMessageHandler } from '@/composables/useMessageHandler.js'
import { useI18nYupSchema } from '@/composables/useI18nYupSchema.js'

import FormField from '@/components/forms/FormField.vue'
import PageContent from '@/components/base/PageContent.vue'
import StatusToggle from '@/components/forms/StatusToggle.vue'
import CostCenterClient from '@/clients/registration/cost-center.client'

const props = defineProps({
  id: {
    type: String,
    default: null
  },
  updating: {
    type: Boolean,
    default: false
  }
})

const { yup } = useI18nYupSchema()
const { displaySuccess } = useMessageHandler()
const { handleError } = useHttpErrorHandler()

const costCenterClient = new CostCenterClient()

const loading = ref(false)

const formDefaults = reactive({
  active: true,
  name: '',
  description: ''
})

const validationSchema = yup.object().shape({
  name: yup.string()
    .min(3)
    .max(150)
    .required()
})

async function prepareForUpdate() {
  try {
    loading.value = true
    const { data } = await costCenterClient.findById(props.id)
    Object.assign(formDefaults, data)
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

function goBack() {
  router.go(-1)
}

onMounted(() => {
  if (props.updating && props.id) {
    prepareForUpdate()
  }
})
</script>
