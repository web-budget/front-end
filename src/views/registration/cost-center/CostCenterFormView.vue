<template>
  <page-content title="cost-center.title" :action="updating ? 'pages.actions.updating' : 'pages.actions.creating'">
    <Form
      @submit="selectAction"
      v-slot="{ errors }"
      :initial-values="formDefaults"
      :validation-schema="validationSchema">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <div class="btn-group">
              <Field
                id="rdAll"
                type="radio"
                :value="false"
                class="btn-check"
                name="active" />
              <label for="rdAll" class="btn btn-outline-danger">
                {{ $t('form.status.inactive') }}
              </label>
              <Field
                id="rdActive"
                type="radio"
                :value="true"
                class="btn-check"
                name="active" />
              <label for="rdActive" class="btn btn-outline-success">
                {{ $t('form.status.active') }}
              </label>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12 mb-3">
                <label class="form-label required">{{ $t('cost-center.form.name') }}</label>
                <Field type="text" name="name" class="form-control" :class="{ 'is-invalid': errors.name }" autocomplete="off"/>
                <div class="invalid-feedback">{{ errors.name }}</div>
              </div>
              <div class="col-12">
                <label class="form-label">{{ $t('cost-center.form.description') }}</label>
                <Field as="textarea" name="description" class="form-control" rows="4" data-bs-toggle="autosize" />
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col text-end">
                <button class="btn btn-ghost-secondary me-3" @click.prevent="goBack()">
                  {{ $t('form.actions.back') }}
                </button>
                <button type="submit" class="btn btn-primary" :class="{ 'disabled': loading }">
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
import { reactive, ref, onMounted } from 'vue'

import router from '@/router'

import { useI18n } from 'vue-i18n'

import { Form, Field } from 'vee-validate'

import { useHttpErrorHandler } from '@/composables/useHttpErrorHandler.js'
import { useMessageHandler } from '@/composables/useMessageHandler.js'
import { useI18nYupSchema } from '@/composables/useI18nYupSchema.js'

import PageContent from '@/components/home/PageContent.vue'
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

const { displaySuccess } = useMessageHandler()
const { handleError } = useHttpErrorHandler()

const costCenterClient = new CostCenterClient()

const { t } = useI18n()
const { yup } = useI18nYupSchema()

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
    .label(t('cost-center.form.name'))
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
