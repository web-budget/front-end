<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import WalletClient from '@/http/registration/wallet.client'

import StatusToggle from '@/components/forms/StatusToggle.vue'

import { formDefaults, validationSchema } from '@/models/registration/wallet.model'

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

async function deleteRecord() {
  try {
    loading.value = true
    await walletClient.delete(props.id)
    router.push({ name: 'wallets' })
    // TODO show success message
  } catch (error) {
    console.log(error) // FIXME
  } finally {
    loading.value = false
  }
}

async function loadData() {
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

function changeToUpdate() {
  router.push({
    name: 'wallets.update',
    params: { id: props.id },
  })
}

function changeToDelete() {
  router.push({
    name: 'wallets.delete',
    params: { id: props.id },
  })
}

function changeToList() {
  router.push({ name: 'wallets' })
}

onMounted(() => {
  if (props.id) {
    loadData()
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
        <span v-if="props.deleting">{{ $t('wallets.form.deleting') }}</span>
        <span v-else>{{ $t('wallets.form.detailing') }}</span>
      </div>

      <div class="flex flex-col md:flex-row gap-4 mb-6">
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

      <div v-if="deleting" class="flex flex-col md:flex-row gap-4 justify-end">
        <div class="flex flex-nowrap w-full justify-end items-center">
          <span class="font-semibold">Confirma a exclusão do registro?</span>
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
            @click.prevent="deleteRecord()"
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
    </Form>
  </Fluid>
</template>
