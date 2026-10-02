/**
 * Maps a selected product/service title to the internal division or team
 * that owns its onboarding, plus a short advisor-facing note on what happens
 * next.
 *
 * Product titles aren't a fixed catalog — they're produced by the backend's
 * sentiment/auto-select agent per client and event, so wording varies
 * ("Joint Savings Account" today could be "Shared Savings Plan" tomorrow).
 * We resolve by keyword rather than exact match so new phrasing still lands
 * in the right bucket.
 *
 * Rules are checked in order, first match wins — list the most specific
 * terms first so a product never gets caught by a broader rule meant for
 * something else. Two examples that drove the ordering below:
 *   - "Goal-Based Investment Plan for House Purchase" must resolve to
 *     Wealth Management (it mentions "House"), so Mortgage is checked
 *     against "mortgage" only, never a loose "house"/"home" match.
 *   - "Pensions" and "Investing" are deliberately split into two different
 *     teams (Retirement vs. Wealth) even though both are long-horizon
 *     products, because retirement income planning and general investment
 *     advisory are run by different desks at most banks.
 */
const DIVISION_RULES = [
  {
    test: /insur|assurance/i,
    division: 'Bancassurance Team',
    nextStep: 'Policy issuance and medical screening will be coordinated directly with the underwriting carrier.',
  },
  {
    test: /mortgage/i,
    division: 'Mortgage & Home Finance Team',
    nextStep: 'Property valuation, affordability checks and rate-lock will be handled by this team.',
  },
  {
    test: /\bloan|credit card|overdraft/i,
    division: 'Consumer Lending Team',
    nextStep: 'Credit assessment and disbursement will be handled by this team.',
  },
  {
    test: /pension|retirement|annuity|drawdown/i,
    division: 'Retirement & Pensions Advisory',
    nextStep: 'Income sequencing and drawdown options will be reviewed with a retirement specialist.',
  },
  {
    test: /invest|\bisas?\b|wealth|portfolio|equity|bond|fund management/i,
    division: 'Wealth Management & Investment Advisory',
    nextStep: 'A dedicated adviser will complete risk profiling and set up the asset allocation.',
  },
  {
    test: /estate|\bwill\b|\btrust\b|inheritance|nominee|beneficiary|succession/i,
    division: 'Estate & Legacy Planning',
    nextStep: 'A private client specialist will handle documentation and legal coordination.',
  },
  {
    test: /emergency|budget|cash ?flow/i,
    division: 'Retail Financial Planning',
    nextStep: 'A consumer advisory specialist will structure the liquidity and reserve split.',
  },
  {
    test: /travel|currency|forex|concierge|lounge/i,
    division: 'Travel & Lifestyle Services',
    nextStep: 'Currency, cover and other travel-related benefits will be arranged by this team.',
  },
  {
    test: /saving|deposit|current account|checking|everyday account/i,
    division: 'Retail Banking / Deposit Operations',
    nextStep: 'Account opening and KYC documentation will be completed by the branch or digital banking team.',
  },
]

const FALLBACK = {
  division: 'Relationship Management',
  nextStep: 'Your advisor will coordinate directly with the relevant product specialists.',
}

/** Resolves a selected product title to { division, nextStep }. */
export function resolveProductDivision(productTitle) {
  const rule = DIVISION_RULES.find((r) => r.test.test(productTitle))
  return rule ? { division: rule.division, nextStep: rule.nextStep } : FALLBACK
}

/**
 * Groups selected product titles by their resolved division, so the UI can
 * show one entry per team (with all its products listed together) instead
 * of repeating the same division and next-step text for every product that
 * happens to land on the same desk.
 *
 * Returns an array of { division, nextStep, products: string[] }, in the
 * order each division was first encountered.
 */
export function groupProductsByDivision(productTitles) {
  const groups = new Map()
  for (const title of productTitles) {
    const { division, nextStep } = resolveProductDivision(title)
    if (!groups.has(division)) {
      groups.set(division, { division, nextStep, products: [] })
    }
    groups.get(division).products.push(title)
  }
  return [...groups.values()]
}
