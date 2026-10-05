import { CookingPot, Sofa, BedDouble, ShowerHead, WashingMachine, Gift } from 'lucide-react'

// O banco guarda só o nome do ícone. Cômodo novo? Importe o ícone e adicione aqui.
const ICONS = { CookingPot, Sofa, BedDouble, ShowerHead, WashingMachine }

export default function RoomTabs({ rooms, roomId, onSelect }) {
  return (
    <nav className="sticky top-0 z-10 overflow-x-auto border-b border-neutral-200 bg-white">
      <div className="mx-auto flex w-max min-w-full justify-center gap-1 px-4">
        {rooms.map((r) => {
          const Icon = ICONS[r.icon] || Gift
          const active = r.id === roomId
          return (
            <button
              key={r.id} onClick={() => onSelect(r.id)}
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition ${
                active ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2.25 : 1.75} /> {r.name}
            </button>
          )
        })}
      </div>
    </nav>
  )
}