import { Product } from '@/types/crm'
import { isLowStockProduct } from '@/lib/portal/chart-utils'

export function getDefaultReorderLevel(settings?: Record<string, unknown>): number {
    const configured = Number(settings?.lowStockThreshold)
    return Number.isFinite(configured) && configured >= 0 ? configured : 5
}

export function countLowStockProducts(products: Product[], settings?: Record<string, unknown>): number {
    const defaultReorderLevel = getDefaultReorderLevel(settings)
    return products.filter((product) => isLowStockProduct(product, defaultReorderLevel)).length
}