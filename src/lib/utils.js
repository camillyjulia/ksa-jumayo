export const COLOR_HEX = {
  branco: '#ffffff', preto: '#171717', cinza: '#a3a3a3', bege: '#e7d9c0',
  madeira: '#b08968', azul: '#60a5fa', vermelho: '#ef4444', verde: '#4ade80',
}

export const RANGES = [
  { label: 'Até R$ 50', min: 0, max: 50 },
  { label: 'R$ 50 – 150', min: 50, max: 150 },
  { label: 'R$ 150 – 300', min: 150, max: 300 },
  { label: 'Acima de R$ 300', min: 300, max: Infinity },
]

export const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// Faixa do item (price_min/max). Se não tiver, usa os preços dos links. Sem nada: null.
export function priceRange(item) {
  if (item.price_min != null) {
    return { min: Number(item.price_min), max: Number(item.price_max ?? item.price_min) }
  }
  const prices = (item.links || []).map((l) => l.price).filter((p) => p != null)
  return prices.length ? { min: Math.min(...prices), max: Math.max(...prices) } : { min: null, max: null }
}

export function priceTier(item) {
  const { min } = priceRange(item)
  if (min == null) return null
  return RANGES.findIndex((r) => min >= r.min && min < r.max)
}

export const isTaken = (item) => item.giver_count > 0