import { Info } from 'lucide-react'

export default function InfoTooltip({ text, size = 'sm' }) {
  const dim = size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'
  return (
    <span title={text} className="cursor-help">
      <Info className={`${dim} text-ink-muted`} />
    </span>
  )
}
