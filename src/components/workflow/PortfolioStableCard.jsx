import { CheckCircle2 } from 'lucide-react'

export default function PortfolioStableCard() {
  return (
    <div className="animate-fade-in-up rounded-2xl border border-hairline bg-surface p-12 text-center shadow-sm">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 shadow-inner">
        <CheckCircle2 className="h-8 w-8 text-emerald-600" />
      </div>
      <h3 className="mb-3 font-serif text-3xl text-brand">Portfolio Stable</h3>
      <p className="mx-auto max-w-lg text-lg text-ink-muted">
        Meridian scan complete. No significant life-event signals detected in recent bank account transactions.
        Current asset allocation remains aligned with risk profile.
      </p>
    </div>
  )
}
