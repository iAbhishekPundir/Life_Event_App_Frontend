import { Zap } from 'lucide-react'
import SectionCard from '../common/SectionCard'
import { conversionBarColor } from '../../utils/formatters'
import { ADVISOR_NAME } from '../../data/dashboardData'

export default function ConversionIntelligence({ recommendations, eventName }) {
  const topActions = recommendations.slice(0, 2)

  return (
    <SectionCard
      icon="Zap"
      title="Conversion Intelligence"
      subtitle={`Historical take-up rates for clients with a similar ${eventName} signal.`}
    >
      <div className="space-y-3">
        {recommendations.map((rec, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-24 shrink-0">
              <p className="truncate text-xs font-semibold text-brand">{rec.title}</p>
              <p className="text-[10px] text-ink-muted">{rec.avgDaysToTakeUp}d avg. take-up</p>
            </div>
            <div className="h-5 flex-1 overflow-hidden rounded-full bg-canvas">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${rec.conversionRate}%`, backgroundColor: conversionBarColor(rec.conversionRate) }}
              />
            </div>
            <span className="w-9 shrink-0 text-right text-sm font-bold text-brand">{rec.conversionRate}%</span>
          </div>
        ))}
      </div>

      <div className="mt-5 border-t border-hairline pt-4">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-ink-muted">
          Next Best Actions for {ADVISOR_NAME}
        </p>
        <div className="space-y-2">
          {topActions.map((rec, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-hairline bg-canvas p-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-brand">Discuss {rec.title}</p>
                <p className="mt-0.5 text-[10px] leading-relaxed text-ink-muted">{rec.rationale}</p>
              </div>
              <span className="mt-0.5 shrink-0 text-[10px] font-bold text-accent">{rec.conversionRate}% conv.</span>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  )
}
