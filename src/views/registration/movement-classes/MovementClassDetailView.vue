<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useNotification } from '@/composables/useNotification'

import { useMovementClassStore } from '@/stores/registration/movement-class.store'

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

const { remove, findOne } = useMovementClassStore()
const { movementClass, loading } = storeToRefs(useMovementClassStore())

function doDelete() {
  remove(props.id, () => {
    showSuccess('notification.record-deleted', 'notification.movement-class.deleted')
    router.push({ name: 'movement-classes' })
  })
}

function changeToUpdate() {
  router.push({
    name: 'movement-classes.update',
    params: { id: props.id },
  })
}

function changeToDelete() {
  router.push({
    name: 'movement-classes.delete',
    params: { id: props.id },
  })
}

function changeToList() {
  router.push({ name: 'movement-classes' })
}

onMounted(async () => {
  await findOne(props.id)
})
</script>

<template>
  <Fluid class="card flex flex-col gap-4 w-full">
    <div class="font-semibold text-xl mb-6">
      <span v-if="props.deleting">{{ $t('movement-class.form.deleting') }}</span>
      <span v-else>{{ $t('movement-class.form.detailing') }}</span>
    </div>

    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="flex flex-wrap gap-2 w-full">
        <status-toggle v-model="movementClass.active" />
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="flex flex-wrap gap-2 w-full">
        <label for="name">{{ $t('movement-class.form.name') }}</label>
        <InputText id="name" type="text" v-model="movementClass.name" />
      </div>
      <div class="flex flex-wrap gap-2 w-1/8">
        <label for="incomeBudget">{{ $t('movement-class.form.income-budget') }}</label>
        <InputNumber
          id="incomeBudget"
          :minFractionDigits="2"
          v-model="movementClass.incomeBudget"
        />
      </div>
      <div class="flex flex-wrap gap-2 w-1/8">
        <label for="expenseBudget">{{ $t('movement-class.form.expense-budget') }}</label>
        <InputNumber
          id="expenseBudget"
          :minFractionDigits="2"
          v-model="movementClass.expenseBudget"
        />
      </div>
    </div>

    <div class="flex mb-6">
      <div class="flex flex-wrap gap-2 w-full">
        <label for="description">{{ $t('movement-class.form.description') }}</label>
        <Textarea id="description" v-model="movementClass.description" rows="4" />
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
