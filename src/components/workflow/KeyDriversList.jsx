import { CreditCard, ArrowRight, CalendarCheck, Activity, TrendingUp, PiggyBank } from 'lucide-react'
import SectionCard from '../common/SectionCard'

const CATEGORY_ICONS = {
  'Card Payment': CreditCard,
  'Bank Transfer': ArrowRight,
  'Standing Order': CalendarCheck,
  'Direct Debit': Activity,
  'Salary Credit': TrendingUp,
}

function isCredit(signal) {
  return signal.amount?.startsWith('+') || signal.category === 'Salary Credit'
}

export default function KeyDriversList({ signals }) {
  return (
    <SectionCard icon="Activity" title="Key Drivers">
      <div className="space-y-5">
        {signals.map((sig, i) => {
          const Icon = CATEGORY_ICONS[sig.category] ?? PiggyBank
          return (
            <div key={i} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-hairline bg-slate-50">
                <Icon className="h-5 w-5 text-ink-muted" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight text-brand">{sig.label}</p>
                <p className="mt-1.5 text-xs font-medium text-ink-muted">
                  {sig.category} • {sig.time} •{' '}
                  <span className={isCredit(sig) ? 'text-emerald-700' : 'text-brand'}>{sig.amount}</span>
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </SectionCard>
  )
}
