import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

import { useApi } from '@/composables/useApi'

import PageRequest from '@/models/page-request'
import PageResponse from '@/models/page-response'

import { Wallet } from '@/models/registration/wallet.model'

export const useWalletStore = defineStore('walletStore', () => {
  const wallets = ref([])
  const wallet = reactive({})

  const pageRequest = reactive(new PageRequest())
  const pageResponse = reactive(new PageResponse())

  const { data, loading, post, put, get, del } = useApi({
    path: 'api/registration/wallets',
    requiresAuth: true,
  })

  async function findAll() {
    await get(pageRequest.toQueryParameters())
    Object.assign(pageResponse, data.value)
  }

  async function findByName(text) {
    await get({
      filter: text,
      status: 'ACTIVE',
    })
    wallets.value = data.value.content
  }

  async function findOne(id) {
    await get({}, { urlSuffix: `/${id}` })
    Object.assign(wallet, new Wallet(data.value))
  }

  async function create(values, onSuccess = () => {}, onError = () => {}) {
    await post(values, {}, onSuccess, onError)
  }

  async function update(id, values, onSuccess = () => {}, onError = () => {}) {
    await put(values, { urlSuffix: `/${id}` }, onSuccess, onError)
  }

  async function remove(id, onSuccess = () => {}, onError = () => {}) {
    await del({}, { urlSuffix: `/${id}` }, onSuccess, onError)
  }

  return {
    findAll,
    findByName,
    findOne,
    create,
    update,
    remove,
    loading,
    wallet,
    wallets,
    pageRequest,
    pageResponse,
  }
})
