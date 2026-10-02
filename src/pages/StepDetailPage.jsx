import { useParams, Navigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useClientWorkflow } from '../context/ClientsContext'
import { useWorkflowSteps } from '../context/WorkflowStepsContext'
import ClientHeader from '../components/workflow/ClientHeader'
import WorkflowPointerList from '../components/workflow/WorkflowPointerList'
import StepBreadcrumb from '../components/steps/StepBreadcrumb'
import StepHeading from '../components/steps/StepHeading'
import EventDetectionStep from '../components/steps/EventDetectionStep'
import RecommendationsStep from '../components/steps/RecommendationsStep'
import AdvisorInsightsStep from '../components/steps/AdvisorInsightsStep'
import ClientSentimentStep from '../components/steps/ClientSentimentStep'
import WorkflowOrchestrationStep from '../components/steps/WorkflowOrchestrationStep'

const STEP_COMPONENTS = {
  'event-detection': EventDetectionStep,
  'personalised-recommendations': RecommendationsStep,
  'advisor-insights': AdvisorInsightsStep,
  'client-sentiment': ClientSentimentStep,
  'workflow-orchestration': WorkflowOrchestrationStep,
}

export default function StepDetailPage() {
  const { clientId, stepId } = useParams()
  const { client, clientsLoading, loading, error } = useClientWorkflow(clientId)
  const { getStepById, getNoSignalSummary, loading: stepsLoading } = useWorkflowSteps()

  if (stepsLoading) return <p className="text-sm text-ink-muted">Loading workflow…</p>

  const step = getStepById(stepId)

  if (!step) return <Navigate to="/" replace />

  if (!client) {
    if (clientsLoading) return <p className="text-sm text-ink-muted">Loading client…</p>
    return <Navigate to="/" replace />
  }

  const StepContent = STEP_COMPONENTS[step.id]

  // Event Detection renders even for a weak/non-actionable signal (that's
  // the point — the advisor can see it was picked up). The other four
  // steps depend on recommendations/advisor-brief/orchestrate, which the
  // backend never populates for a non-actionable event (they 409), so they
  // fall back to the same "nothing to do" empty state as a fully-absent
  // event instead of rendering with missing data.
  const needsActionableEvent = step.id !== 'event-detection'
  const noActionableSignal = !client.event || (needsActionableEvent && !client.event.actionable)

  return (
    <div className="mx-auto max-w-7xl animate-fade-in-up">
      <ClientHeader client={client} />

      <div className="flex flex-col items-start gap-8 lg:flex-row">
        <WorkflowPointerList clientId={client.id} />

        <div className="min-w-0 flex-1">
          <StepBreadcrumb clientId={client.id} stepTitle={step.title} />
          <StepHeading step={step} />

          <div className="rounded-2xl border border-hairline bg-surface p-8 shadow-sm">
            {loading && !client.event ? (
              <p className="py-8 text-center text-sm text-ink-muted">Loading workflow…</p>
            ) : error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
                Could not load this client's workflow: {error.message}
              </div>
            ) : noActionableSignal ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                </div>
                <p className="text-lg font-medium text-brand">{getNoSignalSummary(step.id)}</p>
                <p className="mt-2 text-ink-muted">No further action needed for this phase.</p>
              </div>
            ) : (
              <StepContent client={client} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
