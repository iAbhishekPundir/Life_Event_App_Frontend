import RecommendationCard from '../workflow/RecommendationCard'
import HistoricalTakeUpGrid from '../workflow/HistoricalTakeUpGrid'

export default function RecommendationsStep({ client }) {
  const { event } = client
  return (
    <div className="space-y-6">
      <h4 className="mb-2 font-semibold text-brand">Recommended Products & Services</h4>
      <div className="space-y-3">
        {event.recommendations.map((rec, i) => (
          <RecommendationCard key={i} rec={rec} />
        ))}
      </div>
      <HistoricalTakeUpGrid recommendations={event.recommendations} eventName={event.eventName} />
    </div>
  )
}
