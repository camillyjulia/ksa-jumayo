import { useEffect, useMemo, useState } from 'react'
import { SearchX, Loader2, TriangleAlert } from 'lucide-react'
import { fetchWishlist, reserveItem } from './lib/api'
import { priceRange, priceTier } from './lib/utils'
import Header from './components/Header'
import RoomTabs from './components/RoomTabs'
import Filters from './components/Filters'
import ItemCard from './components/ItemCard'
import GiftModal from './components/GiftModal'

export default function App() {
  const [rooms, setRooms] = useState([])
  const [data, setData] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'
  const [roomId, setRoomId] = useState(null)
  const [color, setColor] = useState('')
  const [selected, setSelected] = useState([]) // vazio = mostra todos os valores
  const [cats, setCats] = useState([]) // vazio = mostra todas as categorias
  const [sort, setSort] = useState('padrao')
  const [giftId, setGiftId] = useState(null)

  const load = async () => {
    try {
      const { rooms: r, items: it } = await fetchWishlist()
      setRooms(r)
      setData(it)
      setRoomId((cur) => cur ?? r[0]?.id ?? null)
      setStatus('ready')
    } catch (e) {
      console.error(e)
      setStatus('error')
    }
  }

  useEffect(() => { load() }, [])

  const roomItems = data.filter((i) => i.room_id === roomId)
  const colors = [...new Set(roomItems.flatMap((i) => i.colors))]

  const toggleRange = (idx) =>
    setSelected((s) => (s.includes(idx) ? s.filter((x) => x !== idx) : [...s, idx]))

  const toggleCat = (key) =>
    setCats((c) => (c.includes(key) ? c.filter((x) => x !== key) : [...c, key]))

  const handleReserve = async (id, names) => {
    const ok = await reserveItem(id, names)
    if (ok) setData((d) => d.map((i) => (i.id === id ? { ...i, giver_count: names.length } : i)))
    else load() // alguém reservou antes: atualiza a lista
    return ok
  }

  const visible = useMemo(() => {
    let list = roomItems.filter((i) => {
      const okColor = !color || i.colors.includes(color)
      const okPrice = selected.length === 0 || selected.includes(priceTier(i))
      const okCat = cats.length === 0 || cats.includes(i.priority)
      return okColor && okPrice && okCat
    })
    if (sort === 'menor') list = [...list].sort((a, b) => (priceRange(a).min ?? Infinity) - (priceRange(b).min ?? Infinity))
    if (sort === 'maior') list = [...list].sort((a, b) => (priceRange(b).min ?? -1) - (priceRange(a).min ?? -1))
    return list
  }, [data, roomId, color, selected, cats, sort])

  const giftItem = data.find((i) => i.id === giftId)

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header />
      {status === 'ready' && (
        <RoomTabs rooms={rooms} roomId={roomId} onSelect={(id) => { setRoomId(id); setColor('') }} />
      )}

      <main className="mx-auto max-w-5xl px-4 py-6">
        {status === 'loading' && (
          <div className="flex flex-col items-center gap-3 py-16 text-neutral-500">
            <Loader2 size={32} className="animate-spin" />
            <p>Carregando a lista...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-3 py-16 text-neutral-600">
            <TriangleAlert size={36} strokeWidth={1.5} />
            <p>Não consegui carregar a lista.</p>
            <button
              onClick={() => { setStatus('loading'); load() }}
              className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
            >
              Tentar de novo
            </button>
          </div>
        )}

        {status === 'ready' && (
          <>
            <Filters
              colors={colors} color={color} onColor={setColor}
              cats={cats} onToggleCat={toggleCat} onClearCats={() => setCats([])}
              selected={selected} onToggleRange={toggleRange} onClearRanges={() => setSelected([])}
              sort={sort} onSort={setSort}
              onClearAll={() => { setCats([]); setSelected([]); setColor('') }}
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
          </>
        )}
      </main>

      {giftItem && <GiftModal key={giftItem.id} item={giftItem} onClose={() => setGiftId(null)} onConfirm={handleReserve} />}
    </div>
  )
}