import { House, CalendarDays, MapPin } from 'lucide-react'
import { SITE } from '../messages'

export default function Header() {
  return (
    <header className="bg-violet-200 px-6 py-12 text-center">
      <House size={40} strokeWidth={1.5} className="mx-auto" />
      <h1 className="mt-3 text-3xl font-bold">{SITE.title}</h1>
      <p className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-neutral-700">
        <span>{SITE.couple}</span>
        <span className="flex items-center gap-1.5"><CalendarDays size={16} /> {SITE.date}</span>
        <span className="flex items-center gap-1.5"><MapPin size={16} /> {SITE.place}</span>
      </p>
    </header>
  )
}