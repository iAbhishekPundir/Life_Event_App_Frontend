import { CheckCircle2 } from 'lucide-react'
import DotList from '../common/DotList'
import Pill from '../common/Pill'
import { useWorkflowSession } from '../../context/WorkflowSessionContext'

export default function AdvisorInsightsStep({ client }) {
  const { event } = client
  const session = useWorkflowSession(client.id)

  const confirmationPoints = event.talkingPoints
  const recommendationPoints =
    event.recommendationTalkingPoints ??
    event.recommendations.slice(0, 2).map((rec) => `If confirmed, suggest ${rec.title}: ${rec.rationale}`)
  const displayedPoints = session.eventConfirmed ? recommendationPoints : confirmationPoints

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <h4 className="mb-3 font-semibold text-brand">Behaviour Analytics</h4>
          <DotList items={event.behaviorAnalytics} />
        </div>
        <div>
          <h4 className="mb-1 font-semibold text-brand">Talking Points</h4>
          <p className="mb-3 text-xs text-ink-muted">
            {session.eventConfirmed
              ? 'Product suggestions once the event is confirmed'
              : 'Use these to confirm the event before recommending products'}
          </p>
          <DotList items={displayedPoints} />
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-brand">Customer Risk Appetite</h4>
          <div className="space-y-3 rounded-xl border border-hairline bg-slate-50/50 p-4">
            <Pill className="bg-accent text-black">{event.riskAppetite.label}</Pill>
            <p className="text-sm leading-relaxed text-ink-muted">{event.riskAppetite.summary}</p>
            <p className="text-sm leading-relaxed text-ink-muted">{event.riskAppetite.eventImpact}</p>
            <p className="text-sm font-medium leading-relaxed text-brand">{event.riskAppetite.advisorNote}</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-3 font-semibold text-brand">Opportunities</h4>
        <div className="flex flex-wrap gap-2">
          {event.opportunities.map((opp, i) => (
            <Pill key={i} className="bg-canvas px-3 py-1.5 text-brand">
              {opp}
            </Pill>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-hairline bg-canvas p-4">
        <div>
          <p className="text-sm font-semibold text-brand">Event confirmation</p>
          <p className="text-xs text-ink-muted">Only confirm once the advisor has validated the event with the client.</p>
        </div>
        {!session.eventConfirmed ? (
          <button
            onClick={() => session.confirmEvent()}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Confirm Event
          </button>
        ) : (
          <div className="flex items-center gap-2 text-emerald-600">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-semibold">Event Confirmed</span>
          </div>
        )}
      </div>
    </div>
  )
}
