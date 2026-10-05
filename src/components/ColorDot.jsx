import { COLOR_HEX } from '../lib/utils'

export default function ColorDot({ color }) {
  return (
    <span
      title={color}
      className="inline-block h-4 w-4 rounded-full border border-neutral-300"
      style={{ background: COLOR_HEX[color] || '#d4d4d4' }}
    />
  )
}