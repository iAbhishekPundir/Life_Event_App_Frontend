import { Building2 } from 'lucide-react'
import { CLIENTS } from '../../data/clients'

const SCOPES = ['Transactions', 'Balances', 'Standing Orders', 'Direct Debits', 'Salary Credits', 'Beneficiaries']

export default function PrimaryDataSourceCard() {
  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-muted">Primary Data Source</p>
      <div className="rounded-xl border border-hairline bg-surface p-6 shadow-sm">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand shadow-sm">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2">
                <h3 className="text-base font-semibold text-brand">Meridian Core Banking System</h3>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  Active
                </span>
              </div>
              <p className="mb-3 text-xs text-ink-muted">
                Internal transaction ledger — direct read access, no consent required.
              </p>
              <div className="flex flex-wrap gap-2">
                {SCOPES.map((s) => (
                  <span key={s} className="rounded-full border border-hairline bg-canvas px-2 py-1 text-[10px] font-medium text-brand">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="shrink-0 space-y-1 text-right text-xs text-ink-muted">
            <div className="flex items-center justify-end gap-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span>Real-time sync</span>
            </div>
            <p>12,450 records ingested</p>
            <p>4 signals generated</p>
            <p>{CLIENTS.length} clients covered</p>
          </div>
        </div>
      </div>
    </div>
  )
}
