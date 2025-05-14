<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import StatusToggle from '@/components/forms/StatusToggle.vue'

import { useCardStore } from '@/stores/registration/card.store'
import { useWalletStore } from '@/stores/registration/wallet.store'

import { useNotification } from '@/composables/useNotification'

import { cardTypes, formDefaults, validationSchema } from '@/models/registration/card.model'

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

const { findByName } = useWalletStore()
const { wallets } = storeToRefs(useWalletStore())

const { create, update, findOne } = useCardStore()
const { card, loading } = storeToRefs(useCardStore())

function selectAction({ valid, values }) {
  if (!valid) return

  const toCreate = { ...values }
  toCreate.wallet = values.wallet ? values.wallet.id : null

  if (props.updating) {
    update(props.id, toCreate, () => {
      showSuccess('notification.record-updated', 'notification.card.updated')
    })
  } else {
    create(toCreate, () => {
      showSuccess('notification.record-created', 'notification.card.created')
      theForm.value.reset()
    })
  }
}

async function prepareForUpdate() {
  await findOne(props.id)

  const wallet = card.value.wallet

  theForm.value.setValues({
    active: card.value.active,
    name: card.value.name,
    lastFourDigits: card.value.lastFourDigits,
    invoicePaymentDay: card.value.invoicePaymentDay,
    type: card.value.type,
    wallet: wallet ? wallet.id : null,
    flag: card.value.flag,
  })
}

function changeToList() {
  router.push({ name: 'cards' })
}

function onWalletSearch(event) {
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
      v-slot="$form"
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
          <Select
            name="type"
            optionValue="value"
            optionLabel="label"
            :options="cardTypes"
            :disabled="props.updating"
            :placeholder="$t('card.form.type-placeholder')"
          />
        </div>
        <div class="flex flex-col flex-wrap gap-2 w-full">
          <label for="wallet">{{ $t('card.form.wallet') }}</label>
          <AutoComplete
            id="wallet"
            name="wallet"
            :min-length="3"
            option-label="name"
            :suggestions="wallets"
            @complete="onWalletSearch"
            :emptySearchMessage="$t('card.form.wallet-search-empty')"
            :disabled="$form.type ? $form.type.value === 'CREDIT' : false"
            :virtual-scroller-options="{ lazy: true, itemSize: 40, autoSize: true }"
          />
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <label for="invoicePaymentDay">{{ $t('card.form.invoice-payment-day') }}</label>
          <InputText
            id="invoicePaymentDay"
            type="text"
            name="invoicePaymentDay"
            :disabled="$form.type ? $form.type.value === 'DEBIT' : false"
          />
        </div>
        <div class="flex flex-wrap gap-2 w-full">
          <label for="lastFourDigits">{{ $t('card.form.last-four-digits') }}</label>
          <InputMask id="lastFourDigits" name="lastFourDigits" mask="9999" />
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
