<template>
  <page-content
    title="cost-center.title"
    :action="deleting ? 'pages.actions.deleting' : 'pages.actions.detailing'"
  >
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <status-toggle name="active" disabled />
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-12 mb-3">
              <form-field disabled name="name" label="cost-center.form.name" />
            </div>
            <div class="col-12">
              <form-field
                disabled
                rows="4"
                as="textarea"
                name="description"
                label="cost-center.form.description"
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
              <a class="btn btn-ghost-secondary me-3" @click.prevent="changeToList()">
                {{ $t('form.actions.back-to-list') }}
              </a>
              <a class="btn btn-primary me-3" @click.prevent="changeToUpdate()">
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
import PageContent from '@/components/page/PageContent.vue'
import StatusToggle from '@/components/forms/StatusToggle.vue'

import CostCenterClient from '@/clients/registration/cost-center.client'

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

const costCenterClient = new CostCenterClient()

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
  router.push({
    name: 'cost-centers.update',
    params: { id: props.id },
  })
}

function changeToDelete() {
  router.push({
    name: 'cost-centers.delete',
    params: { id: props.id },
  })
}

function changeToList() {
  router.push({ name: 'cost-centers' })
}

onMounted(async () => {
  if (props.id) {
    try {
      const { data } = await costCenterClient.findById(props.id)
      setValues({
        name: data.name,
        active: data.active,
        description: data.description,
      })
    } catch (error) {
      handleError(error.response)
    }
  }
})
</script>
