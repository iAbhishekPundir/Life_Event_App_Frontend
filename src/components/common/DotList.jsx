export default function DotList({ items, className = '', textClassName = 'text-sm text-ink-muted' }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span className={`leading-relaxed ${textClassName}`}>{item}</span>
        </li>
      ))}
    </ul>
  )
}
