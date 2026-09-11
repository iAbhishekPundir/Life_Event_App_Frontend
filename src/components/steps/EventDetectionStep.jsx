import CaseIdStrip from './CaseIdStrip'
import AiSummaryBanner from './AiSummaryBanner'
import CustomerDetailsPanel from './CustomerDetailsPanel'
import InsightMiniCards from './InsightMiniCards'
import TransactionsTable from './TransactionsTable'

export default function EventDetectionStep({ client }) {
  const { event } = client
  return (
    <div className="space-y-8">
      <CaseIdStrip clientId={client.id} caseInfo={client.caseInfo} />
      <AiSummaryBanner text={event.aiSummary} />
      <div className="space-y-6">
        <CustomerDetailsPanel client={client} event={event} />
        <InsightMiniCards analytics={event.analytics} />
      </div>
      <TransactionsTable signals={event.signals} eventName={event.eventName} />
    </div>
  )
}
