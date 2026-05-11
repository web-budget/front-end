<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useNotification } from '@/composables/useNotification'

import { useClassificationStore } from '@/stores/registration/classification.store'
import { classificationTypes } from '@/models/registration/classification.model'

import StatusToggle from '@/components/forms/StatusToggle.vue'

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

const router = useRouter()

const { showSuccess } = useNotification()

const { remove, findOne } = useClassificationStore()
const { classification, loading } = storeToRefs(useClassificationStore())

function doDelete() {
  remove(props.id, () => {
    showSuccess('notification.record-deleted', 'notification.classification.deleted')
    router.push({ name: 'classifications' })
  })
}

function changeToUpdate() {
  router.push({
    name: 'classifications.update',
    params: { id: props.id }
  })
}

function changeToDelete() {
  router.push({
    name: 'classifications.delete',
    params: { id: props.id }
  })
}

function changeToList() {
  router.push({ name: 'classifications' })
}

onMounted(async () => {
  await findOne(props.id)
})
</script>

<template>
  <Fluid class="card flex flex-col w-full">
    <div class="font-semibold text-xl mb-6">
      <span v-if="props.deleting">{{ $t('classification.form.deleting') }}</span>
      <span v-else>{{ $t('classification.form.detailing') }}</span>
    </div>

    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="flex flex-wrap gap-2 w-full">
        <status-toggle v-model="classification.active" />
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="flex flex-wrap gap-2 w-full">
        <label for="name">{{ $t('classification.form.name') }}</label>
        <InputText id="name" type="text" v-model="classification.name" />
      </div>
      <div class="flex flex-wrap gap-2 w-full">
        <label for="type">{{ $t('classification.form.type') }}</label>
        <Select
          optionValue="value"
          optionLabel="label"
          v-model="classification.type"
          :options="classificationTypes"
          :placeholder="$t('classification.form.type-placeholder')"
        />
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="flex flex-wrap gap-2 w-full">
        <label for="budget">{{ $t('classification.form.budget') }}</label>
        <InputNumber id="budget" :minFractionDigits="2" v-model="classification.budget" />
      </div>
    </div>

    <div class="flex mb-6">
      <div class="flex flex-wrap gap-2 w-full">
        <label for="description">{{ $t('classification.form.description') }}</label>
        <Textarea id="description" v-model="classification.description" rows="4" />
      </div>
    </div>

    <div v-if="deleting" class="flex flex-col md:flex-row gap-4 justify-end">
      <div class="flex flex-nowrap w-full justify-end items-center">
        <Message severity="contrast" variant="simple">
          {{ $t('notification.confirm-delete') }}
        </Message>
      </div>
      <div class="flex flex-nowrap w-32">
        <Button
          variant="outlined"
          :disabled="loading"
          severity="secondary"
          :label="$t('form.no')"
          @click.prevent="changeToList()"
        />
      </div>
      <div class="flex flex-nowrap w-32">
        <Button
          severity="danger"
          :loading="loading"
          :label="$t('form.yes')"
          @click.prevent="doDelete()"
        />
      </div>
    </div>

    <div v-else class="flex flex-col md:flex-row gap-4 justify-end">
      <div class="flex flex-nowrap w-32">
        <Button
          severity="secondary"
          variant="outlined"
          :label="$t('form.back')"
          @click.prevent="changeToList()"
        />
      </div>
      <div class="flex flex-nowrap w-32">
        <Button severity="primary" :label="$t('form.edit')" @click.prevent="changeToUpdate()" />
      </div>
      <div class="flex flex-nowrap w-32">
        <Button severity="danger" :label="$t('form.delete')" @click.prevent="changeToDelete()" />
      </div>
    </div>
  </Fluid>
</template>
