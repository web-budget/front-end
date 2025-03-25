import BaseClient from '@/http/base.client'

export default class BaseCrudClient extends BaseClient {

  findAll(pageRequest) {
    const pageRequestParams = pageRequest.getPageableParams()

    const requestParams = {
      ...pageRequestParams,
      filter: pageRequest.filter,
      status: pageRequest.status.toUpperCase(),
    }

    return super.get('', { params: requestParams })
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
