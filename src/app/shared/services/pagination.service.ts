import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private readonly ITEMS_PER_PAGE = 6

  constructor() {}

  verifyPageSize(): number {
    if (document.body.getBoundingClientRect().width < 768)
      return this.ITEMS_PER_PAGE
    const contentSizeHeight = document.body.getBoundingClientRect().height * 0.6
    const cardSizeHeight = 80
    return Math.floor(contentSizeHeight / cardSizeHeight)
  }

  createPagination(page: number, object: any[], size: number) {
    let startIndex = (page - 1) * size
    let endIndex = page * size
    let pagination: any = {}

    if (endIndex < object.length) pagination.next = page + 1

    if (startIndex > 0) pagination.previous = page - 1

    pagination.current = page
    pagination.totalElementPerPage = object.slice(startIndex, endIndex).length

    return { results: object.slice(startIndex, endIndex), pagination }
  }
}
