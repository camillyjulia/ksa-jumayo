import { brl } from './lib/utils'

const HOST_WHATSAPP = import.meta.env.VITE_HOST_WHATSAPP

export const SITE = {
  title: 'Chá de Kasa Nova',
  couple: 'Júlia, M.A e Yoseph <3',
  date: '20/10/2026',
  place: 'Porto Alegre',
}

export const CATEGORY_LABELS = {
  essencial: 'Essencial',
  gostariamos: 'Gostaríamos',
  aura: '+Aura',
}

export const THANKS = 'Obrigada por participar desse passo tão importante em nossas vidas <3'

export const joinNames = (names) =>
  new Intl.ListFormat('pt-BR', { type: 'conjunction' }).format(names)

export function whatsappMessage(item, names) {
  const links = item.links.map((l) => `- ${l.store}: ${l.url} (${brl(l.price)})`).join('\n')
  const who = names.length === 1
    ? `Aqui é ${names[0]}. Vou presentear vocês com`
    : `Aqui é ${names[0]}. Somos ${joinNames(names)} e vamos presentear vocês com`
  return `Oi! ${who}: ${item.name}.\n\nOnde comprar:\n${links}`
}

export const whatsappUrl = (text) => `https://wa.me/${HOST_WHATSAPP}?text=${encodeURIComponent(text)}`