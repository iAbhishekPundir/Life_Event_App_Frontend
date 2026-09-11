import { Shield, Globe, ShieldCheck, Eye, Send, RotateCcw } from 'lucide-react'
import BankBadge from './BankBadge'
import ConnectionStatusPill from './ConnectionStatusPill'
import IconAvatar from '../common/IconAvatar'
import { OPEN_BANKING_SCOPES } from '../../data/configureData'
import { CLIENTS } from '../../data/clients'
import { useExternalConnections } from '../../context/ExternalConnectionsContext'

const REGULATORY_FRAMEWORK = [
  { label: 'Standard', value: 'UK Open Banking (OBIE)', icon: Globe },
  { label: 'Directive', value: 'PSD2 (Payment Services Directive 2)', icon: ShieldCheck },
  { label: 'Regulator', value: 'FCA (Financial Conduct Authority)', icon: Shield },
]

export default function ConsentTab() {
  const { connections, setConnectionStatus } = useExternalConnections()

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <Shield className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <div>
          <p className="mb-1 text-sm font-semibold text-amber-800">Consent Management — UK Open Banking (PSD2)</p>
          <p className="text-xs text-amber-700">
            Each client must give explicit, revocable consent before Meridian may access their data at an external institution.
            Consent is valid for 90 days and must be renewed. The client can withdraw consent at any time via their bank's app or
            website.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-sm">
        <div className="grid grid-cols-6 gap-4 border-b border-hairline bg-canvas px-6 py-3">
          {['Client', 'External Bank', 'Status', 'Scopes Granted', 'Expiry', 'Action'].map((h) => (
            <p key={h} className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
              {h}
            </p>
          ))}
        </div>
        <div className="divide-y divide-hairline">
          {connections.map((conn) => (
            <div key={conn.id} className="grid grid-cols-6 items-center gap-4 px-6 py-4 transition-colors hover:bg-slate-50/50">
              <div className="flex items-center gap-2">
                <IconAvatar initials={CLIENTS.find((c) => c.id === conn.clientId)?.initials ?? '?'} size="sm" />
                <span className="truncate text-sm font-semibold text-brand">{conn.clientName}</span>
              </div>
              <div className="flex items-center gap-2">
                <BankBadge bankId={conn.bankId} />
                <span className="text-sm text-brand">{conn.bankName}</span>
              </div>
              <div>
                <ConnectionStatusPill status={conn.status} />
              </div>
              <div>
                {conn.scopes.length > 0 ? (
                  <span className="text-xs font-medium text-brand">
                    {conn.scopes.length} / {OPEN_BANKING_SCOPES.length} scopes
                  </span>
                ) : (
                  <span className="text-xs text-ink-muted">—</span>
                )}
              </div>
              <div className="text-xs text-ink-muted">{conn.expiry ?? '—'}</div>
              <div>
                {conn.status === 'active' && (
                  <button className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-white px-3 py-1.5 text-xs font-semibold text-brand transition-colors hover:bg-canvas">
                    <Eye className="h-3 w-3" /> View
                  </button>
                )}
                {conn.status === 'pending' && (
                  <button className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-100">
                    <Send className="h-3 w-3" /> Resend
                  </button>
                )}
                {conn.status === 'expired' && (
                  <button
                    onClick={() => setConnectionStatus(conn.id, 'pending')}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100"
                  >
                    <RotateCcw className="h-3 w-3" /> Renew
                  </button>
                )}
              </div>
            </div>
          ))}
          {connections.length === 0 && (
            <div className="px-6 py-10 text-center text-sm text-ink-muted">
              No external connections yet. Add one from the Data Sources tab.
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3 rounded-xl border border-hairline bg-surface p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">Regulatory Framework</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {REGULATORY_FRAMEWORK.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-start gap-3 rounded-lg border border-hairline bg-canvas p-3">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">{label}</p>
                <p className="mt-0.5 text-xs font-semibold text-brand">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
