import CrudClient from '@/http/crud.client'

export default class WalletClient extends CrudClient {
  constructor() {
    super('api/registration/wallets', true)
  }
}
