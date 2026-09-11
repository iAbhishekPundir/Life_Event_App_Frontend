const SIZE_CLASSES = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-16 w-16 text-2xl',
}

export default function IconAvatar({ initials, size = 'md', className = '' }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full border border-hairline bg-brand font-serif font-semibold text-white shadow-sm ${SIZE_CLASSES[size]} ${className}`}
    >
      {initials}
    </div>
  )
}
