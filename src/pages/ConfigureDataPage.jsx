import { useState } from 'react'
import { ShieldCheck, Database, Shield, Globe, Plus } from 'lucide-react'
import PrimaryDataSourceCard from '../components/configure/PrimaryDataSourceCard'
import AddBankWizard from '../components/configure/AddBankWizard'
import ExternalConnectionsList from '../components/configure/ExternalConnectionsList'
import ConsentTab from '../components/configure/ConsentTab'
import FeedsTab from '../components/configure/FeedsTab'
import { useExternalConnections } from '../context/ExternalConnectionsContext'

const TABS = [
  { id: 'sources', label: 'Data Sources', icon: Database },
  { id: 'consent', label: 'Customer Consent', icon: Shield },
  { id: 'feeds', label: 'Open Banking Feeds', icon: Globe },
]

export default function ConfigureDataPage() {
  const [tab, setTab] = useState('sources')
  const [wizardOpen, setWizardOpen] = useState(false)
  const { connections } = useExternalConnections()
  const hasExpired = connections.some((c) => c.status === 'expired')

  return (
    <div className="animate-fade-in-up space-y-8 pb-16">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">Settings</p>
          <h2 className="mb-1 font-serif text-4xl text-brand">Configure Data</h2>
          <p className="max-w-2xl text-base text-ink-muted">
            Connect and manage data sources that feed Meridian's life-event signal detection engine. External bank account data is
            accessed under UK Open Banking (PSD2) with explicit customer consent.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 text-xs text-ink-muted">
          <ShieldCheck className="h-4 w-4 text-accent" />
          <span>FCA-regulated · PSD2 compliant</span>
        </div>
      </div>

      <div className="flex w-fit gap-1 rounded-xl border border-hairline bg-surface p-1 shadow-sm">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              tab === id ? 'bg-brand text-white shadow-sm' : 'text-ink-muted hover:bg-white hover:text-brand'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
            {id === 'consent' && hasExpired && tab !== 'consent' && <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />}
          </button>
        ))}
      </div>

      {tab === 'sources' && (
        <div className="space-y-8">
          <PrimaryDataSourceCard />
          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">External Account Connections</p>
              {!wizardOpen && (
                <button
                  onClick={() => setWizardOpen(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:opacity-90"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Connect External Account
                </button>
              )}
            </div>
            {wizardOpen && <AddBankWizard onClose={() => setWizardOpen(false)} />}
            <ExternalConnectionsList />
          </div>
        </div>
      )}

      {tab === 'consent' && <ConsentTab />}
      {tab === 'feeds' && <FeedsTab />}
    </div>
  )
}
