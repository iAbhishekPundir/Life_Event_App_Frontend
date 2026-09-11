import { Sparkles } from 'lucide-react'

export default function LifeEventHero({ event }) {
  return (
    <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl bg-brand p-8 text-white shadow-xl md:flex-row md:items-center">
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/4 rounded-full bg-accent opacity-25 blur-[100px]" />
      <div className="relative z-10">
        <div className="mb-2 flex items-center gap-3">
          <Sparkles className="h-4 w-4 text-white" />
          <p className="text-xs font-bold uppercase tracking-widest text-white">Life Event Detected</p>
        </div>
        <h3 className="font-serif text-5xl">{event.eventName}</h3>
        <p className="mt-3 text-lg text-white">
          Estimated Timeline: <span className="font-semibold">{event.timeline}</span>
        </p>
      </div>
      <div className="relative z-10 shrink-0 rounded-xl border border-white/20 bg-white/10 px-6 py-5 shadow-lg backdrop-blur-md">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-white">Confidence</p>
        <p className="font-serif text-3xl text-white">{Math.round(event.confidence * 100)}%</p>
      </div>
    </div>
  )
}
