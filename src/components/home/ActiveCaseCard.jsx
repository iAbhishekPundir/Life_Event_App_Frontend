import { useNavigate } from 'react-router-dom'
import { FileText, ArrowRight } from 'lucide-react'
import IconAvatar from '../common/IconAvatar'
import { CASE_STATUS_STYLES } from '../../utils/formatters'
import { useCaseStatus } from '../../context/CaseStatusContext'

export default function ActiveCaseCard({ client }) {
  const navigate = useNavigate()
  const { getStatus, markOpened } = useCaseStatus()
  const { event, caseInfo } = client
  const status = caseInfo ? getStatus(client.id) : null

  const openCase = () => {
    if (caseInfo) markOpened(client.id)
    navigate(`/client/${client.id}`)
  }

  return (
    <div
      onClick={openCase}
      className="group flex cursor-pointer flex-col gap-4 rounded-xl border border-hairline bg-surface p-5 shadow-sm transition-all hover:border-accent/40 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <IconAvatar initials={client.initials} size="md" />
          <div>
            <p className="text-base font-semibold leading-tight text-brand transition-colors group-hover:text-accent">
              {client.name}
            </p>
            <p className="mt-0.5 text-xs text-ink-muted">
              {client.segment} • {client.portfolio}
            </p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            openCase()
          }}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-brand/90"
        >
          Open
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {caseInfo && (
        <div className="flex items-center justify-between rounded-lg border border-hairline bg-canvas px-3 py-2">
          <div className="flex items-center gap-1.5">
            <FileText className="h-3 w-3 text-ink-muted" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-ink-muted">{caseInfo.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${CASE_STATUS_STYLES[status] ?? CASE_STATUS_STYLES.Open}`}>
              {status ?? 'Open'}
            </span>
            <span className="text-[10px] text-ink-muted">{caseInfo.daysOpen}d open</span>
          </div>
        </div>
      )}

      {client.hasSignal && event ? (
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span className="font-semibold text-brand">
              {event.eventName}
              <span className="ml-2 text-xs font-normal text-ink-muted">
                Confidence {Math.round(event.confidence * 100)}% • {event.timeline}
              </span>
            </span>
          </li>
          <li className="flex items-start gap-2.5 leading-relaxed text-ink-muted">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
            <span>
              {event.recommendations?.length
                ? `${event.recommendations.slice(0, 2).map((r) => r.title).join(' and ')} opportunities identified.`
                : 'Open the workflow to generate recommendations.'}
            </span>
          </li>
        </ul>
      ) : (
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
            <span className="font-semibold text-brand">No life events detected</span>
          </li>
          <li className="flex items-start gap-2.5 leading-relaxed text-ink-muted">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
            <span>Portfolio aligned with {client.risk.toLowerCase()} risk profile.</span>
          </li>
        </ul>
      )}
    </div>
  )
}
