import { TrendingDown } from 'lucide-react'

export default function LostOpportunitiesTable({ items }) {
  return (
    <div className="rounded-xl border border-hairline bg-surface p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-brand">
          <TrendingDown className="h-4 w-4 text-rose-500" />
          Lost Opportunities (30d)
        </h3>
        <span className="text-xs text-ink-muted">{items.length} cases</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-hairline text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
              <th className="pb-2 pr-3">Client</th>
              <th className="pb-2 pr-3">Event</th>
              <th className="pb-2 pr-3">Product</th>
              <th className="pb-2 pr-3">Reason</th>
              <th className="pb-2 pr-3">Date</th>
              <th className="pb-2">Est. Value</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row, i) => (
              <tr key={i} className="border-b border-hairline/60 last:border-0">
                <td className="py-2.5 pr-3 font-medium text-brand">{row.client}</td>
                <td className="py-2.5 pr-3 text-ink-muted">{row.event}</td>
                <td className="py-2.5 pr-3">
                  <span className="rounded-full bg-canvas px-2 py-0.5 text-xs font-medium text-brand">
                    {row.product}
                  </span>
                </td>
                <td className="py-2.5 pr-3 text-ink-muted">{row.reason}</td>
                <td className="py-2.5 pr-3 text-ink-muted">{row.date}</td>
                <td className="py-2.5 font-semibold text-brand">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
