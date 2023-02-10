export default class PageRequest {
  constructor(
    filter = '',
    status = 'ACTIVE',
    current = 0,
    size = 15,
    direction = 'asc',
    sortField
  ) {
    this.filter = filter
    this.status = status
    this.current = current
    this.size = size
    this.direction = direction
    this.sortField = sortField
  }

  isSortable() {
    return Boolean(this.sortField)
  }

  buildRequestPath() {
    let requestPath = `?page=${this.current}&size=${this.size}`

    if (this.isSortable()) {
      requestPath = `${requestPath}&sort=${this.sortField},${this.direction}`
    }

    return requestPath
  }
}
