import * as Icons from 'lucide-react'
import { ArrowRight } from 'lucide-react'

export default function AboutStepBox({ step, isLast }) {
  const Icon = Icons[step.icon]
  return (
    <div className="relative flex flex-col items-center px-3 text-center">
      {!isLast && (
        <div className="absolute left-[calc(50%+28px)] right-[calc(-50%+28px)] top-5 hidden h-px bg-hairline md:block">
          <ArrowRight className="absolute -right-1 -top-[7px] h-3.5 w-3.5 text-accent" />
        </div>
      )}
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand shadow-sm">
        {Icon && <Icon className="h-5 w-5 text-white" />}
      </div>
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-accent">Step 0{step.stepNumber}</p>
      <p className="mb-1.5 text-sm font-semibold leading-snug text-brand">{step.title}</p>
      <p className="text-[11px] leading-snug text-ink-muted">{step.tag}</p>
    </div>
  )
}
