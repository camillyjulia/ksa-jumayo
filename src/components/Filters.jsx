import { RANGES } from '../lib/utils'
import Checkbox from './Checkbox'
import ColorDot from './ColorDot'

const chip = (on) =>
  `rounded-full px-3 py-1 text-sm ring-1 transition ${on ? 'bg-neutral-900 text-white ring-neutral-900' : 'bg-white ring-neutral-300 hover:ring-neutral-500'}`

export default function Filters({ colors, color, onColor, selected, onToggleRange, onClearRanges, sort, onSort }) {
  return (
    <section className="mb-6 rounded-2xl bg-violet-50 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-medium">Cor</span>
        <button onClick={() => onColor('')} className={chip(!color)}>Todas</button>
        {colors.map((c) => (
          <button key={c} onClick={() => onColor(c === color ? '' : c)} className={`flex items-center gap-1.5 ${chip(c === color)}`}>
            <ColorDot color={c} /> {c}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="text-sm font-medium">Valor</span>
        <Checkbox checked={selected.length === 0} onChange={onClearRanges}>Todos</Checkbox>
        {RANGES.map((r, idx) => (
          <Checkbox key={r.label} checked={selected.includes(idx)} onChange={() => onToggleRange(idx)}>
            {r.label}
          </Checkbox>
        ))}
        <select
          value={sort} onChange={(e) => onSort(e.target.value)}
          className="ml-auto rounded-lg border border-neutral-300 bg-white px-2 py-1.5 text-sm"
        >
          <option value="padrao">Ordem padrão</option>
          <option value="menor">Menor preço</option>
          <option value="maior">Maior preço</option>
        </select>
      </div>
    </section>
  )
}