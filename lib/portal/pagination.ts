export const DEFAULT_PAGE_SIZE = 50

export function getPageRange(page: number, pageSize = DEFAULT_PAGE_SIZE) {
    const from = page * pageSize
    return { from, to: from + pageSize - 1 }
}

export function getTotalPages(totalCount: number, pageSize = DEFAULT_PAGE_SIZE) {
    return Math.max(1, Math.ceil(totalCount / pageSize))
}
