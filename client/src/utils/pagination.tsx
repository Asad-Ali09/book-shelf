function applyPagination<T>(documents: T[], page: number, rowsPerPage: number) {
  return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}

export default applyPagination;
