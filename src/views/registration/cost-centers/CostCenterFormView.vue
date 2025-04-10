<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import CostCenterClient from '@/http/registration/cost-center.client'

import { formDefaults, validationSchema } from '@/models/registration/cost-center.model'
import StatusToggle from '@/components/forms/StatusToggle.vue'

const props = defineProps({
  id: {
    type: String,
    default: null,
  },
  updating: {
    type: Boolean,
    default: false,
  },
})

const costCenterClient = new CostCenterClient()

const router = useRouter()

const theForm = ref()
const loading = ref(false)

function selectAction({ valid, values }) {
  if (!valid) return

  loading.value = true

  if (props.updating) {
    update(values)
  } else {
    create(values)
  }
}

async function create(values) {
  try {
    await costCenterClient.create(values)
    theForm.value.reset()
    // TODO show success message
  } catch (error) {
    console.log(error) // FIXME
  } finally {
    loading.value = false
  }
}

async function update(values) {
  try {
    await costCenterClient.update(props.id, values)
    await prepareForUpdate()
    // TODO show success message
  } catch (error) {
    console.log(error) // FIXME
  } finally {
    loading.value = false
  }
}

async function prepareForUpdate() {
  try {
    loading.value = true
    const { data } = await costCenterClient.findById(props.id)
    applyFormValues(data)
  } catch (error) {
    console.log(error) // FIXME
  } finally {
    loading.value = false
  }
}

function applyFormValues(data) {
  theForm.value.setValues({
    active: data.active,
    name: data.name,
    description: data.description,
    expenseBudget: data.expenseBudget,
    incomeBudget: data.incomeBudget,
  })
}

function changeToList() {
  router.push({ name: 'cost-centers' })
}

onMounted(() => {
  if (props.updating) {
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
      <div class="font-semibold text-xl mb-8">
        <span v-if="props.updating">{{ $t('cost-centers.form.editing') }}</span>
        <span v-else>{{ $t('cost-centers.form.new') }}</span>
      </div>

      <div v-if="props.updating" class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <status-toggle name="active" />
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <label for="name">{{ $t('cost-centers.form.name') }}</label>
          <InputText id="name" type="text" name="name" />
        </div>
        <div class="flex flex-wrap gap-2 w-1/8">
          <label for="incomeBudget">{{ $t('cost-centers.form.income-budget') }}</label>
          <InputNumber id="incomeBudget" :minFractionDigits="2" name="incomeBudget" />
        </div>
        <div class="flex flex-wrap gap-2 w-1/8">
          <label for="expenseBudget">{{ $t('cost-centers.form.expense-budget') }}</label>
          <InputNumber id="expenseBudget" :minFractionDigits="2" name="expenseBudget" />
        </div>
      </div>

      <div class="flex mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <label for="description">{{ $t('cost-centers.form.description') }}</label>
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
