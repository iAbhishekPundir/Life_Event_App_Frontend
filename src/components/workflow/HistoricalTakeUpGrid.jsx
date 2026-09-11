import { TrendingUp } from 'lucide-react'

export default function HistoricalTakeUpGrid({ recommendations, eventName }) {
  return (
    <div className="border-t border-hairline pt-6">
      <h4 className="mb-4 flex items-center gap-2 font-semibold text-brand">
        <TrendingUp className="h-4 w-4 text-accent" />
        Historical product take-up — {eventName} predictions
      </h4>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {recommendations.map((rec, i) => (
          <div key={i} className="rounded-xl border border-hairline bg-surface p-5 shadow-sm">
            <p className="mb-1 text-sm font-semibold text-brand">{rec.title}</p>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-accent">{rec.conversionRate}%</span>
              <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">conversion</span>
            </div>
            <div className="space-y-1 text-xs text-ink-muted">
              <p>
                <span className="font-semibold text-brand">{rec.avgDaysToTakeUp}</span> days avg. take-up
              </p>
              <p>
                <span className="font-semibold text-brand">{rec.avgAmount}</span> avg. value
              </p>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-ink-muted">{rec.historicalNote}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
