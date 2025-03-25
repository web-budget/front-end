import BaseClient from '@/http/base.client'

export default class TokenClient extends BaseClient {
  constructor() {
    super('token')
  }

  generate(credentials) {
    const config = {
      headers: {
        Authorization:
          'Basic ' + btoa(`${credentials.username}:${credentials.password}`),
      },
    }
    return super.post('', '', config)
  }
}
