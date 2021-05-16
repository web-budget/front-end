import BaseClient from './base.client'

export default class AuthenticationClient extends BaseClient {
  constructor() {
    super('authentication', false)
  }

  login(credential) {
    return super.post('/login', credential)
  }

  refresh(refreshCredential) {
    return super.post('/refresh', refreshCredential)
  }
}
