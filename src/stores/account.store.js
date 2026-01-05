import { defineStore } from 'pinia'

import { useApi } from '@/composables/useApi'

export const useAccountStore = defineStore('accountStore', () => {
  const { loading, patch } = useApi({
    path: 'accounts'
  })

  async function forgotPassword(values, onSuccess = () => {}, onError = () => {}) {
    await patch(values, { urlSuffix: '/forgot-password' }, onSuccess, onError)
  }

  async function activate(values, onSuccess = () => {}, onError = () => {}) {
    await patch(values, { urlSuffix: '/activate' }, onSuccess, onError)
  }

  async function recoverPassword(values, onSuccess = () => {}, onError = () => {}) {
    await patch(values, { urlSuffix: '/recover-password' }, onSuccess, onError)
  }

  return {
    activate,
    forgotPassword,
    recoverPassword,
    loading
  }
})
