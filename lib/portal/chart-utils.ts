export type MonthlyChartPoint = {
    month: string
    sortKey: string
    revenue: number
    profit: number
    expenses: number
}

export function getMonthSortKey(dateInput: string | Date): string {
    const date = new Date(dateInput)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `${year}-${month}`
}

export function formatMonthLabel(dateInput: string | Date): string {
    const date = new Date(dateInput)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function sortMonthlyChartData<T extends { sortKey: string }>(data: T[]): T[] {
    return [...data].sort((a, b) => a.sortKey.localeCompare(b.sortKey))
}

export function calculatePercentChange(current: number, previous: number): number | null {
    if (previous === 0) {
        return current === 0 ? 0 : null
    }
    return ((current - previous) / previous) * 100
}

export function formatPercentChange(change: number | null): string {
    if (change === null) {
        return 'New this month'
    }

    const rounded = Math.abs(change) >= 10 ? change.toFixed(0) : change.toFixed(1)
    const prefix = change > 0 ? '+' : ''
    return `${prefix}${rounded}% from last month`
}

export function getTrendColor(change: number | null): string {
    if (change === null) return 'text-brand-electric'
    if (change > 0) return 'text-emerald-500'
    if (change < 0) return 'text-rose-500'
    return 'text-muted-foreground'
}

export function isLowStockProduct(
    product: { stock_quantity?: number | null; reorder_level?: number | null },
    defaultReorderLevel = 5
): boolean {
    if (product.stock_quantity === undefined || product.stock_quantity === null) {
        return false
    }

    const reorderLevel = product.reorder_level ?? defaultReorderLevel
    return product.stock_quantity <= reorderLevel
}