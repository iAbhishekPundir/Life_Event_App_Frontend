export const PRODUCT_CONVERSIONS = [
  { product: 'Insurance', count: 18, value: '£684/mo' },
  { product: 'Mortgages', count: 12, value: '£2.86M' },
  { product: 'Travel', count: 11, value: '£37.4K' },
  { product: 'ISAs', count: 9, value: '£156K' },
  { product: 'Loans', count: 7, value: '£75.6K' },
  { product: 'Investing', count: 5, value: '£46K' },
]

export const SIGNALS_30D = [
  { event: 'Home Purchase', count: 4 },
  { event: 'Marriage', count: 3 },
  { event: 'New Child', count: 2 },
  { event: 'Retirement', count: 1 },
]

export const LOST_OPPS = [
  { client: 'S. Thompson', event: 'Home Purchase', product: 'Mortgages', reason: 'Not interested', date: '14d ago', value: '£245K' },
  { client: 'R. Patel', event: 'Marriage', product: 'Loans', reason: 'Not interested', date: '18d ago', value: '£12K' },
  { client: 'J. Williams', event: 'New Child', product: 'Insurance', reason: 'Existing coverage', date: '22d ago', value: '£45/mo' },
  { client: 'A. Foster', event: 'Retirement', product: 'Pensions', reason: 'Third-party', date: '28d ago', value: 'N/A' },
]

// 30 daily signal-volume readings for the "Last 30 Days" sparkline.
export const SIGNAL_TREND = [
  3, 5, 2, 8, 4, 6, 3, 7, 5, 9, 4, 6, 8, 5, 7, 4, 9, 6, 3, 8, 5, 7, 4, 6, 8, 5, 4, 7, 6, 10,
]

export const DASHBOARD_DATE_LABEL = '30 Jul 2025'
export const ADVISOR_NAME = 'Eric'

// These two are demo figures, not computed from LOST_OPPS/case data --
// the underlying values use mixed units (£K, £/mo, N/A) that don't sum
// meaningfully, and no case has been converted yet to derive a real
// average days-to-close from.
export const LOST_VALUE_LABEL = '£257K'
export const AVG_DAYS_TO_CLOSE_LABEL = '14d'
