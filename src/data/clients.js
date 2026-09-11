// -----------------------------------------------------------------------
// Client + case + event data, ported from the approved Replit prototype.
// Their source split this across three separate objects (CLIENTS,
// FINDINGS, CASE_REGISTRY) keyed by id, which meant three lookups to
// render one card. Merged here into one object per client so every
// component only needs `getClientById(id)`.
//
// Shape:
// {
//   id, name, initials, age, maritalStatus, segment, portfolio, ytd, risk,
//   lastReview, accountType, accountNumber, sortCode, balance, hasSignal,
//   wealthDetails: {...}, bankingDetails: {...},
//   caseInfo: { id, opened, daysOpen, priority } | null,
//   event: { eventName, confidence, timeline, ..., recommendations: [...],
//            signals: [...], compliance: [...], sentiment: {...}, ... } | null
// }
// -----------------------------------------------------------------------

const oliver = {
  id: 'oliver',
  name: 'Oliver Bennett',
  initials: 'OB',
  age: 31,
  maritalStatus: 'Active',
  segment: 'Premier',
  portfolio: '£562,000',
  ytd: '+7.2%',
  risk: 'Balanced',
  lastReview: '3 months ago',
  accountType: 'Premier Current',
  accountNumber: '****7821',
  sortCode: '40-47-84',
  balance: '£28,450',
  hasSignal: true,
  wealthDetails: {
    income: '£98,000 / yr', netWorth: '£718,000', liquidAssets: '£90,000', investments: '£562,000',
    propertyValue: '£0', liabilities: '£14,000', advisor: 'Eric', kycStatus: 'Verified',
    productHoldings: 'Current, Savings, ISA', primaryGoal: 'Wedding & home purchase',
  },
  bankingDetails: { overdraftLimit: '£5,000', monthlyCredits: '£8,150', monthlyDebits: '£5,200' },
  caseInfo: { id: 'CASE-2025-0041', opened: '28 Jul 2025', daysOpen: 2, priority: 'High' },
  event: {
    eventName: 'Marriage', confidence: 0.82, timeline: '6-9 months', eventSource: 'Bank Account Transactions',
    customerId: '782134',
    aiSummary: "Over the past 6 weeks, Oliver's account shows a concentrated cluster of wedding-related outflows: jewellery, gown, venue, photography, travel, and honeymoon bookings. These expenses are large, discretionary, and thematically linked, with a 340% month-over-month jump in spend. The pattern strongly indicates a planned marriage within a 6-9 month horizon.",
    analytics: {
      spendingPattern: 'Wedding-related outflows account for 78% of discretionary spend over the last 30 days.',
      jumpInSpend: 'Monthly spend increased by £11,200 vs. the 90-day baseline — a 340% jump.',
      season: 'Spring wedding season (May-June); venue and travel bookings are typically made 6-9 months ahead.',
      supportingNote: 'Payments are directed to bridal, jewellery, venue, and travel merchants, forming a coherent event cluster.',
    },
    signals: [
      { category: 'Card Payment', label: 'Wedding gown — Browns Bride, London', amount: '-£1,680.00', time: '2w ago' },
      { category: 'Card Payment', label: 'Jewellery purchase — Hatton Garden Jewellers', amount: '-£2,400.00', time: '2w ago' },
      { category: 'Bank Transfer', label: 'Wedding venue booking deposit — The Orangery Estate', amount: '-£3,500.00', time: '3w ago' },
      { category: 'Bank Transfer', label: 'Honeymoon planning — Turquoise Holidays', amount: '-£2,850.00', time: '3w ago' },
      { category: 'Card Payment', label: 'Wedding photography — The Wedding Lens', amount: '-£1,250.00', time: '30d' },
      { category: 'Card Payment', label: 'Airline bookings for multiple family members — BA & Emirates', amount: '-£1,460.00', time: '1m ago' },
      { category: 'Standing Order', label: 'New joint standing order with second account holder', amount: '+£500.00 / mo', time: 'Recent' },
    ],
    recommendations: [
      { title: 'Loans', rationale: 'Smooth the peak wedding spend without draining investments or savings.', matchEvent: 96, matchCustomer: 92, justification: 'Oliver has already paid out £11,200+ in wedding deposits and purchases, causing a 340% month-on-month spend jump. A personal loan lets him spread the remaining large payments (venue balance, honeymoon, rings, transport) over a fixed term while keeping his investment portfolio and emergency buffer intact.', conversionRate: 72, avgDaysToTakeUp: 12, avgAmount: '£10,800', historicalNote: 'Marriage-predicted clients with similar spend spikes convert to a personal loan 72% of the time, typically within 12 days.' },
      { title: 'Mortgages', rationale: 'Joint mortgage pre-assessment if the couple plans to buy together after the wedding.', matchEvent: 89, matchCustomer: 86, justification: 'Marriage is one of the most common triggers for a first joint home purchase. With a Premier profile, a £24,560 current balance and a £486,000 portfolio, Oliver has strong deposit potential. A mortgage review can pre-assess affordability and lock a rate for the post-wedding timeline.', conversionRate: 38, avgDaysToTakeUp: 95, avgAmount: '£238,000', historicalNote: '38% of newly-engaged Premier clients with house-purchase intent start a mortgage enquiry within 3 months.' },
      { title: 'Travel services', rationale: 'Support honeymoon, destination wedding and family travel bookings.', matchEvent: 94, matchCustomer: 90, justification: "Oliver's account shows a £2,850 honeymoon-planning payment to Turquoise Holidays and £1,460 of airline bookings for multiple family members. Travel services can cover foreign currency, travel insurance, overseas card usage and airport lounge access for the wedding and honeymoon.", conversionRate: 85, avgDaysToTakeUp: 5, avgAmount: '£3,400', historicalNote: '85% of Marriage signals with honeymoon transactions activate travel services (currency, insurance, lounge) in the same week.' },
      { title: 'Investing', rationale: "Start a joint investment plan for the couple's post-wedding goals.", matchEvent: 82, matchCustomer: 88, justification: 'After the wedding, Oliver and his partner will share long-term goals such as a house deposit or future family fund. A ready-made investment or share-dealing account can put part of their surplus to work now and build a joint pot over time.', conversionRate: 48, avgDaysToTakeUp: 35, avgAmount: '£9,200', historicalNote: '48% of marrying Premier clients open or top up an investment account within 5 weeks.' },
    ],
    compliance: [
      { label: 'KYC Status', status: 'Pass' }, { label: 'Nominee Check', status: 'Review' },
      { label: 'Joint-Account Eligibility', status: 'Pass' }, { label: 'Regulatory Disclosures', status: 'Required' },
      { label: 'Risk-Profile Alignment', status: 'Pass' }, { label: 'Client Consent', status: 'Pending' },
    ],
    sentiment: { quote: 'Sustained wedding-related outflows alongside stable salary credits indicate planned, confident spending toward a confirmed marriage timeline.', sentiment: 'Positive', engagement: 88, primaryIntent: 'Marriage confirmed', secondaryIntents: ['Family financial planning', 'Insurance planning'] },
    opportunities: ['Joint mortgage pre-assessment', 'Personal loan for wedding expenses', 'Honeymoon and wedding travel services', 'Joint investment plan'],
    talkingPoints: [
      "Open by asking whether any major life changes are coming up that he'd like to plan for.",
      "Probe the recent transactions: 'I see payments to a wedding venue, a jeweller, and a honeymoon planner — are you planning a wedding?'",
      "Confirm the timeline and shared finances: 'These bookings are typically made 6-9 months ahead, and I see a new joint standing order — does that match your plans?'",
    ],
    recommendationTalkingPoints: [
      'If the event is confirmed, suggest a personal loan to smooth the remaining wedding spend without touching the £486,000 portfolio.',
      'Introduce a joint mortgage pre-assessment and travel services for the honeymoon and family flights.',
    ],
    behaviorAnalytics: [
      '31-year-old Premier client with a current balance of £24,560 and an investment portfolio of £486,000 (YTD +7.2%), indicating strong liquidity and asset capacity.',
      'Wedding-related outflows account for 78% of discretionary spend over the last 30 days, with a £11,200 increase vs. the 90-day baseline (340% jump).',
      'New joint standing order of +£500/mo and multi-payee wedding/honeymoon bookings form a coherent event cluster.',
      'Profile risk appetite is Balanced, so he can absorb short-term debt or investment commitments without destabilising his core portfolio.',
    ],
    riskAppetite: {
      label: 'Balanced',
      summary: 'Oliver is profiled as Balanced — comfortable with moderate growth and can tolerate short-term market movement for long-term return.',
      eventImpact: 'Marriage is a planned, discretionary event. His £24,560 current balance and £486,000 portfolio provide sufficient liquidity to absorb short-term wedding debt or investment commitments.',
      advisorNote: 'Keep core investments intact; use a personal loan or cash buffer for wedding liquidity, and reassess joint risk profile after marriage.',
    },
  },
}

const priya = {
  id: 'priya',
  name: 'Priya Sharma',
  initials: 'PS',
  age: 34,
  maritalStatus: 'Married',
  segment: 'Premier',
  portfolio: '£708,000',
  ytd: '+5.8%',
  risk: 'Growth',
  lastReview: '5 months ago',
  accountType: 'Premier Current',
  accountNumber: '****7821',
  sortCode: '20-15-96',
  balance: '£21,300',
  hasSignal: true,
  wealthDetails: {
    income: '£110,000 / yr', netWorth: '£870,000', liquidAssets: '£52,000', investments: '£708,000',
    propertyValue: '£232,000', liabilities: '£0', advisor: 'Eric', kycStatus: 'Verified',
    productHoldings: 'Current, ISA, Pension', primaryGoal: 'Family protection & education',
  },
  bankingDetails: { overdraftLimit: '£7,500', monthlyCredits: '£9,170', monthlyDebits: '£6,400' },
  caseInfo: { id: 'CASE-2025-0039', opened: '25 Jul 2025', daysOpen: 5, priority: 'High' },
  event: {
    eventName: 'New Child', confidence: 0.79, timeline: '3-5 months', eventSource: 'Bank Account Transactions',
    customerId: '782151',
    aiSummary: "Over the past 5 weeks, Priya's account shows a clear shift toward maternity and childcare spending: private clinic payments, nursery furniture, antenatal subscriptions, and a new recurring savings transfer. Discretionary travel spend has fallen 40%. The pattern is consistent with preparation for a first child within a 3-5 month window.",
    analytics: {
      spendingPattern: 'Maternity and baby-related outflows account for 65% of discretionary spend over the last 30 days.',
      jumpInSpend: 'Healthcare and childcare spend increased by £2,800 vs. the 90-day baseline — a 210% jump.',
      season: 'Spring arrival window (Mar-May); private clinic and nursery bookings typically precede birth by 3-4 months.',
      supportingNote: 'Payments span private maternity, nursery retail, and antenatal services, forming a coherent new-child cluster.',
    },
    signals: [
      { category: 'Card Payment', label: 'Nursery furniture — John Lewis Nursery', amount: '-£940.00', time: '2w ago' },
      { category: 'Bank Transfer', label: 'Private maternity clinic payment — Portland Hospital', amount: '-£1,500.00', time: '3w ago' },
      { category: 'Direct Debit', label: 'Antenatal classes subscription', amount: '-£45.00 / mo', time: '30d' },
      { category: 'Standing Order', label: 'New recurring transfer into savings account', amount: '+£400.00 / mo', time: '1m ago' },
      { category: 'Card Payment', label: 'Baby retailer purchases; travel spend down 40%', amount: '-£310.00', time: 'Recent' },
    ],
    recommendations: [
      { title: 'ISAs', rationale: 'Start a Junior ISA early for long-term education savings.', matchEvent: 96, matchCustomer: 92, justification: 'Priya is preparing for a first child. A Junior ISA begins tax-free savings early and compounds over 18+ years, aligning with education funding.', conversionRate: 68, avgDaysToTakeUp: 18, avgAmount: '£5,200', historicalNote: '68% of new-child Premier clients open a Junior ISA within 3 weeks of the event being confirmed.' },
      { title: 'Insurance', rationale: 'Close the protection gap for a growing family.', matchEvent: 94, matchCustomer: 88, justification: 'A new child increases reliance on parental income. Insurance options can replace income and cover family expenses if the unexpected happens.', conversionRate: 74, avgDaysToTakeUp: 10, avgAmount: '£38/mo', historicalNote: '74% of clients expecting a first child take up income protection or life cover within 2 weeks.' },
      { title: 'Savings accounts', rationale: 'Top up the emergency fund for new dependent costs.', matchEvent: 85, matchCustomer: 83, justification: 'New dependents raise the need for liquid cash. A savings account can hold 3-6 months of expenses, keeping the family buffer separate from investments.', conversionRate: 55, avgDaysToTakeUp: 22, avgAmount: '£8,000', historicalNote: '55% of new-parent clients top up a savings or cash ISA account within a month.' },
      { title: 'Wealth Management', rationale: 'Will and guardianship planning for the new arrival.', matchEvent: 78, matchCustomer: 80, justification: 'A first child makes guardianship and estate instructions critical. Wealth Management can advise on wills, trusts and inheritance planning.', conversionRate: 42, avgDaysToTakeUp: 45, avgAmount: 'N/A', historicalNote: '42% of Premier clients with a first child engage Wealth Management for estate/will planning within 6 weeks.' },
    ],
    compliance: [
      { label: 'KYC Status', status: 'Pass' }, { label: 'Beneficiary Check', status: 'Review' },
      { label: 'Protection Eligibility', status: 'Pass' }, { label: 'Regulatory Disclosures', status: 'Required' },
      { label: 'Risk-Profile Alignment', status: 'Pass' }, { label: 'Client Consent', status: 'Pending' },
    ],
    sentiment: { quote: 'Steady reallocation from discretionary travel to healthcare and baby-related spending, plus new savings transfers, indicates preparation for a first child.', sentiment: 'Positive', engagement: 84, primaryIntent: 'New child confirmed', secondaryIntents: ['Protection planning', 'Education savings'] },
    opportunities: ['Add beneficiary & guardian', 'Family Income Protection', 'Junior ISA'],
    talkingPoints: ['Congratulate warmly on the new arrival.', 'Discuss protection for a growing family.', 'Set up child savings early to benefit from compounding.', 'Review will & guardianship arrangements.', 'Adjust budget and emergency fund for a dependent.'],
    recommendationTalkingPoints: ['Suggest a Junior ISA to start tax-free education savings from day one.', 'Introduce income protection or life cover to close the family protection gap.'],
    behaviorAnalytics: [
      '34-year-old married Premier client with a £612,000 portfolio (YTD +5.8%) and £18,420 current balance.',
      'Maternity and childcare spend has increased by £2,800 vs. baseline (+210%); travel spend is down 40%.',
      'New £400/mo standing order into savings and antenatal subscriptions form a coherent new-child event cluster.',
      'Growth risk profile indicates capacity for long-term investment such as a Junior ISA alongside protection products.',
    ],
    riskAppetite: {
      label: 'Growth',
      summary: 'Priya is profiled as Growth — comfortable with higher volatility in pursuit of long-term returns.',
      eventImpact: 'A new child introduces income vulnerability. Short-term protection takes priority alongside continued investment growth.',
      advisorNote: 'Balance immediate protection needs with existing growth-oriented portfolio; avoid disrupting long-term investments.',
    },
  },
}

const daniel = {
  id: 'daniel',
  name: 'Daniel Okafor',
  initials: 'DO',
  age: 29,
  maritalStatus: 'Single',
  segment: 'Core',
  portfolio: '£166,000',
  ytd: '+9.1%',
  risk: 'Growth',
  lastReview: '2 months ago',
  accountType: 'Core Current',
  accountNumber: '****3356',
  sortCode: '30-94-74',
  balance: '£14,900',
  hasSignal: true,
  wealthDetails: {
    income: '£72,000 / yr', netWorth: '£208,000', liquidAssets: '£40,000', investments: '£139,000',
    propertyValue: '£0', liabilities: '£0', advisor: 'Eric', kycStatus: 'Verified',
    productHoldings: 'Current, Savings', primaryGoal: 'First home purchase',
  },
  bankingDetails: { overdraftLimit: '£2,500', monthlyCredits: '£6,000', monthlyDebits: '£4,100' },
  caseInfo: { id: 'CASE-2025-0037', opened: '22 Jul 2025', daysOpen: 8, priority: 'Medium' },
  event: {
    eventName: 'Home Purchase', confidence: 0.86, timeline: '2-4 months', eventSource: 'Bank Account Transactions',
    customerId: '782168',
    aiSummary: "Over the past 4 weeks, Daniel's account shows a concentrated cluster of property purchase activity: recurring deposit transfers, a RICS survey fee, an estate agent holding deposit, a mortgage arrangement fee, and a removals booking. With a 29-year-old Growth profile and £35,000 in liquid assets, the data strongly indicates an imminent first home purchase within 2-4 months.",
    analytics: {
      spendingPattern: 'Property transaction outflows account for 82% of non-essential spend over the last 30 days.',
      jumpInSpend: 'Deposit savings transfers increased by £2,000/mo vs. baseline — a sustained 6-month accumulation now accelerating.',
      season: 'Spring completions are common; estate agent activity and survey fees precede exchange by 6-10 weeks.',
      supportingNote: 'Payments span survey, mortgage, estate agent and removals merchants — all hallmarks of an active purchase.',
    },
    signals: [
      { category: 'Bank Transfer', label: 'Recurring transfers into deposit savings', amount: '+£2,000.00 / mo', time: '2w ago' },
      { category: 'Card Payment', label: 'Property survey fee — RICS Chartered Surveyors', amount: '-£600.00', time: '1w ago' },
      { category: 'Bank Transfer', label: 'Estate agent holding deposit', amount: '-£1,000.00', time: '3w ago' },
      { category: 'Card Payment', label: 'Mortgage application & arrangement fee', amount: '-£999.00', time: '2w ago' },
      { category: 'Card Payment', label: 'Removals company booking deposit', amount: '-£150.00', time: 'Recent' },
    ],
    recommendations: [
      { title: 'Mortgages', rationale: 'Pre-approval and rate-lock for the imminent purchase.', matchEvent: 98, matchCustomer: 94, justification: 'Daniel is already paying estate-agent deposits, survey fees and mortgage arrangement fees. A mortgage pre-approval locks a rate and formalises the borrowing before exchange.', conversionRate: 89, avgDaysToTakeUp: 7, avgAmount: '£198,000', historicalNote: '89% of Core clients at survey and deposit stage convert to a formal mortgage within 10 days.' },
      { title: 'Home Insurance', rationale: 'Required buildings and contents protection for the new property.', matchEvent: 95, matchCustomer: 89, justification: 'The new home needs buildings and contents cover. Home Insurance can be arranged before completion, satisfying lender and protection needs.', conversionRate: 82, avgDaysToTakeUp: 14, avgAmount: '£420/yr', historicalNote: '82% of first-time buyers arrange buildings & contents cover within 2 weeks of exchange.' },
      { title: 'Insurance', rationale: 'Cover the new mortgage liability.', matchEvent: 88, matchCustomer: 84, justification: "A large mortgage creates a long-term liability. Life insurance can cover the outstanding debt if Daniel's income were lost.", conversionRate: 61, avgDaysToTakeUp: 21, avgAmount: '£28/mo', historicalNote: '61% of first-time mortgage holders take up life or mortgage protection cover within a month.' },
      { title: 'Savings accounts', rationale: 'Overpayment-ready buffer for moving and repair costs.', matchEvent: 76, matchCustomer: 81, justification: 'He has been saving aggressively for the deposit. Keeping a cash reserve in a savings account after purchase protects against unexpected moving, repair and furnishing costs.', conversionRate: 47, avgDaysToTakeUp: 30, avgAmount: '£6,500', historicalNote: '47% of new home buyers open or top up a savings account within 30 days of completion.' },
    ],
    compliance: [
      { label: 'KYC Status', status: 'Pass' }, { label: 'Affordability Assessment', status: 'Pass' },
      { label: 'Mortgage Eligibility', status: 'Review' }, { label: 'Regulatory Disclosures', status: 'Required' },
      { label: 'Risk-Profile Alignment', status: 'Pass' }, { label: 'Client Consent', status: 'Obtained' },
    ],
    sentiment: { quote: 'Aggressive deposit accumulation combined with survey, mortgage and estate agent payments indicates an imminent home purchase.', sentiment: 'Positive', engagement: 91, primaryIntent: 'Home purchase confirmed', secondaryIntents: ['Protection planning', 'Rate-lock urgency'] },
    opportunities: ['Mortgage pre-approval', 'Home & contents insurance', 'Mortgage protection'],
    talkingPoints: ['Congratulate on the new home.', 'Walk through mortgage options and rate lock.', 'Arrange life / mortgage protection cover.', 'Set up buildings & contents insurance.', 'Plan an overpayment strategy for flexibility.'],
    recommendationTalkingPoints: ['Confirm the property and timeline, then move quickly to lock a mortgage rate before exchange.', 'Bundle home insurance and life cover to simplify protection and meet lender requirements.'],
    behaviorAnalytics: [
      '29-year-old single Core client with a £143,000 investment portfolio (YTD +9.1%) and £12,850 current balance.',
      'Property-related outflows account for 82% of non-essential spend; deposit savings transfers have been £2,000/mo for 6 months.',
      'Survey, mortgage arrangement, estate agent and removals payments form a coherent active-purchase cluster.',
      'Growth risk profile with no liabilities indicates strong capacity to service a first mortgage without disrupting investment goals.',
    ],
    riskAppetite: {
      label: 'Growth',
      summary: 'Daniel is profiled as Growth — focused on building wealth through higher-return investments over the long term.',
      eventImpact: 'A first mortgage introduces a significant long-term liability. Prioritise rate lock and protection before revisiting investment growth.',
      advisorNote: 'Ensure mortgage affordability is stress-tested; keep investment contributions steady alongside mortgage repayments.',
    },
  },
}

const margaret = {
  id: 'margaret',
  name: 'Margaret Coleman',
  initials: 'MC',
  age: 58,
  maritalStatus: 'Married',
  segment: 'Private',
  portfolio: '£2.78M',
  ytd: '+4.3%',
  risk: 'Conservative',
  lastReview: '1 month ago',
  accountType: 'Private Current',
  accountNumber: '****1902',
  sortCode: '50-22-11',
  balance: '£99,900',
  hasSignal: true,
  wealthDetails: {
    income: '£139,000 / yr', netWorth: '£3.7M', liquidAssets: '£174,000', investments: '£2.78M',
    propertyValue: '£927,000', liabilities: '£0', advisor: 'Eric', kycStatus: 'Verified',
    productHoldings: 'Current, Pension, ISA, Investment', primaryGoal: 'Retirement income & estate planning',
  },
  bankingDetails: { overdraftLimit: '£25,000', monthlyCredits: '£11,580', monthlyDebits: '£7,200' },
  caseInfo: { id: 'CASE-2025-0033', opened: '18 Jul 2025', daysOpen: 12, priority: 'High' },
  event: {
    eventName: 'Approaching Retirement', confidence: 0.77, timeline: '12-18 months', eventSource: 'Bank Account Transactions',
    customerId: '782190',
    aiSummary: "Over the past 6 weeks, Margaret's account shows a deliberate transition into retirement: a £10,000 AVC pension top-up, final mortgage redemption, increased savings transfers, a significant leisure booking, and a 31% reduction in salary credits consistent with phased working hours. The pattern strongly indicates a planned retirement within 12-18 months.",
    analytics: {
      spendingPattern: 'Pension contributions and savings transfers account for 74% of net outflows over the last 30 days.',
      jumpInSpend: 'Savings and pension contributions increased by £11,200 vs. the 90-day baseline as income begins to wind down.',
      season: 'Year-end tax planning (Q1) drives final AVC contributions; phased retirement often begins in spring.',
      supportingNote: 'Salary reduction, mortgage redemption, pension top-ups and leisure spend form a coherent pre-retirement transition cluster.',
    },
    signals: [
      { category: 'Bank Transfer', label: 'Lump-sum AVC pension contribution', amount: '-£10,000.00', time: '1m ago' },
      { category: 'Bank Transfer', label: 'Final mortgage redemption payment', amount: '-£8,400.00', time: '30d' },
      { category: 'Card Payment', label: 'Extended cruise booking — travel & leisure', amount: '-£4,300.00', time: '2w ago' },
      { category: 'Standing Order', label: 'Increased transfer into premium savings', amount: '+£1,200.00 / mo', time: '1w ago' },
      { category: 'Salary Credit', label: 'Salary credit reduced from £4,100 — consistent with phased hours', amount: '+£2,850.00 / mo', time: 'Recent' },
    ],
    recommendations: [
      { title: 'Pensions', rationale: 'Drawdown review to optimise income sequencing at retirement.', matchEvent: 97, matchCustomer: 95, justification: 'Margaret is making final pension top-ups and her salary has reduced, indicating a transition into retirement. A pension review can sequence income efficiently across tax bands.', conversionRate: 81, avgDaysToTakeUp: 20, avgAmount: 'N/A', historicalNote: '81% of Private clients within 18 months of retirement engage in a formal pension drawdown review.' },
      { title: 'Wealth Management', rationale: 'Estate and inheritance planning for wealth transfer.', matchEvent: 92, matchCustomer: 87, justification: 'With a £2.4M portfolio, wealth transfer is becoming a priority. Wealth Management can advise on inheritance tax, gifts and trust structures.', conversionRate: 69, avgDaysToTakeUp: 35, avgAmount: 'N/A', historicalNote: '69% of Private Banking clients approaching retirement initiate estate planning conversations within 5 weeks.' },
      { title: 'Investing', rationale: 'Tax-efficient income structuring across ISA and general accounts.', matchEvent: 86, matchCustomer: 81, justification: 'A private-banking client nearing retirement needs tax-efficient income. Investing services can allocate assets to reduce tax drag on withdrawals.', conversionRate: 58, avgDaysToTakeUp: 42, avgAmount: '£85,000', historicalNote: '58% of retiring Private clients restructure their investment portfolio for income drawdown within 6 weeks.' },
      { title: 'ISAs', rationale: 'Tax-free income pot to supplement pension withdrawals.', matchEvent: 80, matchCustomer: 84, justification: 'ISAs provide tax-free income in retirement and can supplement pension withdrawals without pushing Margaret into a higher tax bracket.', conversionRate: 52, avgDaysToTakeUp: 28, avgAmount: '£20,000', historicalNote: '52% of retiring clients top up their ISA allowance in the final year before retirement.' },
    ],
    compliance: [
      { label: 'KYC Status', status: 'Pass' }, { label: 'Pension Eligibility', status: 'Pass' },
      { label: 'Suitability Assessment', status: 'Review' }, { label: 'Regulatory Disclosures', status: 'Required' },
      { label: 'Risk-Profile Alignment', status: 'Review' }, { label: 'Client Consent', status: 'Obtained' },
    ],
    sentiment: { quote: 'Late-stage pension top-ups, final mortgage redemption and reduced salary credits indicate a deliberate transition into retirement.', sentiment: 'Positive', engagement: 82, primaryIntent: 'Retirement intent', secondaryIntents: ['Estate planning', 'Income structuring'] },
    opportunities: ['Estate & inheritance planning', 'Drawdown strategy', 'Tax-efficient income'],
    talkingPoints: ['Discuss retirement timeline and lifestyle goals.', 'Review the pension pot and income options.', 'Explore drawdown versus annuity trade-offs.', 'Plan estate and inheritance arrangements.', 'Structure a tax-efficient retirement income.'],
    recommendationTalkingPoints: ['Open the pension drawdown conversation: confirm her target retirement date and preferred income level.', 'Introduce Wealth Management for estate planning — with a £2.4M portfolio, inheritance tax structuring is time-sensitive.'],
    behaviorAnalytics: [
      '58-year-old married Private Banking client with a £2.4M portfolio (YTD +4.3%) and £86,300 current balance.',
      'Salary credits have fallen 31% to £2,850/mo, consistent with phased working hours ahead of full retirement.',
      '£10,000 AVC pension top-up and final mortgage redemption of £8,400 signal deliberate pre-retirement consolidation.',
      'Conservative risk profile is appropriate given the 12-18 month retirement horizon; income stability takes priority over growth.',
    ],
    riskAppetite: {
      label: 'Conservative',
      summary: 'Margaret is profiled as Conservative — capital preservation and stable income are the primary objectives.',
      eventImpact: 'Approaching retirement accelerates the shift from accumulation to decumulation. Income sequencing and tax efficiency are now the key concerns.',
      advisorNote: 'Prioritise drawdown planning and estate structuring; avoid repositioning the core portfolio in the 12 months before retirement.',
    },
  },
}

const thomas = {
  id: 'thomas',
  name: 'Thomas Reid',
  initials: 'TR',
  age: 45,
  maritalStatus: 'Married',
  segment: 'Premier',
  portfolio: '£1.03M',
  ytd: '+6.0%',
  risk: 'Balanced',
  lastReview: '6 weeks ago',
  accountType: 'Premier Current',
  accountNumber: '****4421',
  sortCode: '60-00-04',
  balance: '£37,200',
  hasSignal: false,
  wealthDetails: {
    income: '£127,000 / yr', netWorth: '£1.27M', liquidAssets: '£104,000', investments: '£927,000',
    propertyValue: '£347,000', liabilities: '£104,000', advisor: 'Eric', kycStatus: 'Verified',
    productHoldings: 'Current, ISA, Pension', primaryGoal: 'Wealth preservation',
  },
  bankingDetails: { overdraftLimit: '£10,000', monthlyCredits: '£10,580', monthlyDebits: '£7,900' },
  caseInfo: null,
  event: null,
}

const aisha = {
  id: 'aisha',
  name: 'Aisha Khan',
  initials: 'AK',
  age: 52,
  maritalStatus: 'Divorced',
  segment: 'Private',
  portfolio: '£3.59M',
  ytd: '+3.9%',
  risk: 'Conservative',
  lastReview: '2 weeks ago',
  accountType: 'Private Current',
  accountNumber: '****8817',
  sortCode: '11-55-83',
  balance: '£107,200',
  hasSignal: false,
  wealthDetails: {
    income: '£208,000 / yr', netWorth: '£4.86M', liquidAssets: '£255,000', investments: '£3.59M',
    propertyValue: '£1.16M', liabilities: '£0', advisor: 'Eric', kycStatus: 'Verified',
    productHoldings: 'Current, ISA, Investment, Pension', primaryGoal: 'Wealth transfer & philanthropy',
  },
  bankingDetails: { overdraftLimit: '£30,000', monthlyCredits: '£17,330', monthlyDebits: '£9,100' },
  caseInfo: null,
  event: null,
}

export const CLIENTS = [oliver, priya, daniel, margaret, thomas, aisha]

export const getClientById = (id) => CLIENTS.find((c) => c.id === id)

// Clients with an open/in-progress case, in registry order -- used for the
// "Active Cases" grid on the home dashboard.
export const CASE_CLIENTS = CLIENTS.filter((c) => c.caseInfo !== null)
