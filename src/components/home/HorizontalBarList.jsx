export default function HorizontalBarList({ icon: Icon, title, total, totalLabel, items, renderTrailing }) {
  const maxCount = Math.max(...items.map((i) => i.count))

  return (
    <div className="rounded-xl border border-hairline bg-surface p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-brand">
          {Icon && <Icon className="h-4 w-4 text-accent" />}
          {title}
        </h3>
        {total !== undefined && <span className="text-xs text-ink-muted">{total} {totalLabel}</span>}
      </div>
      <div className="space-y-3.5">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="w-24 shrink-0 truncate text-sm text-ink">{item.label}</span>
            <div className="h-4 flex-1 overflow-hidden rounded-full bg-canvas">
              <div
                className="h-full rounded-full bg-brand"
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              />
            </div>
            <div className="flex w-24 shrink-0 items-center justify-end gap-2 text-xs">
              {renderTrailing ? renderTrailing(item) : <span className="font-semibold text-brand">{item.count}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
