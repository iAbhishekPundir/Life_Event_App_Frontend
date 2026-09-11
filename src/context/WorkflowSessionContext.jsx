import { createContext, useContext, useMemo } from 'react'
import { useClients } from './ClientsContext'

const WorkflowSessionContext = createContext(null)

/**
 * Per-client workflow session (event confirmation, selected products,
 * sentiment result), backed by the API.
 *
 * Keeps the same hook shape the step components already use, but every
 * mutation now persists to the backend instead of living in React state.
 * Mutations are async; components await them.
 */
export function WorkflowSessionProvider({ children }) {
  const clientsApi = useClients()
  return (
    <WorkflowSessionContext.Provider value={clientsApi}>
      {children}
    </WorkflowSessionContext.Provider>
  )
}

export function useWorkflowSession(clientId) {
  const ctx = useContext(WorkflowSessionContext)
  if (!ctx) throw new Error('useWorkflowSession must be used within a WorkflowSessionProvider')

  const {
    workflows, confirmEvent, analyseSentiment, autoSelectProducts,
    setSelectedProducts, orchestrate,
  } = ctx

  const wf = workflows[clientId] ?? {}
  const event = wf.event ?? null
  const sentimentRaw = wf.sentimentRaw ?? null

  return useMemo(
    () => ({
      eventConfirmed: event?.eventConfirmed ?? false,
      selectedProducts: sentimentRaw?.selectedProducts ?? [],
      interactionText: sentimentRaw?.interactionText ?? '',
      interactionResult: sentimentRaw
        ? { sentiment: sentimentRaw.sentiment, score: sentimentRaw.score }
        : null,
      guidance: sentimentRaw?.guidance ?? '',
      tasks: wf.tasks ?? [],

      confirmEvent: () => confirmEvent(clientId),
      analyseSentiment: (text) => analyseSentiment(clientId, text),
      autoSelectProducts: () => autoSelectProducts(clientId),
      setSelectedProducts: (products) => setSelectedProducts(clientId, products),
      toggleProduct: (title) => {
        const current = sentimentRaw?.selectedProducts ?? []
        const next = current.includes(title)
          ? current.filter((t) => t !== title)
          : [...current, title]
        return setSelectedProducts(clientId, next)
      },
      orchestrate: () => orchestrate(clientId),
    }),
    [clientId, event, sentimentRaw, wf.tasks, confirmEvent, analyseSentiment,
     autoSelectProducts, setSelectedProducts, orchestrate],
  )
}
