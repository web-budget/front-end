<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useNotification } from '@/composables/useNotification'

import { useCostCenterStore } from '@/stores/registration/cost-center.store'

import StatusToggle from '@/components/forms/StatusToggle.vue'

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

const router = useRouter()

const { showSuccess } = useNotification()

const { remove, findOne } = useCostCenterStore()
const { costCenter, loading } = storeToRefs(useCostCenterStore())

function doDelete() {
  remove(props.id, () => {
    showSuccess('notification.record-deleted', 'notification.cost-center.deleted')
    router.push({ name: 'cost-centers' })
  })
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
  await findOne(props.id)
})
</script>

<template>
  <Fluid class="card flex flex-col gap-4 w-full">
    <div class="font-semibold text-xl mb-6">
      <span v-if="props.deleting">{{ $t('cost-center.form.deleting') }}</span>
      <span v-else>{{ $t('cost-center.form.detailing') }}</span>
    </div>

    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="flex flex-wrap gap-2 w-full">
        <status-toggle v-model="costCenter.active" />
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="flex flex-wrap gap-2 w-full">
        <label for="name">{{ $t('cost-center.form.name') }}</label>
        <InputText id="name" type="text" v-model="costCenter.name" />
      </div>
      <div class="flex flex-wrap gap-2 w-1/8">
        <label for="incomeBudget">{{ $t('cost-center.form.income-budget') }}</label>
        <InputNumber id="incomeBudget" :minFractionDigits="2" v-model="costCenter.incomeBudget" />
      </div>
      <div class="flex flex-wrap gap-2 w-1/8">
        <label for="expenseBudget">{{ $t('cost-center.form.expense-budget') }}</label>
        <InputNumber id="expenseBudget" :minFractionDigits="2" v-model="costCenter.expenseBudget" />
      </div>
    </div>

    <div class="flex mb-6">
      <div class="flex flex-wrap gap-2 w-full">
        <label for="description">{{ $t('cost-center.form.description') }}</label>
        <Textarea id="description" v-model="costCenter.description" rows="4" />
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
