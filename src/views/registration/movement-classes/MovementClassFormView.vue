<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useNotification } from '@/composables/useNotification'

import { useCostCenterStore } from '@/stores/registration/cost-center.store'
import { useMovementClassStore } from '@/stores/registration/movement-class.store'

import StatusToggle from '@/components/forms/StatusToggle.vue'

import {
  formDefaults,
  movementClassTypes,
  validationSchema,
} from '@/models/registration/movement-class.model'

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

const theForm = ref()

const router = useRouter()

const { showSuccess } = useNotification()

const { create, update, findOne } = useMovementClassStore()
const { movementClass, loading } = storeToRefs(useMovementClassStore())

const { findByName } = useCostCenterStore()
const { costCenters } = storeToRefs(useCostCenterStore())

function selectAction({ valid, values }) {
  if (!valid) return

  Object.assign(movementClass, values)
  movementClass.costCenter = values.costCenter.id

  if (props.updating) {
    update(props.id, movementClass, () => {
      showSuccess('notification.record-updated', 'notification.movement-class.updated')
    })
  } else {
    create(movementClass, () => {
      showSuccess('notification.record-created', 'notification.movement-class.created')
      theForm.value.reset()
    })
  }
}

async function prepareForUpdate() {
  await findOne(props.id)
  const data = movementClass.value
  theForm.value.setValues({
    active: data.active,
    name: data.name,
    type: data.type,
    description: data.description,
    costCenter: data.costCenter,
    budget: data.budget,
  })
}

function changeToList() {
  router.push({ name: 'movement-classes' })
}

function onCostCenterSearch(event) {
  findByName(event.query)
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
        <span v-if="props.updating">{{ $t('movement-class.form.editing') }}</span>
        <span v-else>{{ $t('movement-class.form.new') }}</span>
      </div>

      <div v-if="props.updating" class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <status-toggle name="active" />
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <label for="name">{{ $t('movement-class.form.name') }}</label>
          <InputText id="name" type="text" name="name" />
        </div>
        <div class="flex flex-wrap gap-2 w-full">
          <label for="type">{{ $t('movement-class.form.type') }}</label>
          <Select
            name="type"
            optionValue="value"
            optionLabel="label"
            :disabled="props.updating"
            :options="movementClassTypes"
            :placeholder="$t('movement-class.form.type-placeholder')"
          />
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex flex-col flex-wrap gap-2 w-full">
          <label for="costCenter">{{ $t('movement-class.form.cost-center') }}</label>
          <AutoComplete
            id="costCenter"
            name="costCenter"
            :min-length="2"
            option-label="name"
            :suggestions="costCenters"
            :disabled="props.updating"
            @complete="onCostCenterSearch"
            :placeholder="$t('movement-class.form.cost-center-search-placeholder')"
            :emptySearchMessage="$t('movement-class.form.cost-center-search-empty')"
            :virtual-scroller-options="{ lazy: true, itemSize: 40, autoSize: true }"
          />
        </div>
        <div class="flex flex-wrap gap-2 w-full">
          <label for="budget">{{ $t('movement-class.form.budget') }}</label>
          <InputNumber id="budget" :minFractionDigits="2" name="budget" />
        </div>
      </div>

      <div class="flex mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <label for="description">{{ $t('movement-class.form.description') }}</label>
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
