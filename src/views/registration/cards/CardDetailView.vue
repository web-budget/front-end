<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import { useCardStore } from '@/stores/registration/card.store'

import { useNotification } from '@/composables/useNotification'

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

const i18n = useI18n()
const router = useRouter()

const { showSuccess } = useNotification()

const { remove, findOne } = useCardStore()
const { card, loading } = storeToRefs(useCardStore())

const cardWalletName = computed(() => {
  return card.value.wallet ? card.value.wallet.name : null
})

const isDebitCard = computed(() => {
  return card.value.type === 'DEBIT'
})

const cardTypes = [
  { label: i18n.t('card.type.debit'), value: 'DEBIT' },
  { label: i18n.t('card.type.credit'), value: 'CREDIT' },
]

function doDelete() {
  remove(props.id, () => {
    showSuccess('notification.record-deleted', 'notification.card.deleted')
    router.push({ name: 'cards' })
  })
}

function changeToUpdate() {
  router.push({
    name: 'cards.update',
    params: { id: props.id },
  })
}

function changeToDelete() {
  router.push({
    name: 'cards.delete',
    params: { id: props.id },
  })
}

function changeToList() {
  router.push({ name: 'cards' })
}

onMounted(async () => {
  await findOne(props.id)
})
</script>

<template>
  <Fluid class="card flex flex-col gap-4 w-full">
    <div class="font-semibold text-xl mb-6">
      <span v-if="props.deleting">{{ $t('card.form.deleting') }}</span>
      <span v-else>{{ $t('card.form.detailing') }}</span>
    </div>

    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="flex flex-wrap gap-2 w-full">
        <status-toggle v-model="card.active" />
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="flex flex-wrap gap-2 w-full">
        <label for="name">{{ $t('card.form.name') }}</label>
        <InputText id="name" type="text" v-model="card.name" />
      </div>
      <div class="flex flex-wrap gap-2 w-full">
        <label for="type">{{ $t('card.form.type') }}</label>
        <Select
          v-model="card.type"
          optionValue="value"
          optionLabel="label"
          :options="cardTypes"
          :disabled="props.updating"
        />
      </div>
      <div class="flex flex-wrap gap-2 w-full">
        <label for="wallet">{{ $t('card.form.wallet') }}</label>
        <InputText id="wallet" type="text" v-model="cardWalletName" />
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="flex flex-wrap gap-2 w-full">
        <label for="invoicePaymentDay">{{ $t('card.form.invoice-payment-day') }}</label>
        <InputText
          id="invoicePaymentDay"
          type="text"
          :disabled="isDebitCard"
          v-model="card.invoicePaymentDay"
        />
      </div>
      <div class="flex flex-wrap gap-2 w-full">
        <label for="lastFourDigits">{{ $t('card.form.last-four-digits') }}</label>
        <InputText id="lastFourDigits" type="text" v-model="card.lastFourDigits" />
      </div>
      <div class="flex flex-wrap gap-2 w-full">
        <label for="flag">{{ $t('card.form.flag') }}</label>
        <InputText id="flag" type="text" v-model="card.flag" />
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
