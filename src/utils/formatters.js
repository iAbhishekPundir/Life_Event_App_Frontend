// Status -> Tailwind class lookups, kept centralized so the whole app's
// status colour language changes from one place.

export const CASE_STATUS_STYLES = {
  Open: 'bg-amber-50 text-amber-700',
  'In Progress': 'bg-blue-50 text-blue-700',
  Converted: 'bg-emerald-50 text-emerald-700',
  Lost: 'bg-red-50 text-red-700',
}

export const CASE_STATUS_STYLES_BORDERED = {
  Open: 'bg-amber-50 text-amber-700 border-amber-200',
  'In Progress': 'bg-blue-50 text-blue-700 border-blue-200',
  Converted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Lost: 'bg-red-50 text-red-700 border-red-200',
}

export const PRIORITY_STYLES = {
  High: 'bg-rose-50 text-rose-700',
  Medium: 'bg-slate-100 text-slate-600',
  Low: 'bg-slate-100 text-slate-600',
}

export const TASK_STATUS_STYLES = {
  Created: 'text-blue-700 bg-blue-50',
  Scheduled: 'text-blue-700 bg-blue-50',
  Pending: 'text-slate-600 bg-slate-100',
  'Yet to start': 'text-slate-600 bg-slate-100',
  'Action Required': 'text-amber-800 bg-amber-100',
}

export const CONNECTION_STATUS_STYLES = {
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  expired: 'bg-red-50 text-red-700 border-red-200',
}

export const SENTIMENT_STYLES = {
  Positive: { badge: 'bg-emerald-100 text-emerald-700 border-emerald-300', panel: 'bg-emerald-50 border-emerald-200' },
  Negative: { badge: 'bg-amber-100 text-amber-700 border-amber-300', panel: 'bg-amber-50 border-amber-200' },
  Neutral: { badge: 'bg-blue-100 text-blue-700 border-blue-300', panel: 'bg-blue-50 border-blue-200' },
}

// Parses portfolio strings like "£562,000" or "£2.78M" into a plain number.
// Note: the source prototype computed this by stripping all non-digit
// characters (including the decimal point) before parsing, which silently
// turned "£2.78M" into 278,000 instead of 2,780,000 -- a 10x undercount on
// every client whose portfolio is expressed in millions. Fixed here.
export function parsePortfolioValue(str) {
  if (!str) return 0
  const cleaned = str.replace(/[£,]/g, '')
  if (cleaned.toUpperCase().endsWith('M')) {
    return parseFloat(cleaned) * 1_000_000
  }
  return parseInt(cleaned, 10) || 0
}

export function formatAum(amount) {
  if (amount >= 1_000_000) {
    return `£${(amount / 1_000_000).toFixed(1)}M`
  }
  return `£${amount.toLocaleString('en-GB')}`
}

export function conversionBarColor(rate) {
  if (rate >= 70) return '#11b67a' // accent
  if (rate >= 50) return '#006a4c' // brand
  return '#94a3b8' // slate-400
}
