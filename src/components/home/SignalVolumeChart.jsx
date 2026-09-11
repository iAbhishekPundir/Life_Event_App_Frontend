import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { TrendingUp } from 'lucide-react'
import { SIGNAL_TREND } from '../../data/dashboardData'

// Builds 30 daily labels ending "today" for the x-axis, showing a tick
// every 7 days (matches the "1 Jul / 8 Jul / 15 Jul / 22 Jul / 30 Jul"
// spacing in the approved design without hardcoding specific dates).
function buildChartData() {
  const today = new Date()
  return SIGNAL_TREND.map((value, i) => {
    const daysAgo = SIGNAL_TREND.length - 1 - i
    const date = new Date(today)
    date.setDate(date.getDate() - daysAgo)
    return {
      label: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      value,
    }
  })
}

export default function SignalVolumeChart() {
  const data = buildChartData()
  const total = SIGNAL_TREND.reduce((a, b) => a + b, 0)

  return (
    <div className="rounded-xl border border-hairline bg-surface p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-brand">
          <TrendingUp className="h-4 w-4 text-accent" />
          Signal Volume — Last 30 Days
        </h3>
        <span className="text-xs text-ink-muted">{total} total new signals detected</span>
      </div>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
            <defs>
              <linearGradient id="signalFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#11b67a" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#11b67a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              interval={6}
              tick={{ fontSize: 11, fill: '#6b7280' }}
            />
            <Tooltip
              contentStyle={{ borderRadius: 8, borderColor: '#e5e5e5', fontSize: 12 }}
              labelStyle={{ color: '#111827', fontWeight: 600 }}
            />
            <Area type="monotone" dataKey="value" stroke="#11b67a" strokeWidth={2} fill="url(#signalFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
