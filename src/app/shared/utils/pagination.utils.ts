const createPagination = (page: number, object: any[], size: number) => {
  let startIndex = (page - 1) * size
  let endIndex = page * size
  let pagination: any = {}

  if (endIndex < object.length) pagination.next = page + 1

  if (startIndex > 0) pagination.previous = page - 1

  pagination.current = page
  pagination.totalElementPerPage = object.slice(startIndex, endIndex).length

  return { results: object.slice(startIndex, endIndex), pagination }
}

export { createPagination }
