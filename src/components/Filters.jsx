import { SlidersHorizontal, Check, X } from 'lucide-react'
import { RANGES } from '../lib/utils'
import { CATEGORY_LABELS } from '../messages'
import ColorDot from './ColorDot'

const SORTS = [
  ['padrao', 'Padrão'],
  ['menor', 'Menor preço'],
  ['maior', 'Maior preço'],
]

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button" onClick={onClick} aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
        active
          ? 'bg-neutral-900 text-white'
          : 'bg-white text-neutral-700 ring-1 ring-neutral-200 hover:ring-neutral-400'
      }`}
    >
      {active && <Check size={14} strokeWidth={3} />}
      {children}
    </button>
  )
}

// Rótulo numa coluna de largura fixa: todas as linhas ficam alinhadas
function Row({ label, children }) {
  return (
    <div className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:gap-4">
      <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-wide text-neutral-500">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

export default function Filters({
  colors, color, onColor,
  cats, onToggleCat, onClearCats,
  selected, onToggleRange, onClearRanges,
  sort, onSort, onClearAll,
}) {
  const hasActive = cats.length > 0 || selected.length > 0 || !!color

  return (
    <section className="mb-6 rounded-2xl border border-violet-100 bg-violet-50 p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <SlidersHorizontal size={16} /> Filtros
        </span>
        {hasActive && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 text-sm text-neutral-600 underline-offset-2 hover:text-neutral-900 hover:underline"
          >
            <X size={14} /> Limpar filtros
          </button>
        )}
      </div>

      <div className="divide-y divide-violet-100">
        <Row label="Categoria">
          <Chip active={cats.length === 0} onClick={onClearCats}>Todas</Chip>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <Chip key={key} active={cats.includes(key)} onClick={() => onToggleCat(key)}>{label}</Chip>
          ))}
        </Row>

        {colors.length > 0 && (
          <Row label="Cor">
            <Chip active={!color} onClick={() => onColor('')}>Todas</Chip>
            {colors.map((c) => (
              <Chip key={c} active={c === color} onClick={() => onColor(c === color ? '' : c)}>
                <ColorDot color={c} /> {c}
              </Chip>
            ))}
          </Row>
        )}

        <Row label="Valor">
          <Chip active={selected.length === 0} onClick={onClearRanges}>Todos</Chip>
          {RANGES.map((r, idx) => (
            <Chip key={r.label} active={selected.includes(idx)} onClick={() => onToggleRange(idx)}>{r.label}</Chip>
          ))}
        </Row>

        <Row label="Ordenar">
          {SORTS.map(([key, label]) => (
            <Chip key={key} active={sort === key} onClick={() => onSort(key)}>{label}</Chip>
          ))}
        </Row>
      </div>
    </section>
  )
}