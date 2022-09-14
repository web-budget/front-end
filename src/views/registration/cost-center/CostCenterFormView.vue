<template>
  <page-content pre-title="cost-center.header.pre-title" title="cost-center.header.title">
    <Form @submit="doSave" :validation-schema="schema" :initial-values="formDefaults" v-slot="{ errors }">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <div class="btn-group">
              <Field
                id="rdAll"
                type="radio"
                value="false"
                class="btn-check"
                name="active" />
              <label for="rdAll" class="btn btn-outline-danger">
                {{ $t('form.status.inactive') }}
              </label>
              <Field
                id="rdActive"
                type="radio"
                value="true"
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
                <button class="btn btn-ghost-secondary me-3" @click.prevent="goBack()">{{ $t('form.actions.back') }}</button>
                <button type="submit" class="btn btn-primary">{{ $t('form.actions.save') }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  </page-content>
</template>

<script setup>
import { reactive } from 'vue'

import router from '@/router'

import * as Yup from 'yup'

import { Form, Field } from 'vee-validate'

// import { useHttpErrorHandler } from '@/composables/useHttpErrorHandler.js'
// import { useMessageHandler } from '@/composables/useMessageHandler.js'

import PageContent from '@/components/home/PageContent.vue'

// const { displaySuccess } = useMessageHandler()
// const { handleError } = useHttpErrorHandler()

const formDefaults = reactive({
  active: 'true',
  name: null,
  description: null
})

const schema = Yup.object().shape({
  name: Yup.string().min(3).max(150).required()
})

function doSave(values) {
  console.log(values)
  // try {
  //   // loading true
  //   console.log(formData)
  //   displaySuccess('form.messages.saved')
  // } catch (error) {
  //   // handleError(error.response)
  // } finally {
  //   // loading false
  // }
}

function goBack() {
  router.go(-1)
}
</script>
