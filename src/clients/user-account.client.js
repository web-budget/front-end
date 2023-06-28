import ApiClient from '@/clients/api-client'

export default class UserAccountClient extends ApiClient {
  constructor() {
    super('user-account', false)
  }

  forgotPassword(email) {
    return super.patch('/forgot-password', { email: email })
  }

  activateAccount(values) {
    return super.patch('/activate', { ...values })
  }

  recoverPassword(values) {
    return super.patch('/recover-password', values)
  }
}
