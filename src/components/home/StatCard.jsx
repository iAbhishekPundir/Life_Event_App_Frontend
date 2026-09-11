import * as Icons from 'lucide-react'

const TONE_CLASSES = {
  brand: 'text-brand',
  blue: 'text-blue-600',
  amber: 'text-amber-600',
  emerald: 'text-emerald-600',
  rose: 'text-rose-600',
}

export default function StatCard({ icon, label, value, tone = 'brand', sublabel }) {
  const Icon = Icons[icon]
  return (
    <div className="rounded-xl border border-hairline bg-surface p-4 shadow-sm">
      <div className="mb-2 flex items-center gap-1.5">
        {Icon && <Icon className="h-3.5 w-3.5 text-ink-muted" />}
        <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">{label}</p>
      </div>
      <p className={`font-serif text-3xl font-semibold ${TONE_CLASSES[tone]}`}>{value}</p>
      {sublabel && <p className="mt-1 text-xs text-ink-muted">{sublabel}</p>}
    </div>
  )
}
