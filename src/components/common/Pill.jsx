export default function Pill({ children, className = '', bordered = false }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold ${
        bordered ? 'border ' : ''
      }${className}`}
    >
      {children}
    </span>
  )
}
