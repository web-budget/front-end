<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useNotification } from '@/composables/useNotification'

import { applyServerValidation } from '@/utilities/formValidation'

import { useFinancialPeriodStore } from '@/stores/registration/financial-period.store'

import {
  FinancialPeriodCreateForm,
  FinancialPeriodUpdateForm,
  formDefaults,
  validationSchema
} from '@/models/registration/financial-period.model'

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

const theForm = ref()

const router = useRouter()

const { showSuccess } = useNotification()

const { create, update, findOne } = useFinancialPeriodStore()
const { financialPeriod, loading } = storeToRefs(useFinancialPeriodStore())

function selectAction({ valid, values }) {
  if (!valid) return

  if (props.updating) {
    update(
      props.id,
      new FinancialPeriodUpdateForm(values),
      () => {
        showSuccess('notification.record-updated', 'notification.financial-period.updated')
      },
      (error) => applyServerValidation(theForm, error)
    )
  } else {
    create(
      new FinancialPeriodCreateForm(values),
      () => {
        showSuccess('notification.record-created', 'notification.financial-period.created')
        theForm.value.reset()
      },
      (error) => applyServerValidation(theForm, error)
    )
  }
}

async function prepareForUpdate() {
  await findOne(props.id)

  theForm.value.setValues({
    name: financialPeriod.value.name,
    startingAt: financialPeriod.value.startingAt,
    endingAt: financialPeriod.value.endingAt,
    revenuesGoal: financialPeriod.value.revenuesGoal,
    expensesGoal: financialPeriod.value.expensesGoal
  })
}

function changeToList() {
  router.push({ name: 'financial-periods' })
}

onMounted(async () => {
  if (props.updating && props.id) {
    await prepareForUpdate()
  }
})
</script>

<template>
  <Fluid class="card flex flex-col w-full">
    <Form
      ref="theForm"
      @submit="selectAction"
      :resolver="validationSchema"
      :initialValues="formDefaults"
    >
      <div class="font-semibold text-xl mb-6">
        <span v-if="props.updating">{{ $t('financial-period.form.editing') }}</span>
        <span v-else>{{ $t('financial-period.form.new') }}</span>
      </div>

      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <label for="name">{{ $t('financial-period.form.name') }}</label>
          <InputText id="name" type="text" name="name" />
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex flex-col flex-wrap gap-2 w-1/4">
          <label for="startingAt">{{ $t('financial-period.form.starting-at') }}</label>
          <DatePicker
            id="startingAt"
            show-icon
            show-button-bar
            name="startingAt"
            icon-display="input"
            date-format="dd/mm/yy"
            :disabled="props.updating"
          />
        </div>
        <div class="flex flex-col flex-wrap gap-2 w-1/4">
          <label for="endingAt">{{ $t('financial-period.form.ending-at') }}</label>
          <DatePicker
            id="endingAt"
            show-icon
            show-button-bar
            name="endingAt"
            icon-display="input"
            date-format="dd/mm/yy"
            :disabled="props.updating"
          />
        </div>
        <div class="flex flex-col flex-wrap gap-2 w-1/4">
          <label for="revenuesGoal">{{ $t('financial-period.form.revenues-goal') }}</label>
          <InputNumber id="revenuesGoal" :minFractionDigits="2" name="revenuesGoal" />
        </div>
        <div class="flex flex-col flex-wrap gap-2 w-1/4">
          <label for="expensesGoal">{{ $t('financial-period.form.expenses-goal') }}</label>
          <InputNumber id="expensesGoal" :minFractionDigits="2" name="expensesGoal" />
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-4 justify-end">
        <div class="flex flex-nowrap w-32">
          <Button
            variant="outlined"
            :disabled="loading"
            severity="secondary"
            :label="$t('form.back')"
            @click.prevent="changeToList()"
          />
        </div>
        <div class="flex flex-nowrap w-32">
          <Button type="submit" :loading="loading" :label="$t('form.save')" />
        </div>
      </div>
    </Form>
  </Fluid>
</template>
