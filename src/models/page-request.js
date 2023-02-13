export default class PageRequest {
  constructor(
    filter = '',
    status = 'ACTIVE',
    current = 0,
    size = 15,
    direction = 'asc',
    sortField = ''
  ) {
    this.filter = filter
    this.status = status
    this.current = current
    this.size = size
    this.direction = direction
    this.sortField = sortField
  }

  getPagebleParams() {
    return {
      page: this.current,
      size: this.size,
      sort: `${this.sortField},${this.direction}`,
    }
  }
}
