<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import StatusToggle from '@/components/forms/StatusToggle.vue'

import { useWalletStore } from '@/stores/registration/wallet.store'

import { useNotification } from '@/composables/useNotification'

import { formDefaults, validationSchema, walletTypes } from '@/models/registration/wallet.model'

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

const { create, update, findOne } = useWalletStore()
const { wallet, loading } = storeToRefs(useWalletStore())

function selectAction({ valid, values }) {
  if (!valid) return

  if (props.updating) {
    update(props.id, values, () => {
      showSuccess('notification.record-updated', 'notification.wallet.updated')
    })
  } else {
    create(values, () => {
      showSuccess('notification.record-created', 'notification.wallet.created')
      theForm.value.reset()
    })
  }
}

async function prepareForUpdate() {
  await findOne(props.id)
  const data = wallet.value
  theForm.value.setValues({
    active: data.active,
    name: data.name,
    description: data.description,
    type: data.type,
    bank: data.bank,
    agency: data.agency,
    number: data.number,
  })
}

function changeToList() {
  router.push({ name: 'wallets' })
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
        <span v-if="props.updating">{{ $t('wallet.form.editing') }}</span>
        <span v-else>{{ $t('wallet.form.new') }}</span>
      </div>

      <div v-if="props.updating" class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <status-toggle name="active" />
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <label for="name">{{ $t('wallet.form.name') }}</label>
          <InputText id="name" type="text" name="name" />
        </div>
        <div class="flex flex-wrap gap-2 w-full">
          <label for="type">{{ $t('wallet.form.type') }}</label>
          <Select
            name="type"
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
          <InputText id="bank" type="text" name="bank" />
        </div>
        <div class="flex flex-wrap gap-2 w-1/4">
          <label for="agency">{{ $t('wallet.form.agency') }}</label>
          <InputNumber id="agency" name="agency" :use-grouping="false" />
        </div>
        <div class="flex flex-wrap gap-2 w-1/4">
          <label for="number">{{ $t('wallet.form.number') }}</label>
          <InputNumber id="number" name="number" :use-grouping="false" />
        </div>
      </div>

      <div class="flex mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <label for="description">{{ $t('wallet.form.description') }}</label>
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
