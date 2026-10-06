import { supabase } from './supabase'

// O público não pode ler a coluna `givers` (nomes), por isso as colunas são listadas.
const ITEM_COLUMNS =
  'id, room_id, name, description, image_url, colors, priority, price_min, price_max, giver_count, links:item_links(id, store, url, price)'

export async function fetchWishlist() {
  const [rooms, items] = await Promise.all([
    supabase.from('rooms').select('*').order('position'),
    supabase.from('items').select(ITEM_COLUMNS).order('created_at').order('name'),
  ])
  if (rooms.error) throw rooms.error
  if (items.error) throw items.error

  return {
    rooms: rooms.data,
    // lojas do mais barato pro mais caro
    items: items.data.map((i) => ({ ...i, links: [...i.links].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity)) })),
  }
}

// true = reservou; false = alguém pegou o item antes
export async function reserveItem(itemId, names) {
  const { data, error } = await supabase.rpc('reserve_item', { p_item_id: itemId, p_names: names })
  if (error) throw error
  return data === true
}