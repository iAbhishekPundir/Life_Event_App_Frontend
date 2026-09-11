import { useParams, Navigate } from 'react-router-dom'
import { useClientWorkflow } from '../context/ClientsContext'
import ClientHeader from '../components/workflow/ClientHeader'
import WorkflowPointerList from '../components/workflow/WorkflowPointerList'
import LifeEventHero from '../components/workflow/LifeEventHero'
import KeyDriversList from '../components/workflow/KeyDriversList'
import RecommendationsList from '../components/workflow/RecommendationsList'
import ConversionIntelligence from '../components/workflow/ConversionIntelligence'
import PortfolioStableCard from '../components/workflow/PortfolioStableCard'

export default function ClientOverviewPage() {
  const { clientId } = useParams()
  const { client, clientsLoading, loading, error } = useClientWorkflow(clientId)

  if (!client) {
    if (clientsLoading) return <p className="text-sm text-ink-muted">Loading client…</p>
    return <Navigate to="/" replace />
  }

  return (
    <div className="mx-auto max-w-7xl animate-fade-in-up">
      <ClientHeader client={client} showHomeLink />

      <div className="flex flex-col items-start gap-8 lg:flex-row">
        <WorkflowPointerList clientId={client.id} />

        <div className="min-w-0 flex-1">
          {loading && !client.event ? (
            <p className="text-sm text-ink-muted">Loading workflow…</p>
          ) : error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
              Could not load this client's workflow: {error.message}
            </div>
          ) : client.event ? (
            <div className="space-y-6 pb-12">
              <LifeEventHero event={client.event} />

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <KeyDriversList signals={client.event.signals} />
                </div>
                <div className="space-y-6 lg:col-span-2">
                  <RecommendationsList recommendations={client.event.recommendations} />
                  <ConversionIntelligence
                    recommendations={client.event.recommendations}
                    eventName={client.event.eventName}
                  />
                </div>
              </div>
            </div>
          ) : (
            <PortfolioStableCard />
          )}
        </div>
      </div>
    </div>
  )
}
