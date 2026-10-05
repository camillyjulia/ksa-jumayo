import { useMemo, useState } from 'react'
import { SearchX } from 'lucide-react'
import { rooms, items as initialItems } from './data'
import { RANGES, priceRange } from './lib/utils'
import Header from './components/Header'
import RoomTabs from './components/RoomTabs'
import Filters from './components/Filters'
import ItemCard from './components/ItemCard'
import GiftModal from './components/GiftModal'

export default function App() {
  const [data, setData] = useState(initialItems)
  const [roomId, setRoomId] = useState(rooms[0].id)
  const [color, setColor] = useState('')
  const [selected, setSelected] = useState([]) // vazio = mostra todos os valores
  const [sort, setSort] = useState('padrao')
  const [giftId, setGiftId] = useState(null)

  const roomItems = data.filter((i) => i.room_id === roomId)
  const colors = [...new Set(roomItems.flatMap((i) => i.colors))]

  const toggleRange = (idx) =>
    setSelected((s) => (s.includes(idx) ? s.filter((x) => x !== idx) : [...s, idx]))

  const reserveItem = (id, names) =>
    setData((d) => d.map((i) => (i.id === id ? { ...i, givers: names } : i)))

  const visible = useMemo(() => {
    let list = roomItems.filter((i) => {
      const { min } = priceRange(i)
      const okColor = !color || i.colors.includes(color)
      const okPrice =
        selected.length === 0 || selected.some((idx) => min >= RANGES[idx].min && min < RANGES[idx].max)
      return okColor && okPrice
    })
    if (sort === 'menor') list = [...list].sort((a, b) => priceRange(a).min - priceRange(b).min)
    if (sort === 'maior') list = [...list].sort((a, b) => priceRange(b).min - priceRange(a).min)
    return list
  }, [data, roomId, color, selected, sort])

  const giftItem = data.find((i) => i.id === giftId)

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header />
      <RoomTabs rooms={rooms} roomId={roomId} onSelect={(id) => { setRoomId(id); setColor('') }} />

      <main className="mx-auto max-w-5xl px-4 py-6">
        <Filters
          colors={colors} color={color} onColor={setColor}
          selected={selected} onToggleRange={toggleRange} onClearRanges={() => setSelected([])}
          sort={sort} onSort={setSort}
        />

        {visible.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-neutral-500">
            <SearchX size={40} strokeWidth={1.5} />
            <p>Nenhum item com esses filtros</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((i) => <ItemCard key={i.id} item={i} onGift={(it) => setGiftId(it.id)} />)}
          </div>
        )}
      </main>

      {giftItem && <GiftModal key={giftItem.id} item={giftItem} onClose={() => setGiftId(null)} onConfirm={reserveItem} />}
    </div>
  )
}