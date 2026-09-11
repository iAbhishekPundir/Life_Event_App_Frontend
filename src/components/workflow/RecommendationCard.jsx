import { Info, Sparkles } from 'lucide-react'
import InfoTooltip from '../common/InfoTooltip'

const EVENT_MATCH_TOOLTIP =
  'How closely this product maps to the detected life event, scored across historical transaction patterns for clients with similar signals.'
const CUSTOMER_MATCH_TOOLTIP =
  "How well this product fits this client's risk profile, segment, financial position, and existing product holdings."

export default function RecommendationCard({ rec }) {
  return (
    <details className="group overflow-hidden rounded-xl border border-hairline bg-slate-50/50">
      <summary className="flex cursor-pointer list-none flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-base font-semibold text-brand">{rec.title}</p>
            <Info className="h-4 w-4 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <p className="mt-1 text-sm text-ink-muted">{rec.rationale}</p>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <div className="text-right">
            <div className="mb-0.5 flex items-center justify-end gap-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Event match</span>
              <InfoTooltip text={EVENT_MATCH_TOOLTIP} />
            </div>
            <p className="text-sm font-semibold text-brand">{rec.matchEvent}%</p>
          </div>
          <div className="text-right">
            <div className="mb-0.5 flex items-center justify-end gap-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Customer match</span>
              <InfoTooltip text={CUSTOMER_MATCH_TOOLTIP} />
            </div>
            <p className="text-sm font-semibold text-brand">{rec.matchCustomer}%</p>
          </div>
        </div>
      </summary>
      <div className="border-t border-hairline px-5 pb-5">
        <div className="mt-4 rounded-lg bg-brand p-4 text-white">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-white" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-white">AI Justification</p>
          </div>
          <p className="text-sm leading-relaxed">{rec.justification}</p>
        </div>
      </div>
    </details>
  )
}
