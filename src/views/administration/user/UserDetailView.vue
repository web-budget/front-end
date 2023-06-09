<template>
  <page-content
    title="user.title"
    :action="deleting ? 'pages.actions.deleting' : 'pages.actions.detailing'"
  >
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <status-toggle name="active" disabled />
        </div>
        <div class="card-body">
          <div class="row mb-3">
            <div class="col-5">
              <form-field
                disabled
                type="text"
                name="name"
                label="user.form.name"
              />
            </div>
            <div class="col-4">
              <form-field
                disabled
                type="text"
                name="email"
                label="user.form.email"
              />
            </div>
            <div class="col-3">
              <form-select
                disabled
                name="defaultLanguage"
                :options="defaultLanguages"
                label="user.form.default-language"
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-6">
              <div class="row">
                <div class="col-6">
                  <form-field
                    disabled
                    type="password"
                    name="password"
                    label="user.form.password"
                  />
                </div>
                <div class="col-6">
                  <form-field
                    disabled
                    type="password"
                    name="confirmation"
                    label="user.form.confirmation"
                  />
                </div>
              </div>
            </div>
            <div class="col-6">
              <multi-value-form-field
                disabled
                name="authorities"
                label="user.form.authorities"
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
import UserClient from '@/clients/administration/user.client.js'
import MultiValueFormField from '@/components/forms/MultiValueFormField.vue'
import FormSelect from '@/components/forms/FormSelect.vue'

import { defaultLanguages } from '@/models/administration/user.model'

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

const userClient = new UserClient()

async function doDelete() {
  try {
    loading.value = true
    await userClient.delete(props.id)
    router.push({ name: 'users' })
    displaySuccess('form.messages.deleted')
  } catch (error) {
    handleError(error.response)
  } finally {
    loading.value = false
  }
}

function changeToUpdate() {
  router.push({
    name: 'users.update',
    params: { id: props.id },
  })
}

function changeToDelete() {
  router.push({
    name: 'users.delete',
    params: { id: props.id },
  })
}

function changeToList() {
  router.push({ name: 'users' })
}

onMounted(async () => {
  if (props.id) {
    try {
      const { data } = await userClient.findById(props.id)
      setValues({
        active: data.active,
        name: data.name,
        email: data.email,
        authorities: data.authorities,
        defaultLanguage: data.defaultLanguage,
      })
    } catch (error) {
      handleError(error.response)
    }
  }
})
</script>
