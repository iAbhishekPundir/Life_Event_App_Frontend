import { Activity, Briefcase, MessageSquare, ShieldCheck, Lightbulb, CheckCircle2 } from 'lucide-react'
import { useWorkflowSteps } from '../context/WorkflowStepsContext'
import AboutStepBox from '../components/about/AboutStepBox'

const ROLES = [
  {
    icon: MessageSquare,
    title: 'Relationship Managers & Financial Advisors',
    description: 'Review detected life events, supporting signals, and recommended next actions.',
  },
  {
    icon: Briefcase,
    title: 'Operations Teams',
    description: 'Manage downstream workflow tasks, notifications, and servicing actions.',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance Teams',
    description: 'Risk and compliance checks are handled as part of workflow orchestration tasks.',
  },
]

const SCENARIOS = [
  'Review why a customer was flagged for a likely life event.',
  'Generate tailored product recommendations from the detected event and client profile.',
  'Prepare talking points and opportunities for the advisor conversation.',
  'Move from approved insight to operational follow-up without leaving the workflow.',
]

export default function AboutPage() {
  const { steps } = useWorkflowSteps()

  return (
    <div className="animate-fade-in-up space-y-10">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">About</p>
        <h2 className="mb-3 font-serif text-4xl text-brand">Life Event Workflow</h2>
        <p className="max-w-3xl text-lg leading-relaxed text-ink-muted">
          A banker-facing workflow for detecting likely life events from banking signals, validating suitability and
          compliance, generating next-best recommendations, and orchestrating advisor and operational follow-up.
        </p>
      </div>

      <div>
        <div className="mb-6 flex items-center gap-4">
          <div className="rounded-lg border border-hairline bg-white p-2.5 shadow-sm">
            <Activity className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="font-serif text-2xl text-brand">How It Works</h3>
            <p className="text-sm text-ink-muted">Five stages take a signal from detection to advisor-ready follow-up.</p>
          </div>
        </div>
        <div className="rounded-xl border border-hairline bg-surface p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-y-8 md:grid-cols-4">
            {steps.map((step, i) => (
              <AboutStepBox key={step.id} step={step} isLast={i === steps.length - 1} />
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-center gap-4">
          <div className="rounded-lg border border-hairline bg-white p-2.5 shadow-sm">
            <Briefcase className="h-5 w-5 text-accent" />
          </div>
          <h3 className="font-serif text-2xl text-brand">Roles</h3>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {ROLES.map((role) => (
            <div key={role.title} className="rounded-xl border border-hairline bg-surface p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand">
                <role.icon className="h-5 w-5 text-white" />
              </div>
              <h4 className="mb-2 font-semibold text-brand">{role.title}</h4>
              <p className="text-sm leading-relaxed text-ink-muted">{role.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-center gap-4">
          <div className="rounded-lg border border-hairline bg-white p-2.5 shadow-sm">
            <Lightbulb className="h-5 w-5 text-accent" />
          </div>
          <h3 className="font-serif text-2xl text-brand">Scenarios</h3>
        </div>
        <div className="divide-y divide-hairline rounded-xl border border-hairline bg-surface shadow-sm">
          {SCENARIOS.map((scenario, i) => (
            <div key={i} className="flex items-start gap-4 p-5">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-sm leading-relaxed text-brand">{scenario}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
