const LABELS = { active: 'Active', pending: 'Consent Pending', expired: 'Expired' }

export default function ConnectionStatusPill({ status }) {
  const styleMap = {
    active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    expired: 'bg-red-50 text-red-700 border-red-200',
  }
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${styleMap[status] ?? 'bg-slate-100 text-slate-500'}`}>
      {LABELS[status] ?? 'Unknown'}
    </span>
  )
}
