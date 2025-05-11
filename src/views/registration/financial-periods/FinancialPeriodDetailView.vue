<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useNotification } from '@/composables/useNotification'

import { useFinancialPeriodStore } from '@/stores/registration/financial-period.store'

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

const { remove, findOne } = useFinancialPeriodStore()
const { financialPeriod, loading } = storeToRefs(useFinancialPeriodStore())

function doDelete() {
  remove(props.id, () => {
    showSuccess('notification.record-deleted', 'notification.financial-period.deleted')
    router.push({ name: 'financial-periods' })
  })
}

function changeToUpdate() {
  router.push({
    name: 'financial-periods.update',
    params: { id: props.id },
  })
}

function changeToDelete() {
  router.push({
    name: 'financial-periods.delete',
    params: { id: props.id },
  })
}

function changeToList() {
  router.push({ name: 'financial-periods' })
}

onMounted(async () => {
  await findOne(props.id)
})
</script>

<template>
  <Fluid class="card flex flex-col gap-4 w-full">
    <div class="font-semibold text-xl mb-6">
      <span v-if="props.deleting">{{ $t('financial-period.form.deleting') }}</span>
      <span v-else>{{ $t('financial-period.form.detailing') }}</span>
    </div>

    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="flex flex-wrap gap-2 w-full"></div>
    </div>

    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="flex flex-wrap gap-2 w-full">
        <label for="name">{{ $t('financial-period.form.name') }}</label>
        <InputText id="name" type="text" v-model="financialPeriod.name" />
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="flex flex-col flex-wrap gap-2 w-1/4">
        <label for="startingAt">{{ $t('financial-period.form.starting-at') }}</label>
        <DatePicker
          id="startingAt"
          show-icon
          showButtonBar
          iconDisplay="input"
          dateFormat="dd/mm/yy"
          v-model="financialPeriod.startingAt"
        />
      </div>
      <div class="flex flex-col flex-wrap gap-2 w-1/4">
        <label for="endingAt">{{ $t('financial-period.form.ending-at') }}</label>
        <DatePicker
          id="endingAt"
          show-icon
          showButtonBar
          iconDisplay="input"
          dateFormat="dd/mm/yy"
          v-model="financialPeriod.endingAt"
        />
      </div>
      <div class="flex flex-col flex-wrap gap-2 w-1/4">
        <label for="revenuesGoal">{{ $t('financial-period.form.revenues-goal') }}</label>
        <InputNumber
          id="revenuesGoal"
          :minFractionDigits="2"
          v-model="financialPeriod.revenuesGoal"
        />
      </div>
      <div class="flex flex-col flex-wrap gap-2 w-1/4">
        <label for="expensesGoal">{{ $t('financial-period.form.expenses-goal') }}</label>
        <InputNumber
          id="expensesGoal"
          :minFractionDigits="2"
          v-model="financialPeriod.expensesGoal"
        />
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
