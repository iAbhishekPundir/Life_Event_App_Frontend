export default function StepHeading({ step }) {
  return (
    <div className="mb-6">
      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        <span className="rounded-full bg-brand px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
          Step 0{step.stepNumber}
        </span>
        <span className="rounded-full border border-hairline bg-white px-3.5 py-1.5 text-xs font-medium text-ink-muted">
          {step.tag}
        </span>
        <span className="rounded-full border border-hairline bg-white px-3.5 py-1.5 text-xs font-medium text-ink-muted">
          {step.agentName}
        </span>
      </div>
      <h2 className="mb-2 font-serif text-3xl text-brand">{step.title}</h2>
      <p className="text-lg text-ink-muted">{step.shortDescription}</p>
    </div>
  )
}
