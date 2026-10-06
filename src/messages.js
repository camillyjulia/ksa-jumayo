import { brl } from './lib/utils'

const HOST_WHATSAPP = import.meta.env.VITE_HOST_WHATSAPP

export const SITE = {
  title: 'Chá de Kasa Nova',
  couple: 'Júlia, M.A e Yoseph <3',
  date: '20/10/2026',
  place: 'Porto Alegre',
}

// Categorias dos itens (a chave é o valor guardado na coluna `priority`)
export const CATEGORY_LABELS = {
  essencial: 'Essencial',
  gostariamos: 'Gostaríamos',
  aura: '+Aura',
}

// Tela de confirmação (depois que a pessoa reserva o item)
export const THANKS = 'Obrigada por participar desse passo tão importante em nossas vidas!'

export const joinNames = (names) =>
  new Intl.ListFormat('pt-BR', { type: 'conjunction' }).format(names)

// Mensagem que o convidado envia pra vocês no WhatsApp
export function whatsappMessage(item, names) {
  const links = item.links
    .map((l) => `- ${l.store}: ${l.url}${l.price != null ? ` (${brl(l.price)})` : ''}`)
    .join('\n')
  const linksBlock = item.links.length ? `\n\nOnde comprar:\n${links}` : ''
  const who = names.length === 1
    ? `Aqui é ${names[0]}. Vou presentear vocês com`
    : `Aqui é ${names[0]}. Somos ${joinNames(names)} e vamos presentear vocês com`
  return `Oi! ${who}: ${item.name}.${linksBlock}`
}

export const whatsappUrl = (text) => `https://wa.me/${HOST_WHATSAPP}?text=${encodeURIComponent(text)}`