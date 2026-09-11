import { Sparkles } from 'lucide-react'

export default function AiSummaryBanner({ text }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-brand p-6 text-white">
      <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 -translate-y-1/2 translate-x-1/4 rounded-full bg-accent opacity-10 blur-3xl" />
      <div className="relative z-10">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-white" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-white">AI Summary</p>
        </div>
        <p className="font-serif text-xl leading-relaxed">{text}</p>
      </div>
    </div>
  )
}
