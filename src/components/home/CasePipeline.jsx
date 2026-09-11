import { Clock } from 'lucide-react'

const STAGES = [
  { key: 'Open', label: 'Open', tone: 'text-amber-700 bg-amber-50' },
  { key: 'In Progress', label: 'In Progress', tone: 'text-blue-700 bg-blue-50' },
  { key: 'Converted', label: 'Converted', tone: 'text-emerald-700 bg-emerald-50' },
  { key: 'Lost', label: 'Lost', tone: 'text-red-700 bg-red-50' },
]

export default function CasePipeline({ counts }) {
  return (
    <div className="rounded-xl border border-hairline bg-surface p-6 shadow-sm">
      <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold text-brand">
        <Clock className="h-4 w-4 text-accent" />
        Case Pipeline
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {STAGES.map((stage) => (
          <div key={stage.key} className={`rounded-lg p-4 text-center ${stage.tone}`}>
            <p className="font-serif text-2xl font-semibold">{counts[stage.key] ?? 0}</p>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider">{stage.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
