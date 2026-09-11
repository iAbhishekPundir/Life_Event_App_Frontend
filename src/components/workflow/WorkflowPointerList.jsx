import { useWorkflowSteps } from '../../context/WorkflowStepsContext'
import WorkflowPointerItem from './WorkflowPointerItem'

export default function WorkflowPointerList({ clientId }) {
  const { steps } = useWorkflowSteps()

  return (
    <aside className="w-full shrink-0 lg:w-[300px]">
      <div className="rounded-2xl border border-hairline bg-surface p-5 shadow-sm">
        <h2 className="mb-1 font-serif text-xl text-brand">Workflow pointers</h2>
        <p className="mb-5 text-xs text-ink-muted">Select a step to view its inputs and outputs.</p>
        <div className="space-y-2.5">
          {steps.map((step) => (
            <WorkflowPointerItem key={step.id} clientId={clientId} step={step} />
          ))}
        </div>
      </div>
    </aside>
  )
}
