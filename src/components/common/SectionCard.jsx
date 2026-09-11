import * as Icons from 'lucide-react'

export default function SectionCard({ icon, title, subtitle, children, className = '', bodyClassName = '' }) {
  const Icon = icon ? Icons[icon] : null
  return (
    <div className={`rounded-xl border border-hairline bg-surface p-6 shadow-sm ${className}`}>
      {(title || icon) && (
        <div className="mb-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-brand">
            {Icon && <Icon className="h-5 w-5 text-accent" strokeWidth={2} />}
            {title}
          </h3>
          {subtitle && <p className="mt-1 text-xs text-ink-muted">{subtitle}</p>}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  )
}
