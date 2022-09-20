import ApiClient from '../api-client.js'

export default class CostCenterClient extends ApiClient {
  constructor() {
    super('api/cost-centers')
  }

  findAll(pageRequest) {
    const requestParams = {
      filter: pageRequest.filter,
      status: pageRequest.status.toUpperCase()
    }

    return super.get(pageRequest.buildRequestPath(), { params: requestParams })
  }

  findById(id) {
    return super.get(`/${id}`)
  }

  create(values) {
    return super.post('', values)
  }

  update(id, values) {
    return super.put(`/${id}`, values)
  }

  delete(id) {
    return super.delete(`/${id}`)
  }
}
