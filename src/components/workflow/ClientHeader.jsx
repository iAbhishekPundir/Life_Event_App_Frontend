import { Link } from 'react-router-dom'
import { FileText, Home } from 'lucide-react'
import IconAvatar from '../common/IconAvatar'
import { CASE_STATUS_STYLES_BORDERED, PRIORITY_STYLES } from '../../utils/formatters'
import { useCaseStatus } from '../../context/CaseStatusContext'

export default function ClientHeader({ client, showHomeLink = false }) {
  const { getStatus } = useCaseStatus()
  const status = client.caseInfo ? getStatus(client.id) : null

  return (
    <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-start">
      <div>
        {showHomeLink && (
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted transition-colors hover:text-brand"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
        )}
        <div className="flex items-center gap-4">
          <IconAvatar initials={client.initials} size="lg" className="border-2 border-white shadow-md" />
          <div>
            <h2 className="font-serif text-4xl tracking-tight text-brand">{client.name}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-hairline bg-white px-2.5 py-0.5 text-xs text-ink-muted">
                {client.segment}
              </span>
              {client.caseInfo && (
                <>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
                    <FileText className="h-3.5 w-3.5" />
                    {client.caseInfo.id}
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${CASE_STATUS_STYLES_BORDERED[status] ?? CASE_STATUS_STYLES_BORDERED.Open}`}
                  >
                    {status ?? 'Open'}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${PRIORITY_STYLES[client.caseInfo.priority]}`}>
                    {client.caseInfo.priority} priority
                  </span>
                  <span className="text-xs text-ink-muted">· opened {client.caseInfo.opened}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
