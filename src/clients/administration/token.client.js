import ApiClient from '../api-client.js'

export default class TokenClient extends ApiClient {
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
