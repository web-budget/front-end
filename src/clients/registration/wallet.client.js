import BaseCrudClient from '@/clients/base-crud.client'

export default class WalletClient extends BaseCrudClient {
  constructor() {
    super('api/registration/wallets', true)
  }
}
