import { useState } from 'react'
import { Plug, ChevronRight, CheckCheck, RefreshCw, Lock, RotateCcw } from 'lucide-react'
import BankBadge from './BankBadge'
import ConnectionStatusPill from './ConnectionStatusPill'
import { OPEN_BANKING_SCOPES } from '../../data/configureData'
import { useExternalConnections } from '../../context/ExternalConnectionsContext'

export default function ExternalConnectionsList() {
  const { connections, setConnectionStatus, removeConnection } = useExternalConnections()
  const [expandedId, setExpandedId] = useState(null)

  if (connections.length === 0) {
    return (
      <div className="rounded-xl border border-hairline bg-surface p-10 text-center shadow-sm">
        <Plug className="mx-auto mb-3 h-10 w-10 text-slate-300" />
        <p className="text-sm text-ink-muted">No external accounts connected yet.</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-sm">
      <div className="divide-y divide-hairline">
        {connections.map((conn) => {
          const isExpanded = expandedId === conn.id
          return (
            <div key={conn.id}>
              <div
                className="flex cursor-pointer items-center gap-4 px-6 py-4 transition-colors hover:bg-slate-50/50"
                onClick={() => setExpandedId(isExpanded ? null : conn.id)}
              >
                <BankBadge bankId={conn.bankId} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-brand">{conn.bankName}</p>
                    <ConnectionStatusPill status={conn.status} />
                  </div>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    {conn.clientName} · {conn.scopes.length} scopes · {conn.recordsIngested} records ingested
                  </p>
                </div>
                <div className="shrink-0 text-right text-xs text-ink-muted">
                  {conn.lastSync ? <p>Last sync: {conn.lastSync}</p> : <p className="text-amber-600">Awaiting consent</p>}
                  {conn.expiry && <p>Expires: {conn.expiry}</p>}
                </div>
                <div className="ml-2 flex items-center gap-2">
                  {conn.status === 'expired' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setConnectionStatus(conn.id, 'pending')
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-100"
                    >
                      <RotateCcw className="h-3 w-3" /> Renew Consent
                    </button>
                  )}
                  <ChevronRight className={`h-4 w-4 text-ink-muted transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </div>
              </div>

              {isExpanded && (
                <div className="space-y-4 border-t border-hairline bg-canvas px-6 py-5">
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Records Ingested', value: conn.recordsIngested.toLocaleString() },
                      { label: 'Signals Generated', value: String(conn.signalsGenerated) },
                      { label: 'Consent Date', value: conn.consentDate ?? '—' },
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded-lg border border-hairline bg-white p-3">
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-ink-muted">{label}</p>
                        <p className="font-serif text-lg text-brand">{value}</p>
                      </div>
                    ))}
                  </div>
                  {conn.scopes.length > 0 && (
                    <div>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-ink-muted">Granted Scopes</p>
                      <div className="flex flex-wrap gap-2">
                        {conn.scopes.map((id) => (
                          <span
                            key={id}
                            className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-2.5 py-1 text-[10px] font-medium text-emerald-700"
                          >
                            <CheckCheck className="h-3 w-3" /> {OPEN_BANKING_SCOPES.find((s) => s.id === id)?.label ?? id}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {conn.status === 'active' && (
                    <div className="flex gap-3">
                      <button className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-white px-3 py-1.5 text-xs font-semibold text-brand transition-colors hover:bg-canvas">
                        <RefreshCw className="h-3 w-3" /> Refresh Now
                      </button>
                      <button
                        onClick={() => removeConnection(conn.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100"
                      >
                        <Lock className="h-3 w-3" /> Revoke Access
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
