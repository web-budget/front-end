<template>
  <page-content pre-title="cost-center.header.pre-title" title="cost-center.header.title">
    <form>
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <div class="btn-group">
              <input
                id="rdAll"
                type="radio"
                name="rdStatus"
                value="false"
                class="btn-check"
                v-model="formData.active">
              <label for="rdAll" class="btn btn-outline-danger">
                {{ $t('form.status.inactive') }}
              </label>
              <input
                id="rdActive"
                type="radio"
                name="rdStatus"
                value="true"
                class="btn-check"
                v-model="formData.active">
              <label for="rdActive" class="btn btn-outline-success">
                {{ $t('form.status.active') }}
              </label>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12 mb-3">
                <label class="form-label required">{{ $t('cost-center.form.name') }}</label>
                <input type="text" class="form-control" v-model="formData.name" autocomplete="off"/>
              </div>
              <div class="col-12">
                <label class="form-label">{{ $t('cost-center.form.description') }}</label>
                <textarea class="form-control" rows="4" v-model="formData.description" data-bs-toggle="autosize" />
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col text-end">
                <button class="btn btn-ghost-secondary me-3" @click.prevent="goBack()">{{ $t('form.actions.back') }}</button>
                <button class="btn btn-primary" @click.prevent="save()">{{ $t('form.actions.save') }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </page-content>
</template>

<script setup>
import { reactive } from 'vue'

import router from '@/router'

// import { useHttpErrorHandler } from '@/composables/useHttpErrorHandler.js'
import { useMessageHandler } from '@/composables/useMessageHandler.js'

import PageContent from '@/components/home/PageContent.vue'

const { displaySuccess } = useMessageHandler()
// const { handleError } = useHttpErrorHandler()

const formData = reactive({
  active: true,
  name: null,
  description: null
})

function save() {
  try {
    // loading true
    console.log(formData)
    displaySuccess('form.messages.saved')
  } catch (error) {
    // handleError(error.response)
  } finally {
    // loading false
  }
}

function goBack() {
  router.go(-1)
}
</script>
