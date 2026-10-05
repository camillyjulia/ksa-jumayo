import { useState } from 'react'
import { Gift, ExternalLink, Lock, Users } from 'lucide-react'
import { brl, priceRange, isTaken } from '../lib/utils'
import ColorDot from './ColorDot'

function ItemImage({ src }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="mb-3 flex h-36 items-center justify-center overflow-hidden rounded-xl bg-violet-100 text-violet-400">
      {src && !failed ? (
        <img src={src} alt="" loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover" />
      ) : (
        <Gift size={44} strokeWidth={1.5} />
      )}
    </div>
  )
}

function Badge({ item }) {
  if (isTaken(item)) {
    return item.givers.length > 1 ? (
      <span className="flex items-center gap-1 whitespace-nowrap rounded-full bg-violet-600 px-2 py-0.5 text-xs text-white">
        <Users size={12} /> reservado em grupo
      </span>
    ) : (
      <span className="flex items-center gap-1 rounded-full bg-violet-200 px-2 py-0.5 text-xs">
        <Lock size={12} /> reservado
      </span>
    )
  }
  return item.priority === 'essencial' ? (
    <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-xs text-white">essencial</span>
  ) : null
}

export default function ItemCard({ item, onGift }) {
  const { min, max } = priceRange(item)
  const taken = isTaken(item)

  return (
    <article className={`flex flex-col rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm ${taken ? 'opacity-60' : ''}`}>
      <ItemImage src={item.image_url} />
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-neutral-900">{item.name}</h3>
        <Badge item={item} />
      </div>
      <p className="mt-1 text-sm text-neutral-500">{item.description}</p>
      <div className="mt-3 flex gap-1.5">{item.colors.map((c) => <ColorDot key={c} color={c} />)}</div>
      <p className="mt-3 text-lg font-bold text-neutral-900">
        {min === max ? brl(min) : `${brl(min)} – ${brl(max)}`}
      </p>

      {!taken && (
        <div className="mt-3 flex flex-col gap-2">
          {item.links.map((l) => (
            <a
              key={l.store} href={l.url} target="_blank" rel="noreferrer"
              className="flex items-center justify-between rounded-lg border border-neutral-200 px-3 py-2 text-sm transition hover:border-violet-300 hover:bg-violet-50"
            >
              <span className="flex items-center gap-1.5">{l.store} <ExternalLink size={13} className="text-neutral-400" /></span>
              <span className="font-medium">{brl(l.price)}</span>
            </a>
          ))}
        </div>
      )}

      <button
        disabled={taken} onClick={() => onGift(item)}
        className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-neutral-900 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
      >
        <Gift size={16} /> {taken ? 'Já tem presente' : 'Quero presentear'}
      </button>
    </article>
  )
}