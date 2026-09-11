import { FileText } from 'lucide-react'
import { CASE_STATUS_STYLES, PRIORITY_STYLES } from '../../utils/formatters'
import { useCaseStatus } from '../../context/CaseStatusContext'

export default function CaseIdStrip({ clientId, caseInfo }) {
  const { getStatus } = useCaseStatus()
  if (!caseInfo) return null
  const status = getStatus(clientId)

  return (
    <div className="flex items-center justify-between rounded-lg border border-hairline bg-surface px-4 py-2.5 shadow-sm">
      <div className="flex items-center gap-2.5">
        <FileText className="h-4 w-4 text-ink-muted" />
        <span className="text-xs font-medium text-ink-muted">Case ID</span>
        <span className="text-xs font-bold tracking-wider text-brand">{caseInfo.id}</span>
      </div>
      <div className="flex items-center gap-4 text-xs text-ink-muted">
        <span>Opened {caseInfo.opened}</span>
        <span className={`rounded-full px-2 py-0.5 font-semibold ${CASE_STATUS_STYLES[status] ?? CASE_STATUS_STYLES.Open}`}>
          {status ?? 'Open'}
        </span>
        <span className={`rounded-full px-2 py-0.5 font-semibold ${PRIORITY_STYLES[caseInfo.priority]}`}>
          {caseInfo.priority} priority
        </span>
      </div>
    </div>
  )
}
