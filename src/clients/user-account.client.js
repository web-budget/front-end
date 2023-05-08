import ApiClient from '@/clients/api-client'

export default class UserAccountClient extends ApiClient {
  constructor() {
    super('user-account', false)
  }

  forgotPassword(email) {
    return super.patch('/forgot-password', { email: email })
  }

  activate(token) {
    return super.patch('/activate', { activationToken: token })
  }

  recoverPassword(values) {
    return super.patch('/recover-password', values)
  }
}
