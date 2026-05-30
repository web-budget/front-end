import { reactive } from 'vue'
import { defineStore } from 'pinia'

import { useApi } from '@/composables/useApi'

import PageRequest from '@/models/page-request'
import PageResponse from '@/models/page-response'

import { Classification } from '@/models/registration/classification.model'

export const useClassificationStore = defineStore('classificationStore', () => {
  const classification = reactive({})

  const pageRequest = reactive(new PageRequest())
  const pageResponse = reactive(new PageResponse())

  const { data, loading, post, put, get, del } = useApi({
    path: 'api/registration/classifications'
  })

  async function findAll() {
    await get(pageRequest.toQueryParameters())
    pageResponse.content = data.value.content
    Object.assign(pageResponse, data.value.page)
  }

  async function findOne(id) {
    await get({}, { urlSuffix: `/${id}` })
    Object.assign(classification, new Classification(data.value))
  }

  async function create(values, onSuccess = () => {}, onError = () => {}) {
    await post(values, { handledStatuses: [422] }, onSuccess, onError)
  }

  async function update(id, values, onSuccess = () => {}, onError = () => {}) {
    await put(values, { urlSuffix: `/${id}`, handledStatuses: [422] }, onSuccess, onError)
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
    classification,
    pageRequest,
    pageResponse
  }
})
