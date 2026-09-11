import { useState } from 'react'
import { ChevronRight, CheckCheck, XCircle, Send, Clock, Shield, Plus } from 'lucide-react'
import { OPEN_BANKING_PROVIDERS, OPEN_BANKING_SCOPES, getProviderById } from '../../data/configureData'
import { CLIENTS } from '../../data/clients'
import IconAvatar from '../common/IconAvatar'
import BankBadge from './BankBadge'
import { useExternalConnections } from '../../context/ExternalConnectionsContext'

const CONSENT_METHODS = [
  { id: 'app', label: 'In-app notification', desc: "Push notification to client's mobile banking app" },
  { id: 'email', label: 'Email', desc: 'Consent link sent to registered email address' },
  { id: 'sms', label: 'SMS', desc: 'Text message to registered mobile number' },
]

const FLOW_STEPS = [
  { n: 1, label: 'Select Bank' },
  { n: 2, label: 'Select Client' },
  { n: 3, label: 'Request Consent' },
  { n: 4, label: 'Consent Sent' },
]

export default function AddBankWizard({ onClose }) {
  const { addConnection } = useExternalConnections()
  const [step, setStep] = useState(1)
  const [bankId, setBankId] = useState('')
  const [clientId, setClientId] = useState('')
  const [method, setMethod] = useState('app')
  const [scopes, setScopes] = useState(OPEN_BANKING_SCOPES.map((s) => s.id))

  const bank = getProviderById(bankId)
  const client = CLIENTS.find((c) => c.id === clientId)

  const resetForAnother = () => {
    setStep(1)
    setBankId('')
    setClientId('')
    setScopes(OPEN_BANKING_SCOPES.map((s) => s.id))
  }

  const sendConsentRequest = () => {
    if (bank && client) {
      addConnection({
        id: `ext-${Date.now()}`,
        bankId,
        bankName: bank.name,
        clientId,
        clientName: client.name,
        status: 'pending',
        scopes: [],
        consentDate: null,
        expiry: null,
        lastSync: null,
        recordsIngested: 0,
        signalsGenerated: 0,
      })
    }
    setStep(4)
  }

  const methodLabel =
    method === 'app' ? 'their mobile banking app' : method === 'email' ? 'their registered email' : 'their registered mobile number'

  return (
    <div className="mb-6 overflow-hidden rounded-2xl border-2 border-accent/30 bg-white shadow-lg">
      {/* Progress header */}
      <div className="flex items-center justify-between bg-brand px-6 py-4">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {FLOW_STEPS.map(({ n, label }) => (
            <div key={n} className="flex items-center gap-2">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-bold ${
                  step >= n ? 'border-accent bg-accent text-black' : 'border-white/40 text-white/50'
                }`}
              >
                {step > n ? <CheckCheck className="h-3.5 w-3.5" /> : n}
              </div>
              <span className={`text-xs font-medium ${step >= n ? 'text-white' : 'text-white/50'}`}>{label}</span>
              {n < 4 && <ChevronRight className="h-3.5 w-3.5 text-white/30" />}
            </div>
          ))}
        </div>
        <button onClick={onClose} className="text-white/60 transition-colors hover:text-white">
          <XCircle className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6">
        {/* Step 1: select bank */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h4 className="mb-1 font-semibold text-brand">Select an Open Banking accredited provider</h4>
              <p className="text-xs text-ink-muted">
                All listed providers are accredited under the UK Open Banking Implementation Entity (OBIE) and FCA-regulated.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {OPEN_BANKING_PROVIDERS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setBankId(p.id)}
                  className={`flex flex-col items-center gap-2.5 rounded-xl border-2 p-4 transition-all ${
                    bankId === p.id ? 'border-accent bg-accent/5 shadow-md' : 'border-hairline bg-white hover:border-accent/40 hover:shadow-sm'
                  }`}
                >
                  <BankBadge bankId={p.id} size="lg" />
                  <span className="text-center text-xs font-semibold leading-tight text-brand">{p.name}</span>
                  {p.accredited && <span className="text-[9px] font-bold uppercase tracking-wide text-emerald-600">OBIE Accredited</span>}
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                disabled={!bankId}
                onClick={() => setStep(2)}
                className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                  bankId ? 'bg-brand text-white shadow-sm hover:opacity-90' : 'cursor-not-allowed bg-slate-100 text-slate-400'
                }`}
              >
                Next — Select Client <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: select client, consent method, scopes */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="mb-2 flex items-center gap-3">
              <BankBadge bankId={bankId} size="lg" />
              <div>
                <h4 className="font-semibold text-brand">{bank?.name} — Link a Client Account</h4>
                <p className="text-xs text-ink-muted">Select the client whose external account at this bank will be linked.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink-muted">Client</label>
                <div className="space-y-2">
                  {CLIENTS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setClientId(c.id)}
                      className={`flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition-all ${
                        clientId === c.id ? 'border-accent bg-accent/5' : 'border-hairline bg-white hover:border-accent/30'
                      }`}
                    >
                      <IconAvatar initials={c.initials} size="sm" />
                      <div>
                        <p className="text-sm font-semibold text-brand">{c.name}</p>
                        <p className="text-[10px] text-ink-muted">
                          {c.segment} · {c.portfolio}
                        </p>
                      </div>
                      {clientId === c.id && <CheckCheck className="ml-auto h-4 w-4 text-accent" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink-muted">Consent Method</label>
                  <div className="space-y-2">
                    {CONSENT_METHODS.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setMethod(m.id)}
                        className={`flex w-full items-start gap-3 rounded-xl border-2 p-3 text-left transition-all ${
                          method === m.id ? 'border-accent bg-accent/5' : 'border-hairline bg-white hover:border-accent/30'
                        }`}
                      >
                        <div
                          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                            method === m.id ? 'border-accent bg-accent' : 'border-slate-300'
                          }`}
                        >
                          {method === m.id && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-brand">{m.label}</p>
                          <p className="text-[10px] text-ink-muted">{m.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink-muted">Data Scopes to Request</label>
                  <div className="space-y-2">
                    {OPEN_BANKING_SCOPES.map((sc) => (
                      <label
                        key={sc.id}
                        className="flex cursor-pointer items-start gap-3 rounded-xl border border-hairline bg-white p-3 transition-colors hover:bg-slate-50/50"
                      >
                        <input
                          type="checkbox"
                          checked={scopes.includes(sc.id)}
                          onChange={(e) =>
                            setScopes((prev) => (e.target.checked ? [...prev, sc.id] : prev.filter((id) => id !== sc.id)))
                          }
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-brand"
                        />
                        <div>
                          <p className="text-xs font-semibold text-brand">{sc.label}</p>
                          <p className="text-[10px] text-ink-muted">{sc.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-brand">
                <ChevronRight className="h-4 w-4 rotate-180" /> Back
              </button>
              <button
                disabled={!clientId || scopes.length === 0}
                onClick={() => setStep(3)}
                className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                  clientId && scopes.length > 0 ? 'bg-brand text-white shadow-sm hover:opacity-90' : 'cursor-not-allowed bg-slate-100 text-slate-400'
                }`}
              >
                Review & Send Consent <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: review */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h4 className="mb-1 font-semibold text-brand">Review & Send Consent Request</h4>
              <p className="text-xs text-ink-muted">
                The following request will be sent to the client. They must approve it via {methodLabel} before data access is granted.
              </p>
            </div>

            <div className="space-y-4 rounded-xl border border-hairline bg-canvas p-5">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-ink-muted">Bank</p>
                  <div className="flex items-center gap-2">
                    <BankBadge bankId={bankId} />
                    <span className="font-semibold text-brand">{bank?.name}</span>
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-ink-muted">Client</p>
                  <div className="flex items-center gap-2">
                    <IconAvatar initials={client?.initials} size="sm" />
                    <span className="font-semibold text-brand">{client?.name}</span>
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-ink-muted">Delivery Method</p>
                  <span className="font-semibold capitalize text-brand">
                    {method === 'app' ? 'In-app notification' : method}
                  </span>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-ink-muted">Consent Duration</p>
                  <span className="font-semibold text-brand">90 days (renewable)</span>
                </div>
              </div>

              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                  Data Scopes Requested ({scopes.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {scopes.map((id) => (
                    <span key={id} className="rounded-full border border-hairline bg-white px-2 py-1 text-[10px] font-medium text-brand">
                      {OPEN_BANKING_SCOPES.find((s) => s.id === id)?.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <p className="text-xs text-amber-700">
                  Under UK Open Banking (PSD2), the client may approve or decline each requested scope individually. Data access is
                  read-only and cannot be used to initiate payments.
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button onClick={() => setStep(2)} className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-brand">
                <ChevronRight className="h-4 w-4 rotate-180" /> Back
              </button>
              <button
                onClick={sendConsentRequest}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-black shadow-sm transition-all hover:opacity-90"
              >
                <Send className="h-4 w-4" />
                Send Consent Request
              </button>
            </div>
          </div>
        )}

        {/* Step 4: confirmation */}
        {step === 4 && (
          <div className="space-y-4 py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-200 bg-emerald-50 shadow-sm">
              <Send className="h-7 w-7 text-emerald-600" />
            </div>
            <h4 className="font-serif text-2xl text-brand">Consent Request Sent</h4>
            <p className="mx-auto max-w-md text-sm text-ink-muted">
              A consent request for <strong className="text-brand">{bank?.name}</strong> account access has been sent to{' '}
              <strong className="text-brand">{client?.name}</strong> via {methodLabel}. Once approved, Meridian will begin ingesting
              transaction data automatically.
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-ink-muted">
              <Clock className="h-3.5 w-3.5" />
              <span>Consent requests typically expire after 72 hours if not actioned.</span>
            </div>
            <div className="flex justify-center gap-3 pt-4">
              <button
                onClick={resetForAnother}
                className="inline-flex items-center gap-2 rounded-lg border border-hairline bg-white px-4 py-2.5 text-sm font-medium text-brand transition-all hover:bg-canvas"
              >
                <Plus className="h-4 w-4" />
                Connect another account
              </button>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90"
              >
                <CheckCheck className="h-4 w-4" />
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
