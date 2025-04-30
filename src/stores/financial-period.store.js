import { reactive } from 'vue'
import { defineStore } from 'pinia'

import { useApi } from '@/composables/useApi'

import PageRequest from '@/models/page-request'
import PageResponse from '@/models/page-response'

export const useFinancialPeriodStore = defineStore('financialPeriodStore', () => {
  const financialPeriod = reactive({})

  const pageRequest = reactive(new PageRequest('', 'OPEN', 0, 15, 'asc', 'createdOn'))
  const pageResponse = reactive(new PageResponse())

  const { data, loading, post, put, get, del } = useApi({
    path: 'api/registration/financial-periods',
    requiresAuth: true,
  })

  async function findAll() {
    await get(pageRequest.toQueryParameters())
    Object.assign(pageResponse, data.value)
  }

  async function findOne(id) {
    await get({}, { urlSuffix: `/${id}` })
    Object.assign(financialPeriod, data.value)
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
    findOne,
    create,
    update,
    remove,
    loading,
    financialPeriod,
    pageRequest,
    pageResponse,
  }
})
