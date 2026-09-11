import { getProviderById } from '../../data/configureData'

const SIZE_CLASSES = { sm: 'h-7 w-7 text-[10px]', lg: 'h-10 w-10 text-sm' }

export default function BankBadge({ bankId, size = 'sm' }) {
  const provider = getProviderById(bankId)
  if (!provider) return null
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-lg border font-bold shadow-sm ${SIZE_CLASSES[size]}`}
      style={{ background: provider.bg, color: provider.color, borderColor: `${provider.color}40` }}
    >
      {provider.abbr}
    </div>
  )
}
