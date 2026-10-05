import { Check } from 'lucide-react'

export default function Checkbox({ checked, onChange, children }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="flex h-5 w-5 items-center justify-center rounded-md border border-neutral-400 bg-white text-white transition peer-checked:border-neutral-900 peer-checked:bg-neutral-900 peer-focus-visible:ring-2 peer-focus-visible:ring-violet-400">
        {checked && <Check size={14} strokeWidth={3} />}
      </span>
      {children}
    </label>
  )
}