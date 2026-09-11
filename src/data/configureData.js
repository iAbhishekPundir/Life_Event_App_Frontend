export const OPEN_BANKING_PROVIDERS = [
  { id: 'barclays', name: 'Barclays', abbr: 'B', color: '#00AEEF', bg: '#e8f7fe', accredited: true },
  { id: 'hsbc', name: 'HSBC', abbr: 'H', color: '#DB0011', bg: '#fde8ea', accredited: true },
  { id: 'natwest', name: 'NatWest', abbr: 'N', color: '#42145F', bg: '#f0e8f7', accredited: true },
  { id: 'santander', name: 'Santander', abbr: 'Sa', color: '#EC0000', bg: '#fde8e8', accredited: true },
  { id: 'monzo', name: 'Monzo', abbr: 'Mo', color: '#FF6B6B', bg: '#fff0f0', accredited: true },
  { id: 'starling', name: 'Starling Bank', abbr: 'St', color: '#6935D3', bg: '#f2eeff', accredited: true },
  { id: 'lloyds', name: 'Lloyds Bank', abbr: 'L', color: '#024731', bg: '#e7f5f0', accredited: true },
  { id: 'nationwide', name: 'Nationwide', abbr: 'Nw', color: '#005EB8', bg: '#e8f1fb', accredited: true },
]

export const getProviderById = (id) => OPEN_BANKING_PROVIDERS.find((p) => p.id === id)

export const OPEN_BANKING_SCOPES = [
  { id: 'accounts', label: 'Account Information', desc: 'Account details, account type, account number' },
  { id: 'transactions', label: 'Transactions', desc: 'Full credit & debit history — 90-day rolling window' },
  { id: 'balances', label: 'Balances', desc: 'Current and available balance, real-time' },
  { id: 'direct-debits', label: 'Direct Debits', desc: 'Active direct debit mandates and amounts' },
  { id: 'standing-orders', label: 'Standing Orders', desc: 'Scheduled recurring payments and payees' },
  { id: 'beneficiaries', label: 'Beneficiaries', desc: 'Registered payees and payment destinations' },
]

// status: 'active' | 'pending' | 'expired'
export const INITIAL_EXTERNAL_CONNECTIONS = [
  {
    id: 'ext-001', bankId: 'barclays', bankName: 'Barclays', clientId: 'oliver', clientName: 'Oliver Bennett',
    status: 'active', scopes: ['accounts', 'transactions', 'balances', 'direct-debits', 'standing-orders'],
    consentDate: '12 May 2025', expiry: '12 Aug 2025', lastSync: '2 min ago', recordsIngested: 847, signalsGenerated: 2,
  },
  {
    id: 'ext-002', bankId: 'monzo', bankName: 'Monzo', clientId: 'priya', clientName: 'Priya Sharma',
    status: 'pending', scopes: [], consentDate: null, expiry: null, lastSync: null, recordsIngested: 0, signalsGenerated: 0,
  },
  {
    id: 'ext-003', bankId: 'natwest', bankName: 'NatWest', clientId: 'daniel', clientName: 'Daniel Okafor',
    status: 'active', scopes: ['accounts', 'transactions', 'balances'],
    consentDate: '3 Jun 2025', expiry: '3 Sep 2025', lastSync: '18 min ago', recordsIngested: 312, signalsGenerated: 1,
  },
  {
    id: 'ext-004', bankId: 'hsbc', bankName: 'HSBC', clientId: 'margaret', clientName: 'Margaret Coleman',
    status: 'expired', scopes: ['accounts', 'transactions', 'balances', 'standing-orders'],
    consentDate: '28 Feb 2025', expiry: '28 May 2025', lastSync: '62d ago', recordsIngested: 1240, signalsGenerated: 3,
  },
]
