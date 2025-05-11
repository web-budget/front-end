<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import StatusToggle from '@/components/forms/StatusToggle.vue'

import { useCardStore } from '@/stores/registration/card.store'

import { useNotification } from '@/composables/useNotification'

import { formDefaults, validationSchema } from '@/models/registration/card.model'

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

const router = useRouter()

const { showSuccess } = useNotification()

const theForm = ref()

const { create, update, findOne } = useCardStore()
const { card, loading } = storeToRefs(useCardStore())

function selectAction({ valid, values }) {
  if (!valid) return

  if (props.updating) {
    update(props.id, values, () => {
      showSuccess('notification.record-updated', 'notification.card.updated')
    })
  } else {
    create(values, () => {
      showSuccess('notification.record-created', 'notification.card.created')
      theForm.value.reset()
    })
  }
}

async function prepareForUpdate() {
  await findOne(props.id)
  applyFormValues(card.value)
}

function applyFormValues(data) {
  theForm.value.setValues({
    active: data.active,
    name: data.name,
    lastFourDigits: data.lastFourDigits,
    invoicePaymentDay: data.invoicePaymentDay,
    type: data.type,
    wallet: data.wallet.id,
    flag: data.flag,
  })
}

function changeToList() {
  router.push({ name: 'cards' })
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
        <span v-if="props.updating">{{ $t('card.form.editing') }}</span>
        <span v-else>{{ $t('card.form.new') }}</span>
      </div>

      <div v-if="props.updating" class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <status-toggle name="active" />
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <label for="name">{{ $t('card.form.name') }}</label>
          <InputText id="name" type="text" name="name" />
        </div>
        <div class="flex flex-wrap gap-2 w-full">
          <label for="type">{{ $t('card.form.type') }}</label>
          <InputText id="type" type="text" name="type" />
        </div>
        <div class="flex flex-wrap gap-2 w-full">
          <label for="wallet">{{ $t('card.form.wallet') }}</label>
          <InputText id="wallet" type="text" name="wallet" />
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <label for="invoicePaymentDay">{{ $t('card.form.invoice-payment-day') }}</label>
          <InputText id="invoicePaymentDay" type="text" name="invoicePaymentDay" />
        </div>
        <div class="flex flex-wrap gap-2 w-full">
          <label for="lastFourDigits">{{ $t('card.form.last-four-digits') }}</label>
          <InputText id="lastFourDigits" type="text" name="lastFourDigits" />
        </div>
        <div class="flex flex-wrap gap-2 w-full">
          <label for="flag">{{ $t('card.form.flag') }}</label>
          <InputText id="flag" type="text" name="flag" />
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
