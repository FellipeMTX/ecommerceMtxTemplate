// Shared helpers for variation-aware carts and pricing.
// A `variant` is a plain object mapping a variation group name to the chosen
// option label, e.g. { "Memória": "512GB", "Cor": "Titânio Azul" }.
// `null`/empty means the product has no variations selected (simple product).

// Sum of the priceDelta of every selected option. Options without a priceDelta
// (or priceDelta 0) don't change the price — the "optional price change" rule.
export const getVariantExtra = (product, variant) => {
    if (!variant || !product?.variations?.length) return 0
    let extra = 0
    for (const group of product.variations) {
        const chosenLabel = variant[group.name]
        if (!chosenLabel) continue
        const option = group.options.find((o) => o.label === chosenLabel)
        if (option?.priceDelta) extra += Number(option.priceDelta) || 0
    }
    return extra
}

// Effective unit price / list price for a product given the selected variant.
export const getVariantPrice = (product, variant) => (product?.price || 0) + getVariantExtra(product, variant)
export const getVariantMrp = (product, variant) => (product?.mrp || 0) + getVariantExtra(product, variant)

// Single money formatter so every screen shows amounts the same way.
export const formatMoney = (value) => Number(value || 0).toLocaleString()

// Deterministic cart key. Same product + same combination => same key, so
// quantities accumulate; different combinations are separate cart lines.
// A product with no variant collapses to just its id (back-compatible).
export const makeCartKey = (productId, variant) => {
    if (!variant || Object.keys(variant).length === 0) return productId
    const signature = Object.keys(variant)
        .sort()
        .map((name) => `${name}:${variant[name]}`)
        .join('|')
    return `${productId}::${signature}`
}

// Human-readable one-line summary of a variant, e.g. "Memória: 512GB · Cor: Azul".
export const formatVariant = (variant) => {
    if (!variant || Object.keys(variant).length === 0) return ''
    return Object.entries(variant)
        .map(([name, value]) => `${name}: ${value}`)
        .join(' · ')
}
