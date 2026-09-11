import { NavLink } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { ArrowRight } from 'lucide-react'

export default function WorkflowPointerItem({ clientId, step }) {
  const Icon = Icons[step.icon]

  return (
    <NavLink
      to={`/client/${clientId}/step/${step.id}`}
      className={({ isActive }) =>
        `group flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
          isActive
            ? 'border-brand bg-brand text-white shadow-md'
            : 'border-hairline bg-white hover:border-accent/50 hover:shadow-sm'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
              isActive ? 'border-white/20 bg-white/10 text-white' : 'border-hairline bg-canvas text-ink-muted'
            }`}
          >
            {Icon && <Icon className="h-4 w-4" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className={`text-[13px] font-bold leading-tight ${isActive ? 'text-white' : 'text-brand'}`}>
                0{step.stepNumber}. {step.title}
              </p>
              <ArrowRight
                className={`h-3.5 w-3.5 shrink-0 ${
                  isActive ? 'text-white' : 'text-slate-300 transition-colors group-hover:text-accent'
                }`}
              />
            </div>
            <p className={`mt-1 text-xs leading-snug ${isActive ? 'text-white/70' : 'text-ink-muted'}`}>
              {step.role}
            </p>
            <p className={`mt-1.5 text-[11px] font-semibold ${isActive ? 'text-white' : 'text-brand/70'}`}>
              {step.tag}
            </p>
          </div>
        </>
      )}
    </NavLink>
  )
}
