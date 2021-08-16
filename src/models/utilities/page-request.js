export default class PageRequest {
  constructor(filter = '', current = 0, size = 25, direction = 'asc', sortFields) {
    this.filter = filter
    this.current = current
    this.size = size
    this.direction = direction
    this.sortFields = sortFields
  }

  isSortable() {
    return Boolean(this.sortFields)
  }
}
