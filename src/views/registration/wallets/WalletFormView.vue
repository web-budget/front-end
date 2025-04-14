<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import WalletClient from '@/services/registration/wallet.client'

import { formDefaults, validationSchema } from '@/models/registration/wallet.model'

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

const walletClient = new WalletClient()

const i18n = useI18n()
const router = useRouter()

const theForm = ref()
const loading = ref(false)

const walletTypes = [
  { label: i18n.t('wallets.type.personal'), value: 'PERSONAL' },
  { label: i18n.t('wallets.type.investment'), value: 'INVESTMENT' },
  { label: i18n.t('wallets.type.bank-account'), value: 'BANK_ACCOUNT' },
]

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
    await walletClient.create(values)
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
    await walletClient.update(props.id, values)
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
    const { data } = await walletClient.findById(props.id)
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
        <span v-if="props.updating">{{ $t('wallets.form.editing') }}</span>
        <span v-else>{{ $t('wallets.form.new') }}</span>
      </div>

      <div v-if="props.updating" class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <status-toggle name="active" />
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <label for="name">{{ $t('wallets.form.name') }}</label>
          <InputText id="name" type="text" name="name" />
        </div>
        <div class="flex flex-wrap gap-2 w-full">
          <label for="type">{{ $t('wallets.form.type') }}</label>
          <Select
            name="type"
            optionValue="value"
            optionLabel="label"
            :options="walletTypes"
            :disabled="props.updating"
            :placeholder="$t('wallets.form.type-placeholder')"
          />
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <label for="bank">{{ $t('wallets.form.bank') }}</label>
          <InputText id="bank" type="text" name="bank" />
        </div>
        <div class="flex flex-wrap gap-2 w-1/4">
          <label for="agency">{{ $t('wallets.form.agency') }}</label>
          <InputNumber id="agency" name="agency" :use-grouping="false" />
        </div>
        <div class="flex flex-wrap gap-2 w-1/4">
          <label for="number">{{ $t('wallets.form.number') }}</label>
          <InputNumber id="number" name="number" :use-grouping="false" />
        </div>
      </div>

      <div class="flex mb-6">
        <div class="flex flex-wrap gap-2 w-full">
          <label for="description">{{ $t('wallets.form.description') }}</label>
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
