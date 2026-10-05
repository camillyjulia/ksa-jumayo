import { useState } from 'react'
import { X, Plus, Heart, MessageCircle } from 'lucide-react'
import { THANKS, joinNames, whatsappMessage, whatsappUrl } from '../messages'

const inputCls = 'w-full rounded-lg border border-neutral-300 px-3 py-2 font-normal outline-none focus:border-violet-500'

function Option({ active, onClick, title, desc }) {
  return (
    <button
      type="button" onClick={onClick}
      className={`w-full rounded-xl border p-3 text-left transition ${active ? 'border-neutral-900 bg-violet-50' : 'border-neutral-200 hover:border-neutral-400'}`}
    >
      <span className="font-medium">{title}</span>
      <span className="block text-sm text-neutral-500">{desc}</span>
    </button>
  )
}

export default function GiftModal({ item, onClose, onConfirm }) {
  const [name, setName] = useState('')
  const [mode, setMode] = useState('solo') // 'solo' | 'group'
  const [others, setOthers] = useState([''])
  const [done, setDone] = useState(null)

  const cleanOthers = others.map((o) => o.trim()).filter(Boolean)
  const valid = name.trim().length > 1 && (mode === 'solo' || cleanOthers.length > 0)

  const setOther = (i, v) => setOthers((o) => o.map((x, idx) => (idx === i ? v : x)))
  const removeOther = (i) => setOthers((o) => (o.length === 1 ? [''] : o.filter((_, idx) => idx !== i)))

  const confirm = () => {
    const names = [name.trim(), ...(mode === 'group' ? cleanOthers : [])]
    onConfirm(item.id, names)
    setDone({ names, message: whatsappMessage(item, names) })
  }

  return (
    <div className="fixed inset-0 z-20 flex items-end justify-center bg-neutral-900/50 p-4 sm:items-center" onClick={onClose}>
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-bold">{done ? 'Presente confirmado!' : item.name}</h2>
          <button onClick={onClose} aria-label="Fechar" className="text-neutral-500 hover:text-neutral-900"><X size={20} /></button>
        </div>

        {!done ? (
          <div className="mt-4 space-y-4">
            <label className="block text-sm font-medium">
              Teu nome
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Como tu quer aparecer" className={`mt-1 ${inputCls}`} />
            </label>

            <div className="space-y-2">
              <Option active={mode === 'solo'} onClick={() => setMode('solo')} title="Eu dou esse presente" desc="Só eu" />
              <Option active={mode === 'group'} onClick={() => setMode('group')} title="Vamos dar em grupo" desc="Eu e mais pessoas que vão junto comigo" />
            </div>

            {mode === 'group' && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Quem vai junto contigo?</p>
                {others.map((o, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={o} onChange={(e) => setOther(i, e.target.value)} placeholder={`Nome ${i + 1}`} className={inputCls} />
                    <button onClick={() => removeOther(i)} aria-label="Remover nome" className="px-1 text-neutral-400 hover:text-neutral-900">
                      <X size={18} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setOthers((o) => [...o, ''])}
                  className="flex items-center gap-1.5 text-sm font-medium text-neutral-700 hover:text-neutral-900"
                >
                  <Plus size={16} /> Adicionar outra pessoa
                </button>
              </div>
            )}

            <button
              disabled={!valid} onClick={confirm}
              className="w-full rounded-xl bg-neutral-900 py-3 font-medium text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
            >
              Confirmar
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <p className="flex items-start gap-2 text-neutral-800">
              <span>{THANKS}</span>
              <Heart size={18} className="mt-0.5 shrink-0 fill-violet-500 text-violet-500" />
            </p>
            <p className="text-sm text-neutral-500">
              {joinNames(done.names)}, o item ficou reservado pra {done.names.length === 1 ? 'ti' : 'vocês'}.
            </p>
            <a
              href={whatsappUrl(done.message)} target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-neutral-900 py-3 font-medium text-white transition hover:bg-neutral-700"
            >
              <MessageCircle size={18} /> Enviar confirmação no WhatsApp
            </a>
            <p className="text-center text-xs text-neutral-500">A mensagem já vai pronta, com o item e os links de compra.</p>
          </div>
        )}
      </div>
    </div>
  )
}