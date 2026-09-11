import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function StepBreadcrumb({ clientId, stepTitle }) {
  return (
    <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-ink-muted">
      <Link to="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-brand">
        <Home className="h-4 w-4" />
        Home
      </Link>
      <span className="text-slate-300">/</span>
      <Link to={`/client/${clientId}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-brand">
        <ArrowLeft className="h-4 w-4" />
        Briefing
      </Link>
      <span className="text-slate-300">/</span>
      <span className="text-brand">{stepTitle}</span>
    </div>
  )
}
