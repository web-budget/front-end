<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useNotification } from '@/composables/useNotification'

import { useCostCenterStore } from '@/stores/cost-center.store'

import StatusToggle from '@/components/forms/StatusToggle.vue'

import { formDefaults, validationSchema } from '@/models/registration/cost-center.model'

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

const { create, update, findOne } = useCostCenterStore()
const { costCenter, loading } = storeToRefs(useCostCenterStore())

function selectAction({ valid, values }) {
  if (!valid) return

  if (props.updating) {
    update(props.id, values, () => {
      showSuccess('notification.record-updated', 'notification.cost-center.updated')
    })
  } else {
    create(values, () => {
      showSuccess('notification.record-created', 'notification.cost-center.created')
      theForm.value.reset()
    })
  }
}

async function prepareForUpdate() {
  await findOne(props.id)
  applyFormValues(costCenter.value)
}

function applyFormValues(data) {
  theForm.value.setValues({
    active: data.active,
    name: data.name,
    description: data.description,
    expenseBudget: data.expenseBudget,
    incomeBudget: data.incomeBudget
  })
}

function changeToList() {
  router.push({ name: 'cost-centers' })
}

onMounted(() => {
  if (props.updating && props.id) {
    prepareForUpdate()
  }
})
</script>

<template>
  <Fluid class="card flex flex-col gap-4 w-full">
    <Form
      ref="theForm"
      @submit="selectAction"
      :resolver="validationSchema"
      :initialValues="formDefaults"
    >
      <div class="font-semibold text-xl mb-6">
        <span v-if="props.updating">{{ $t('cost-center.form.editing') }}</span>
        <span v-else>{{ $t('cost-center.form.new') }}</span>
      </div>

      <div v-if="props.updating" class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <status-toggle name="active" />
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <label for="name">{{ $t('cost-center.form.name') }}</label>
          <InputText id="name" type="text" name="name" />
        </div>
        <div class="flex flex-wrap gap-2 w-1/8">
          <label for="incomeBudget">{{ $t('cost-center.form.income-budget') }}</label>
          <InputNumber id="incomeBudget" :minFractionDigits="2" name="incomeBudget" />
        </div>
        <div class="flex flex-wrap gap-2 w-1/8">
          <label for="expenseBudget">{{ $t('cost-center.form.expense-budget') }}</label>
          <InputNumber id="expenseBudget" :minFractionDigits="2" name="expenseBudget" />
        </div>
      </div>

      <div class="flex mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <label for="description">{{ $t('cost-center.form.description') }}</label>
          <Textarea id="description" name="description" rows="4" />
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
