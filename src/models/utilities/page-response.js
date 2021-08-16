export default class PageResponse {
  constructor(content, size, totalElements, totalPages, first, last, empty) {
    this.content = content
    this.size = size
    this.totalElements = totalElements
    this.totalPages = totalPages
    this.first = first
    this.last = last
    this.empty = empty
  }

  static fromJson(json) {
    return Object.assign(new PageResponse(), json)
  }
}
