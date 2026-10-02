import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react'
import { TASK_STATUS_STYLES } from '../../utils/formatters'
import { useWorkflowSession } from '../../context/WorkflowSessionContext'
import { useCaseStatus } from '../../context/CaseStatusContext'
import { groupProductsByDivision } from '../../data/productDivisions'

export default function WorkflowOrchestrationStep({ client }) {
  const session = useWorkflowSession(client.id)
  const { getStatus, setStatus } = useCaseStatus()
  const caseId = client.caseInfo?.id
  const currentStatus = client.caseInfo ? getStatus(client.id) : 'Open'
  const isClosed = currentStatus === 'Converted' || currentStatus === 'Lost'
  const tasks =
    session.tasks.length > 0
      ? session.tasks
      : [{ name: 'Await product selection', status: 'Pending' }]

  return (
    <div className="space-y-6">
      {isClosed && (
        <div
          className={`rounded-xl border p-4 ${
            currentStatus === 'Converted' ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'
          }`}
        >
          <div className="flex items-center gap-3">
            {currentStatus === 'Converted' ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
            ) : (
              <XCircle className="h-5 w-5 shrink-0 text-red-500" />
            )}
            <div>
              <p className={`text-sm font-semibold ${currentStatus === 'Converted' ? 'text-emerald-700' : 'text-red-700'}`}>
                Case {currentStatus === 'Converted' ? 'Closed — Converted' : 'Closed — Not Interested'}
              </p>
              <p className="mt-0.5 text-xs text-ink-muted">
                {caseId && <span className="font-medium">{caseId} · </span>}
                {currentStatus === 'Converted'
                  ? 'CRM hand-off triggered. Onboarding to be completed externally.'
                  : 'Client declined all recommended products. Case has been closed.'}
              </p>
            </div>
          </div>

          {currentStatus === 'Converted' && session.selectedProducts.length > 0 && (
            <div className="mt-4 space-y-2 border-t border-emerald-200 pt-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Handed off to</p>
              {groupProductsByDivision(session.selectedProducts).map(({ division, nextStep, products }) => (
                <div key={division} className="rounded-lg bg-white/70 p-3">
                  <div className="flex items-center gap-1.5">
                    <ArrowRight className="h-3 w-3 shrink-0 text-emerald-600" />
                    <span className="text-sm font-semibold text-brand">{division}</span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {products.map((title) => (
                      <span key={title} className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                        {title}
                      </span>
                    ))}
                  </div>
                  <p className="mt-1.5 text-xs text-ink-muted">{nextStep}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="rounded-xl border border-hairline bg-canvas p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs text-ink-muted">Workflow triggered from Client Sentiment</p>
          {caseId && <span className="text-[10px] font-bold uppercase tracking-widest text-ink-muted">{caseId}</span>}
        </div>
        <h4 className="mb-2 font-semibold text-brand">Selected Products</h4>
        {session.selectedProducts.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {session.selectedProducts.map((title) => (
              <span key={title} className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-xs text-black">
                {title}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink-muted">No products were selected in Client Sentiment.</p>
        )}
      </div>

      <div>
        <h4 className="mb-3 font-semibold text-brand">Orchestrated Tasks</h4>
        <div className="space-y-3">
          {tasks.map((task, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border border-hairline bg-slate-50/50 p-4">
              <span className="text-sm font-medium text-brand">{task.name}</span>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${TASK_STATUS_STYLES[task.status] ?? 'bg-slate-100 text-slate-600'}`}>
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {!isClosed && client.caseInfo && (
        <div className="flex flex-col gap-3 border-t border-hairline pt-2 sm:flex-row">
          <button
            onClick={() => setStatus(client.id, 'Converted')}
            disabled={session.selectedProducts.length === 0}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
              session.selectedProducts.length === 0
                ? 'cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-brand text-white shadow-sm hover:opacity-90'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            Close case — Onboarding confirmed
          </button>
          <button
            onClick={() => setStatus(client.id, 'Lost')}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition-all hover:bg-red-100"
          >
            <XCircle className="h-4 w-4" />
            Close case — Not interested
          </button>
        </div>
      )}
    </div>
  )
}
