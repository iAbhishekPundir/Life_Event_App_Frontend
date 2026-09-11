import { CreditCard, ArrowRight, CalendarCheck, Activity, TrendingUp, PiggyBank } from 'lucide-react'

const CATEGORY_ICONS = {
  'Card Payment': CreditCard,
  'Bank Transfer': ArrowRight,
  'Standing Order': CalendarCheck,
  'Direct Debit': Activity,
  'Salary Credit': TrendingUp,
}

export default function TransactionsTable({ signals, eventName }) {
  return (
    <div>
      <h4 className="mb-1 font-semibold text-brand">Bank Transactions</h4>
      <p className="mb-4 text-sm text-ink-muted">
        Detected transaction patterns that indicate a likely {eventName.toLowerCase()} life event.
      </p>
      <div className="overflow-hidden rounded-xl border border-hairline">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-canvas text-left">
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-ink-muted">Transaction</th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-ink-muted">Type</th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-ink-muted">When</th>
              <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {signals.map((sig, i) => {
              const Icon = CATEGORY_ICONS[sig.category] ?? PiggyBank
              return (
                <tr key={i}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 shrink-0 text-ink-muted" />
                      <span className="font-medium text-brand">{sig.label}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{sig.category}</td>
                  <td className="px-4 py-3 text-ink-muted">{sig.time}</td>
                  <td className="px-4 py-3 text-right font-semibold text-brand">{sig.amount}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
