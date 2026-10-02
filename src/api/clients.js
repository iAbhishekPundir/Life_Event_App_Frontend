/**
 * Backend API client.
 *
 * The backend serves the workflow as separate endpoints (detection,
 * recommendations, advisor brief, sentiment, tasks) because that's how the
 * agent pipeline actually runs. The existing UI components were built
 * against a single merged `client.event` object.
 *
 * `fetchClientWorkflow` bridges that: it calls the endpoints and assembles
 * the exact shape the components already consume, so no presentational
 * component needed changing during integration.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

class ApiError extends Error {
  constructor(message, status, detail) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.detail = detail
  }
}

async function request(path, options = {}) {
  let response
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch (networkError) {
    // fetch only rejects on network-level failure (server down, CORS, DNS)
    throw new ApiError(
      `Cannot reach the backend at ${BASE_URL}. Is it running?`,
      0,
      networkError.message,
    )
  }

  if (!response.ok) {
    let detail = response.statusText
    try {
      const body = await response.json()
      detail = body.detail ?? detail
    } catch {
      /* response wasn't JSON — keep the status text */
    }
    throw new ApiError(detail, response.status, detail)
  }

  if (response.status === 204) return null
  return response.json()
}

const get = (path) => request(path)
const post = (path, body) =>
  request(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined })
const patch = (path, body) =>
  request(path, { method: 'PATCH', body: JSON.stringify(body) })

/**
 * Returns null for 404/409 instead of throwing.
 * Used for pipeline steps that legitimately haven't run yet — e.g. asking
 * for recommendations before detection has produced an event returns 409,
 * which means "not ready", not "something broke".
 */
async function optional(promise, fallback = null) {
  try {
    return await promise
  } catch (error) {
    if (error instanceof ApiError && (error.status === 404 || error.status === 409)) {
      return fallback
    }
    throw error
  }
}

// ---------------------------------------------------------------------------
// Clients
// ---------------------------------------------------------------------------

export const fetchClients = () => get('/api/clients')

export const fetchClient = (clientId) => get(`/api/clients/${clientId}`)

// ---------------------------------------------------------------------------
// Workflow — assembles the `event` shape the UI components expect
// ---------------------------------------------------------------------------

/**
 * Loads everything known about a client's workflow.
 * Returns { event, caseInfo, sentiment } — `event` is null when no life
 * event was detected, which the UI renders as the "Portfolio Stable" state.
 */
export async function fetchClientWorkflow(clientId) {
  const detection = await get(`/api/clients/${clientId}/detection`)

  if (!detection?.detected) {
    return { event: null, caseInfo: null, sentiment: null }
  }

  const baseEvent = {
    eventName: detection.eventName,
    confidence: detection.confidence, // already a 0–1 fraction
    timeline: detection.timeline,
    aiSummary: detection.aiSummary,
    eventSource: detection.eventSource,
    customerId: detection.customerId,
    analytics: detection.analytics,
    detectionMethod: detection.detectionMethod,

    // backend calls these keyDrivers; components read `signals`
    signals: detection.keyDrivers ?? [],

    // Lets the UI tell "detected but below the actionable threshold" apart
    // from a fully-loaded event — recommendations/talkingPoints/riskAppetite
    // are empty/null below, by design, whenever this is false.
    actionable: detection.actionable,
  }

  // Recommendations/advisor-brief/orchestrate all require an *actionable*
  // event (backend returns 409 otherwise) — a detected-but-below-threshold
  // signal like this one would just fail all three calls, so skip them.
  if (!detection.actionable) {
    const sentiment = await optional(get(`/api/clients/${clientId}/sentiment`))
    return {
      caseInfo: detection.case,
      sentimentRaw: sentiment,
      tasks: [],
      event: {
        ...baseEvent,
        recommendations: [],
        behaviorAnalytics: [],
        talkingPoints: [],
        recommendationTalkingPoints: [],
        opportunities: [],
        riskAppetite: null,
        eventConfirmed: false,
        sentiment: sentiment
          ? {
              sentiment: sentiment.sentiment,
              engagement: sentiment.score,
              primaryIntent: sentiment.primaryIntent,
              secondaryIntents: sentiment.secondaryIntents ?? [],
              quote: sentiment.guidance,
            }
          : null,
      },
    }
  }

  // These run in parallel; each returns null/[] if its step hasn't run yet.
  const [recommendations, brief, sentiment, tasks] = await Promise.all([
    optional(get(`/api/clients/${clientId}/recommendations`), []),
    optional(get(`/api/clients/${clientId}/advisor-brief`)),
    optional(get(`/api/clients/${clientId}/sentiment`)),
    optional(get(`/api/clients/${clientId}/orchestrate`), []),
  ])

  return {
    caseInfo: detection.case,
    sentimentRaw: sentiment,
    tasks: tasks ?? [],
    event: {
      ...baseEvent,

      recommendations: recommendations ?? [],

      // advisor brief
      behaviorAnalytics: brief?.behaviorAnalytics ?? [],
      talkingPoints: brief?.talkingPoints ?? [],
      recommendationTalkingPoints: brief?.recommendationTalkingPoints ?? [],
      opportunities: brief?.opportunities ?? [],
      riskAppetite: brief?.riskAppetite ?? null,
      eventConfirmed: brief?.eventConfirmed ?? false,

      // sentiment (component reads event.sentiment.primaryIntent)
      sentiment: sentiment
        ? {
            sentiment: sentiment.sentiment,
            engagement: sentiment.score,
            primaryIntent: sentiment.primaryIntent,
            secondaryIntents: sentiment.secondaryIntents ?? [],
            quote: sentiment.guidance,
          }
        : null,
    },
  }
}

// ---------------------------------------------------------------------------
// Agent actions
// ---------------------------------------------------------------------------

export const runDetection = (clientId) => post(`/api/clients/${clientId}/detect`)

export const generateRecommendations = (clientId) =>
  post(`/api/clients/${clientId}/recommendations`)

export const generateAdvisorBrief = (clientId) =>
  post(`/api/clients/${clientId}/advisor-brief`)

export const confirmEvent = (clientId) => post(`/api/clients/${clientId}/confirm-event`)

export const analyseSentiment = (clientId, interactionText) =>
  post(`/api/clients/${clientId}/sentiment`, { interactionText })

export const autoSelectProducts = (clientId) =>
  post(`/api/clients/${clientId}/sentiment/auto-select`)

export const updateSelectedProducts = (clientId, selectedProducts) =>
  patch(`/api/clients/${clientId}/sentiment/products`, { selectedProducts })

export const runOrchestration = (clientId) => post(`/api/clients/${clientId}/orchestrate`)

export const updateCaseStatus = (clientId, status) =>
  patch(`/api/clients/${clientId}/case-status`, { status })

export { ApiError, BASE_URL }

/** Workflow step definitions -> array of steps. */
export async function fetchWorkflowSteps() {
  return get('/api/workflow-steps')
}