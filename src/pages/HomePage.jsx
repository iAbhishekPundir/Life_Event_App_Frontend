import { Sparkles, Users, FileText, TrendingUp, TrendingDown, CalendarClock, BarChart2 } from 'lucide-react'
import {
  PRODUCT_CONVERSIONS,
  SIGNALS_30D,
  LOST_OPPS,
  DASHBOARD_DATE_LABEL,
  ADVISOR_NAME,
  LOST_VALUE_LABEL,
  AVG_DAYS_TO_CLOSE_LABEL,
} from '../data/dashboardData'
import { parsePortfolioValue, formatAum } from '../utils/formatters'
import { useCaseStatus } from '../context/CaseStatusContext'
import { useClients } from '../context/ClientsContext'

import StatCard from '../components/home/StatCard'
import SignalVolumeChart from '../components/home/SignalVolumeChart'
import HorizontalBarList from '../components/home/HorizontalBarList'
import CasePipeline from '../components/home/CasePipeline'
import LostOpportunitiesTable from '../components/home/LostOpportunitiesTable'
import ActiveCaseCard from '../components/home/ActiveCaseCard'

export default function HomePage() {
  const { counts } = useCaseStatus()
  const { clients: CLIENTS, loading, error, reload } = useClients()

  const totalAum = CLIENTS.reduce((sum, c) => sum + parsePortfolioValue(c.portfolio), 0)
  const signalsCount = CLIENTS.filter((c) => c.hasSignal).length
  const activeCasesCount = counts.Open + counts['In Progress']
  const totalConversions = PRODUCT_CONVERSIONS.reduce((sum, p) => sum + p.count, 0)
  const totalSignals = SIGNALS_30D.reduce((sum, s) => sum + s.count, 0)

  if (loading && CLIENTS.length === 0) {
    return <p className="text-sm text-ink-muted">Loading clients…</p>
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        <p className="font-semibold">Could not load clients.</p>
        <p className="mt-1">{error.message}</p>
        <button onClick={reload} className="mt-3 rounded-lg bg-brand px-3 py-1.5 text-xs font-medium text-white">
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-4xl text-brand">Good morning, {ADVISOR_NAME}.</h1>
          <p className="mt-1 text-ink-muted">Here is the live overview of your book of business.</p>
        </div>
        <span className="text-sm text-ink-muted">{DASHBOARD_DATE_LABEL}</span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard icon="Users" label="Total AUM" value={formatAum(totalAum)} sublabel={`${CLIENTS.length} clients`} />
        <StatCard icon="FileText" label="Active Cases" value={activeCasesCount} sublabel={`${signalsCount} with signals`} />
        <StatCard icon="Sparkles" label="New Signals (30d)" value={totalSignals} sublabel={`${SIGNALS_30D.length} event types`} tone="amber" />
        <StatCard icon="TrendingUp" label="Conversions (30d)" value={totalConversions} sublabel={`${PRODUCT_CONVERSIONS.length} products`} tone="emerald" />
        <StatCard icon="TrendingDown" label="Lost Opps (30d)" value={LOST_OPPS.length} sublabel={`${LOST_VALUE_LABEL} missed`} tone="rose" />
        <StatCard icon="CalendarClock" label="Avg. Days to Close" value={AVG_DAYS_TO_CLOSE_LABEL} sublabel="avg. to onboard" tone="blue" />
      </div>

      <SignalVolumeChart />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <HorizontalBarList
          icon={TrendingUp}
          title="Recent Conversions — Products (30d)"
          total={totalConversions}
          totalLabel="total"
          items={PRODUCT_CONVERSIONS.map((p) => ({ label: p.product, count: p.count, value: p.value }))}
          renderTrailing={(item) => (
            <>
              <span className="font-semibold text-brand">{item.count}</span>
              <span className="text-ink-muted">{item.value}</span>
            </>
          )}
        />
        <div className="space-y-6">
          <HorizontalBarList
            icon={BarChart2}
            title="New Signals by Event Type (30d)"
            items={SIGNALS_30D.map((s) => ({ label: s.event, count: s.count }))}
          />
          <CasePipeline counts={counts} />
        </div>
      </div>

      <LostOpportunitiesTable items={LOST_OPPS} />

      {/* Active Cases */}
      <div>
        <div className="mb-4 flex items-start gap-2.5">
          <Sparkles className="mt-0.5 h-5 w-5 text-accent" />
          <div>
            <h2 className="font-serif text-2xl text-brand">Active Cases</h2>
            <p className="text-sm text-ink-muted">
              Life events detected from bank transactions. Click a card to open the workflow.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {CLIENTS.map((client) => (
            <ActiveCaseCard key={client.id} client={client} />
          ))}
        </div>
      </div>
    </div>
  )
}
