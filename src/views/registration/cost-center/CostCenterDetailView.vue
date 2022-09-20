<template>
  <page-content title="cost-center.title" :action="deleting ? 'pages.actions.deleting' : 'pages.actions.detailing'">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h3 v-if="formData.active" class="card-title text-success">
            {{ $t('form.status.active') }}
          </h3>
          <h3 v-else class="card-title text-danger">
            {{ $t('form.status.inactive') }}
          </h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-12 mb-3">
              <label class="form-label required">{{ $t('cost-center.form.name') }}</label>
              {{ formData.name }}
            </div>
            <div class="col-12">
              <label class="form-label">{{ $t('cost-center.form.description') }}</label>
              {{ formData.description === '' ? '---' : formData.description }}
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div v-if="deleting" class="row align-items-center">
            <div class="col text-end">{{ $t('form.actions.delete-confirm') }}</div>
            <div class="col-auto">
              <a @click.prevent="doDelete()" class="btn btn-danger me-3" :class="{ 'disabled': loading }">
                {{ $t('form.actions.yes') }}
              </a>
              <a @click.prevent="goBack()" class="btn btn-primary" :class="{ 'disabled': loading }">
                {{ $t('form.actions.no') }}
              </a>
            </div>
          </div>
          <div v-else class="row">
            <div class="col text-end">
              <a class="btn btn-ghost-secondary me-3" @click.prevent="goBack()">
                {{ $t('form.actions.back') }}
              </a>
              <a class="btn btn-primary me-3" @click.prevent="changeToUpdate()">
                {{ $t('form.actions.update') }}
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
import { reactive, ref, onMounted } from 'vue'

import router from '@/router'

import { useHttpErrorHandler } from '@/composables/useHttpErrorHandler.js'
import { useMessageHandler } from '@/composables/useMessageHandler.js'

import PageContent from '@/components/home/PageContent.vue'
import CostCenterClient from '@/clients/registration/cost-center.client'

const props = defineProps({
  id: {
    type: String,
    default: null
  },
  deleting: {
    type: Boolean,
    default: false
  }
})

const { displaySuccess } = useMessageHandler()
const { handleError } = useHttpErrorHandler()

const loading = ref(false)

const costCenterClient = new CostCenterClient()

const formData = reactive({
  active: true,
  name: '',
  description: ''
})

async function doDelete() {
  try {
    loading.value = true
    await costCenterClient.delete(props.id)
    router.push({ name: 'cost-centers' })
    displaySuccess('form.messages.deleted')
  } catch (error) {
    handleError(error.response)
  } finally {
    loading.value = false
  }
}

function changeToUpdate() {
  router.push({ name: 'cost-centers.update', params: { id: props.id } })
}

function changeToDelete() {
  router.push({ name: 'cost-centers.delete', params: { id: props.id } })
}

function goBack() {
  router.go(-1)
}

onMounted(async() => {
  if (props.id) {
    try {
      const { data } = await costCenterClient.findById(props.id)
      Object.assign(formData, data)
    } catch (error) {
      handleError(error.response)
    }
  }
})
</script>
