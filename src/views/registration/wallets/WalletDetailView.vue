<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import { useWalletStore } from '@/stores/wallet.store'

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

const router = useRouter()

const i18n = useI18n()

const { showSuccess } = useNotification()

const { remove, findOne } = useWalletStore()
const { wallet, loading } = storeToRefs(useWalletStore())

const walletTypes = [
  { label: i18n.t('wallet.type.personal'), value: 'PERSONAL' },
  { label: i18n.t('wallet.type.investment'), value: 'INVESTMENT' },
  { label: i18n.t('wallet.type.bank-account'), value: 'BANK_ACCOUNT' },
]

function doDelete() {
  remove(props.id, () => {
    showSuccess('notification.record-deleted', 'notification.wallet.deleted')
    router.push({ name: 'wallets' })
  })
}

function changeToUpdate() {
  router.push({
    name: 'wallet.update',
    params: { id: props.id },
  })
}

function changeToDelete() {
  router.push({
    name: 'wallet.delete',
    params: { id: props.id },
  })
}

function changeToList() {
  router.push({ name: 'wallets' })
}

onMounted(async () => {
  await findOne(props.id)
})
</script>

<template>
  <Fluid class="card flex flex-col gap-4 w-full">
    <div class="font-semibold text-xl mb-6">
      <span v-if="props.deleting">{{ $t('wallet.form.deleting') }}</span>
      <span v-else>{{ $t('wallet.form.detailing') }}</span>
    </div>

    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="flex flex-wrap gap-2 w-full">
        <status-toggle v-model="wallet.active" />
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="flex flex-wrap gap-2 w-full">
        <label for="name">{{ $t('wallet.form.name') }}</label>
        <InputText id="name" type="text" v-model="wallet.name" />
      </div>
      <div class="flex flex-wrap gap-2 w-full">
        <label for="type">{{ $t('wallet.form.type') }}</label>
        <Select
          v-model="wallet.type"
          optionValue="value"
          optionLabel="label"
          :options="walletTypes"
          :disabled="props.updating"
          :placeholder="$t('wallet.form.type-placeholder')"
        />
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="flex flex-wrap gap-2 w-full">
        <label for="bank">{{ $t('wallet.form.bank') }}</label>
        <InputText id="bank" type="text" v-model="wallet.bank" />
      </div>
      <div class="flex flex-wrap gap-2 w-1/4">
        <label for="agency">{{ $t('wallet.form.agency') }}</label>
        <InputNumber id="agency" v-model="wallet.agency" :use-grouping="false" />
      </div>
      <div class="flex flex-wrap gap-2 w-1/4">
        <label for="number">{{ $t('wallet.form.number') }}</label>
        <InputNumber id="number" v-model="wallet.number" :use-grouping="false" />
      </div>
    </div>

    <div class="flex mb-6">
      <div class="flex flex-wrap gap-2 w-full">
        <label for="description">{{ $t('wallet.form.description') }}</label>
        <Textarea id="description" v-model="wallet.description" rows="4" />
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
