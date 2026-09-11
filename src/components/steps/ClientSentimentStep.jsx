import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '../common/ProgressBar'
import { SENTIMENT_STYLES } from '../../utils/formatters'
import { useWorkflowSession } from '../../context/WorkflowSessionContext'

export default function ClientSentimentStep({ client }) {
  const navigate = useNavigate()
  const { event } = client
  const session = useWorkflowSession(client.id)

  const [draftText, setDraftText] = useState(session.interactionText)
  const [analysing, setAnalysing] = useState(false)
  const [orchestrating, setOrchestrating] = useState(false)
  const [actionError, setActionError] = useState(null)

  const runAnalysis = async () => {
    setActionError(null)
    setAnalysing(true)
    try {
      await session.analyseSentiment(draftText)
    } catch (err) {
      setActionError(err.message ?? 'Sentiment analysis failed.')
    } finally {
      setAnalysing(false)
    }
  }

  const autoSelectProducts = async () => {
    setActionError(null)
    try {
      await session.autoSelectProducts()
    } catch (err) {
      setActionError(err.message ?? 'Auto-select failed.')
    }
  }

  const confirmAndOrchestrate = async () => {
    setActionError(null)
    setOrchestrating(true)
    try {
      await session.orchestrate()
      navigate(`/client/${client.id}/step/workflow-orchestration`)
    } catch (err) {
      setActionError(err.message ?? 'Could not trigger workflow orchestration.')
    } finally {
      setOrchestrating(false)
    }
  }

  const styles = session.interactionResult ? SENTIMENT_STYLES[session.interactionResult.sentiment] : null

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-hairline bg-white p-5">
        <h4 className="mb-2 font-semibold text-brand">Ingest interaction for sentiment analysis</h4>
        <p className="mb-3 text-xs text-ink-muted">
          Paste advisor notes, call transcripts, or upload an interaction file to enrich the sentiment model.
        </p>
        <textarea
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          placeholder="Example: Client sounded excited about the upcoming wedding and asked about joint accounts..."
          className="min-h-[80px] w-full resize-y rounded-lg border border-hairline bg-canvas p-3 text-sm text-brand placeholder:text-ink-muted/50 focus:outline-none focus:ring-1 focus:ring-brand"
        />
        <div className="mt-3 flex items-center gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-hairline bg-canvas px-3 py-2 text-sm font-medium text-brand transition-colors hover:bg-white">
            <input type="file" accept=".txt,.pdf,.docx,.eml,.csv" className="hidden" />
            Choose file
          </label>
          <button
            onClick={runAnalysis}
            disabled={!draftText.trim() || analysing}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              !draftText.trim() || analysing
                ? 'cursor-not-allowed bg-slate-200 text-slate-500'
                : 'bg-accent text-black hover:opacity-90'
            }`}
          >
            {analysing ? 'Analysing…' : 'Analyse Sentiment'}
          </button>
        </div>
        {actionError && <p className="mt-3 text-xs font-medium text-red-600">{actionError}</p>}
      </div>

      {session.interactionResult && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-hairline bg-white p-5">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-ink-muted">
              Overall Sentiment (from interaction)
            </p>
            <p className="font-semibold text-brand">{session.interactionResult.sentiment}</p>
          </div>
          <div className="rounded-xl border border-hairline bg-white p-5">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-ink-muted">Sentiment Score</p>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <ProgressBar value={session.interactionResult.score} />
              </div>
              <span className="text-sm font-semibold text-brand">{session.interactionResult.score}</span>
            </div>
          </div>
        </div>
      )}

      {session.interactionResult && (
        <div className={`rounded-xl border p-5 ${styles.panel}`}>
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-brand">Sentiment-Driven Recommendation Adjustment</h4>
            <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${styles.badge}`}>
              {session.interactionResult.sentiment}
            </span>
          </div>
          <p className="mb-4 text-xs text-ink-muted">{session.guidance}</p>
          <button
            onClick={autoSelectProducts}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
          >
            Auto-select products based on sentiment
          </button>
        </div>
      )}

      <div className="rounded-xl border border-hairline bg-white p-5">
        <h4 className="mb-3 font-semibold text-brand">Products the client is interested in</h4>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {event.recommendations.map((rec) => (
            <label
              key={rec.title}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                session.selectedProducts.includes(rec.title)
                  ? 'border-accent bg-accent/5'
                  : 'border-hairline hover:bg-slate-50'
              }`}
            >
              <input
                type="checkbox"
                className="mt-0.5"
                checked={session.selectedProducts.includes(rec.title)}
                onChange={() => session.toggleProduct(rec.title)}
              />
              <div>
                <p className="text-sm font-medium text-brand">{rec.title}</p>
                <p className="text-xs text-ink-muted">{rec.rationale}</p>
              </div>
            </label>
          ))}
        </div>
        <button
          onClick={confirmAndOrchestrate}
          disabled={session.selectedProducts.length === 0 || orchestrating}
          className={`mt-4 w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors sm:w-auto ${
            session.selectedProducts.length === 0 || orchestrating
              ? 'cursor-not-allowed bg-slate-200 text-slate-500'
              : 'bg-accent text-black hover:opacity-90'
          }`}
        >
          {orchestrating ? 'Triggering…' : 'Confirm selection & trigger workflow orchestration'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-hairline p-5">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-ink-muted">Selected Products</p>
          {session.selectedProducts.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {session.selectedProducts.map((title) => (
                <span key={title} className="rounded-full border border-accent/20 bg-accent/10 px-2 py-1 text-xs text-black">
                  {title}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-muted">No products selected yet.</p>
          )}
        </div>
        <div className="rounded-xl border border-hairline p-5">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-ink-muted">Primary Intent</p>
          <p className="truncate text-sm font-semibold text-brand">{event.sentiment?.primaryIntent ?? '—'}</p>
        </div>
      </div>
    </div>
  )
}
