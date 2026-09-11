import { TrendingUp, Activity, CalendarCheck, Lightbulb } from 'lucide-react'

const CARDS = [
  { key: 'spendingPattern', icon: TrendingUp, label: 'Spending Pattern' },
  { key: 'jumpInSpend', icon: Activity, label: 'Jump in Spend' },
  { key: 'season', icon: CalendarCheck, label: 'Season / Timing' },
  { key: 'supportingNote', icon: Lightbulb, label: 'Why this event?' },
]

export default function InsightMiniCards({ analytics }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CARDS.map(({ key, icon: Icon, label }) => (
        <div key={key} className="rounded-xl border border-hairline bg-surface p-5 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <Icon className="h-4 w-4 text-accent" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-ink-muted">{label}</p>
          </div>
          <p className="text-sm font-medium leading-relaxed text-brand">{analytics[key]}</p>
        </div>
      ))}
    </div>
  )
}
