import { Database, Zap, Link2, Clock, WifiOff, CheckCheck, Lock, RefreshCw, ExternalLink, RotateCcw, Globe } from 'lucide-react'
import BankBadge from './BankBadge'
import ConnectionStatusPill from './ConnectionStatusPill'
import { OPEN_BANKING_SCOPES } from '../../data/configureData'
import { useExternalConnections } from '../../context/ExternalConnectionsContext'

export default function FeedsTab() {
  const { connections, setConnectionStatus } = useExternalConnections()

  const totalRecords = connections.reduce((a, c) => a + c.recordsIngested, 0)
  const totalSignals = connections.reduce((a, c) => a + c.signalsGenerated, 0)
  const activeCount = connections.filter((c) => c.status === 'active').length

  const stats = [
    { label: 'Total Records Ingested', value: totalRecords.toLocaleString(), icon: Database, color: 'text-brand' },
    { label: 'Signals from Ext. Sources', value: String(totalSignals), icon: Zap, color: 'text-accent' },
    { label: 'Active Connections', value: String(activeCount), icon: Link2, color: 'text-blue-600' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-hairline bg-surface p-5 shadow-sm">
            <div className="mb-2 flex items-center gap-1.5">
              <Icon className={`h-3.5 w-3.5 ${color}`} />
              <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">{label}</p>
            </div>
            <p className={`font-serif text-3xl ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {connections.map((conn) => (
        <div key={conn.id} className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-sm">
          <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
            <div className="flex items-center gap-3">
              <BankBadge bankId={conn.bankId} size="lg" />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-brand">{conn.bankName}</h4>
                  <ConnectionStatusPill status={conn.status} />
                </div>
                <p className="mt-0.5 text-xs text-ink-muted">{conn.clientName}</p>
              </div>
            </div>
            <div className="text-right text-xs text-ink-muted">
              {conn.status === 'active' ? (
                <>
                  <div className="mb-1 flex items-center justify-end gap-1.5">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    <span>Last sync: {conn.lastSync}</span>
                  </div>
                  <p>Consent expires: {conn.expiry}</p>
                </>
              ) : conn.status === 'pending' ? (
                <div className="flex items-center gap-1.5 text-amber-600">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Awaiting customer consent</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-red-600">
                  <WifiOff className="h-3.5 w-3.5" />
                  <span>Consent expired — data feed paused</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4 p-5">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Records Ingested', value: conn.recordsIngested.toLocaleString() },
                { label: 'Signals Generated', value: String(conn.signalsGenerated) },
                { label: 'Consent Date', value: conn.consentDate ?? 'Pending' },
                { label: 'Consent Expiry', value: conn.expiry ?? '—' },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-lg border border-hairline bg-canvas p-3">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-ink-muted">{label}</p>
                  <p className="text-base font-semibold text-brand">{value}</p>
                </div>
              ))}
            </div>

            {conn.scopes.length > 0 && (
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-ink-muted">Authorised Data Scopes</p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {OPEN_BANKING_SCOPES.map((sc) => {
                    const granted = conn.scopes.includes(sc.id)
                    return (
                      <div
                        key={sc.id}
                        className={`flex items-start gap-2.5 rounded-lg border p-3 ${
                          granted ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-slate-50 opacity-50'
                        }`}
                      >
                        {granted ? (
                          <CheckCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        ) : (
                          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                        )}
                        <div>
                          <p className={`text-xs font-semibold ${granted ? 'text-emerald-700' : 'text-slate-500'}`}>{sc.label}</p>
                          <p className="text-[10px] text-ink-muted">{sc.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {conn.status === 'active' && (
              <div className="flex gap-3 pt-1">
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-white px-3 py-1.5 text-xs font-semibold text-brand transition-colors hover:bg-canvas">
                  <RefreshCw className="h-3 w-3" /> Refresh Feed Now
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-white px-3 py-1.5 text-xs font-semibold text-ink-muted transition-colors hover:bg-canvas">
                  <ExternalLink className="h-3 w-3" /> View Raw Data
                </button>
              </div>
            )}
            {conn.status === 'expired' && (
              <button
                onClick={() => setConnectionStatus(conn.id, 'pending')}
                className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-100"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Renew Consent to Resume Feed
              </button>
            )}
            {conn.status === 'pending' && (
              <div className="flex items-center gap-2 text-xs font-medium text-amber-700">
                <Clock className="h-3.5 w-3.5" />
                Feed will begin automatically once the client approves the consent request.
              </div>
            )}
          </div>
        </div>
      ))}

      {connections.length === 0 && (
        <div className="rounded-xl border border-hairline bg-surface py-16 text-center shadow-sm">
          <Globe className="mx-auto mb-4 h-12 w-12 text-slate-300" />
          <p className="text-sm text-ink-muted">No external feeds configured. Connect an external account from the Data Sources tab.</p>
        </div>
      )}
    </div>
  )
}
