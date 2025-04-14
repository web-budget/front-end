import { reactive } from 'vue'
import { defineStore } from 'pinia'

import { useApi } from '@/composables/useApi'

import PageRequest from '@/models/page-request'
import PageResponse from '@/models/page-response'

export const useCostCenterStore = defineStore('costCenterStore', () => {
  const costCenter = reactive({})

  const pageRequest = reactive(new PageRequest())
  const pageResponse = reactive(new PageResponse())

  const { data, loading, post, put, get, del } = useApi({
    path: 'api/registration/cost-centers',
    requiresAuth: true,
  })

  async function findAll() {
    await get({
      page: pageRequest.current,
      size: pageRequest.size,
      sort: `${pageRequest.sortField},${pageRequest.direction}`,
      filter: pageRequest.filter,
      status: pageRequest.status.toUpperCase(),
    })
    PageResponse.applyValues(data.value, pageResponse)
  }

  async function findOne(id) {
    await get({}, { urlSuffix: `/${id}` })
    Object.assign(costCenter, data.value)
  }

  async function create(values) {
    await post(values)
  }

  async function update(id, values) {
    await put(values, { urlSuffix: `/${id}` })
  }

  async function remove(id) {
    await del({}, { urlSuffix: `/${id}` })
  }

  return {
    findAll,
    findOne,
    create,
    update,
    remove,
    loading,
    costCenter,
    pageRequest,
    pageResponse,
  }
})
