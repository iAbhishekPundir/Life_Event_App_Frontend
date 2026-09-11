import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Home, Info, Database, ChevronDown } from 'lucide-react'
import { INITIAL_EXTERNAL_CONNECTIONS } from '../../data/configureData'
import { ADVISOR_NAME } from '../../data/dashboardData'
import { useClients } from '../../context/ClientsContext'
import IconAvatar from '../common/IconAvatar'

const navLinkClasses = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive
      ? 'border-brand bg-brand text-white shadow-sm'
      : 'border-hairline bg-canvas text-brand hover:bg-white hover:shadow-sm'
  }`

export default function Sidebar() {
  const navigate = useNavigate()
  const { clientId } = useParams()
  const { clients, getClientById } = useClients()
  const activeClient = clientId ? getClientById(clientId) : null
  const hasExpiredConnection = INITIAL_EXTERNAL_CONNECTIONS.some((c) => c.status === 'expired')

  return (
    <aside className="flex h-screen w-[280px] shrink-0 flex-col border-r border-hairline bg-surface">
      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-8">
        {/* Logo */}
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-brand shadow-sm">
            <span className="font-serif text-xl font-bold leading-none text-white">L</span>
          </div>
          <div>
            <h1 className="font-serif text-[17px] font-semibold leading-tight tracking-wide text-brand">
              Life Event
            </h1>
            <p className="mt-1 text-[10px] uppercase leading-none tracking-widest text-ink-muted">Workflow</p>
          </div>
        </div>

        {/* Primary nav */}
        <nav className="mb-8 space-y-2.5">
          <NavLink to="/" className={navLinkClasses} end>
            <Home className="h-4 w-4" />
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClasses}>
            <Info className="h-4 w-4" />
            About
          </NavLink>
          <NavLink to="/configure-data" className={navLinkClasses}>
            <Database className="h-4 w-4" />
            Configure Data
            {hasExpiredConnection && <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-rose-500" />}
          </NavLink>
        </nav>

        {/* Client select */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Client Select</label>
          <div className="relative">
            <select
              value={clientId ?? ''}
              onChange={(e) => e.target.value && navigate(`/client/${e.target.value}`)}
              className="w-full appearance-none rounded-lg border border-hairline bg-canvas px-3 py-3 text-sm text-brand shadow-sm focus:ring-1 focus:ring-brand"
            >
              <option value="" disabled>
                Select a client...
              </option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.portfolio}
                  {c.hasSignal ? ' •' : ''}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          </div>
        </div>

        {/* Profile + banking mini-panels */}
        {activeClient && (
          <div className="mt-8 animate-fade-in-up border-t border-hairline pt-8">
            <div className="mb-5 flex items-center gap-4">
              <IconAvatar initials={activeClient.initials} size="md" />
              <div>
                <p className="text-sm font-medium text-brand">{activeClient.name}</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="rounded-full bg-canvas px-2 py-0.5 text-[10px] font-semibold uppercase text-ink-muted">
                    {activeClient.segment}
                  </span>
                  <span className="text-[10px] text-ink-muted">
                    • {activeClient.age} yrs • {activeClient.maritalStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-4 space-y-3 rounded-lg border border-hairline bg-canvas p-4 text-xs">
              <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Profile</p>
              <div className="flex justify-between">
                <span className="font-medium text-ink-muted">Risk Profile</span>
                <span className="rounded-full border border-hairline bg-white px-2 py-0.5 text-[10px] font-semibold text-brand">
                  {activeClient.risk}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-ink-muted">KYC Status</span>
                <span className="font-medium text-brand">{activeClient.wealthDetails.kycStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-ink-muted">Advisor</span>
                <span className="font-medium text-brand">{activeClient.wealthDetails.advisor}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-ink-muted">Last Review</span>
                <span className="font-medium text-brand">{activeClient.lastReview}</span>
              </div>
            </div>

            <div className="space-y-3 rounded-lg border border-hairline bg-canvas p-4 text-xs">
              <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Banking Details</p>
              <div className="flex justify-between">
                <span className="font-medium text-ink-muted">Account Type</span>
                <span className="font-medium text-brand">{activeClient.accountType}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-ink-muted">Account No.</span>
                <span className="font-mono font-medium text-brand">{activeClient.accountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-ink-muted">Sort Code</span>
                <span className="font-mono font-medium text-brand">{activeClient.sortCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-ink-muted">Current Balance</span>
                <span className="font-semibold text-brand">{activeClient.balance}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-ink-muted">Overdraft Limit</span>
                <span className="font-medium text-brand">{activeClient.bankingDetails.overdraftLimit}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-ink-muted">Monthly Credits</span>
                <span className="font-medium text-emerald-600">{activeClient.bankingDetails.monthlyCredits}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-ink-muted">Monthly Debits</span>
                <span className="font-medium text-rose-500">{activeClient.bankingDetails.monthlyDebits}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="shrink-0 font-medium text-ink-muted">Product Holdings</span>
                <span className="text-right font-medium text-brand">{activeClient.wealthDetails.productHoldings}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pinned advisor footer */}
      <div className="shrink-0 border-t border-hairline px-6 py-4">
        <div className="flex items-center gap-3 text-sm font-medium text-brand">
          <IconAvatar initials={ADVISOR_NAME[0]} size="sm" />
          <div>
            <p className="leading-tight">{ADVISOR_NAME}</p>
            <p className="mt-0.5 text-[10px] uppercase leading-none tracking-widest text-ink-muted">
              Relationship Manager
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
