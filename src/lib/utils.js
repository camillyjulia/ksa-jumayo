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

export function priceRange(item) {
  const prices = item.links.map((l) => l.price).filter(Boolean)
  return { min: Math.min(...prices), max: Math.max(...prices) }
}

export const isTaken = (item) => item.giver_count > 0
