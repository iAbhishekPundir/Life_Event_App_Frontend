import SectionCard from '../common/SectionCard'
import RecommendationCard from './RecommendationCard'

export default function RecommendationsList({ recommendations, title = 'Recommended Product Offerings' }) {
  return (
    <SectionCard icon="Lightbulb" title={title}>
      <div className="space-y-3">
        {recommendations.map((rec, i) => (
          <RecommendationCard key={i} rec={rec} />
        ))}
      </div>
    </SectionCard>
  )
}
