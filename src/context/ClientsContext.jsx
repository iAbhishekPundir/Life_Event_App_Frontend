import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as api from '../api/clients'

const ClientsContext = createContext(null)

/**
 * Owns all backend-sourced client data.
 *
 * Deliberately exposes clients in the same shape the old mock data used
 * (`clients` array, `getClientById`, per-client `event` + `caseInfo`), so
 * the presentational components didn't need to change when we swapped mock
 * data for the API.
 */
export function ClientsProvider({ children }) {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // clientId -> { event, caseInfo, tasks, loading, error }
  const [workflows, setWorkflows] = useState({})

  const loadClients = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setClients(await api.fetchClients())
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadClients()
  }, [loadClients])

  /** Loads (or reloads) one client's full workflow. */
  const loadWorkflow = useCallback(async (clientId) => {
    if (!clientId) return
    setWorkflows((prev) => ({
      ...prev,
      [clientId]: { ...(prev[clientId] ?? {}), loading: true, error: null },
    }))
    try {
      const data = await api.fetchClientWorkflow(clientId)
      setWorkflows((prev) => ({ ...prev, [clientId]: { ...data, loading: false, error: null } }))
      return data
    } catch (err) {
      setWorkflows((prev) => ({
        ...prev,
        [clientId]: { ...(prev[clientId] ?? {}), loading: false, error: err },
      }))
      throw err
    }
  }, [])

  /**
   * Runs the full agent pipeline for a client, then reloads.
   * Detection opens the case; the later steps are best-effort because an
   * early step failing shouldn't block showing whatever did succeed.
   */
  const runPipeline = useCallback(
    async (clientId) => {
      setWorkflows((prev) => ({
        ...prev,
        [clientId]: { ...(prev[clientId] ?? {}), loading: true, error: null },
      }))
      try {
        const detection = await api.runDetection(clientId)
        if (detection?.detected) {
          try {
            await api.generateRecommendations(clientId)
            await api.generateAdvisorBrief(clientId)
          } catch {
            /* downstream step unavailable — show what we have */
          }
        }
        await loadClients()
        return await loadWorkflow(clientId)
      } catch (err) {
        setWorkflows((prev) => ({
          ...prev,
          [clientId]: { ...(prev[clientId] ?? {}), loading: false, error: err },
        }))
        throw err
      }
    },
    [loadWorkflow, loadClients],
  )

  const getClientById = useCallback(
    (clientId) => {
      const base = clients.find((c) => c.id === clientId)
      if (!base) return null
      const wf = workflows[clientId] ?? {}
      return { ...base, event: wf.event ?? null, caseInfo: wf.caseInfo ?? null, tasks: wf.tasks ?? [] }
    },
    [clients, workflows],
  )

  const getWorkflowState = useCallback(
    (clientId) => workflows[clientId] ?? { loading: false, error: null },
    [workflows],
  )

  // --- mutations: each refreshes the affected client afterwards ---

  const confirmEvent = useCallback(
    async (clientId) => {
      await api.confirmEvent(clientId)
      return loadWorkflow(clientId)
    },
    [loadWorkflow],
  )

  const analyseSentiment = useCallback(
    async (clientId, text) => {
      const result = await api.analyseSentiment(clientId, text)
      await loadWorkflow(clientId)
      return result
    },
    [loadWorkflow],
  )

  const autoSelectProducts = useCallback(
    async (clientId) => {
      const result = await api.autoSelectProducts(clientId)
      await loadWorkflow(clientId)
      return result
    },
    [loadWorkflow],
  )

  const setSelectedProducts = useCallback(
    async (clientId, products) => {
      const result = await api.updateSelectedProducts(clientId, products)
      await loadWorkflow(clientId)
      return result
    },
    [loadWorkflow],
  )

  const orchestrate = useCallback(
    async (clientId) => {
      const tasks = await api.runOrchestration(clientId)
      await loadWorkflow(clientId)
      return tasks
    },
    [loadWorkflow],
  )

  const setCaseStatus = useCallback(
    async (clientId, status) => {
      await api.updateCaseStatus(clientId, status)
      return loadWorkflow(clientId)
    },
    [loadWorkflow],
  )

  const value = useMemo(
    () => ({
      clients,
      loading,
      error,
      reload: loadClients,
      getClientById,
      getWorkflowState,
      loadWorkflow,
      runPipeline,
      confirmEvent,
      analyseSentiment,
      autoSelectProducts,
      setSelectedProducts,
      orchestrate,
      setCaseStatus,
      workflows,
    }),
    [
      clients, loading, error, loadClients, getClientById, getWorkflowState, loadWorkflow,
      runPipeline, confirmEvent, analyseSentiment, autoSelectProducts, setSelectedProducts,
      orchestrate, setCaseStatus, workflows,
    ],
  )

  return <ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>
}

export function useClients() {
  const ctx = useContext(ClientsContext)
  if (!ctx) throw new Error('useClients must be used within a ClientsProvider')
  return ctx
}

/**
 * Loads a single client's workflow on mount and returns it with load state.
 *
 * `clientsLoading` distinguishes "the client list hasn't loaded yet" (on a
 * direct link or page refresh, `clients` starts empty) from "this id truly
 * doesn't exist" -- callers should only redirect away once `clientsLoading`
 * is false and `client` is still null.
 */
export function useClientWorkflow(clientId) {
  const { clients, loading: clientsLoading, getClientById, getWorkflowState, loadWorkflow, workflows } = useClients()

  useEffect(() => {
    if (clientId && !workflows[clientId]) loadWorkflow(clientId)
  }, [clientId, workflows, loadWorkflow])

  return {
    client: getClientById(clientId),
    clientsLoading: clientsLoading && clients.length === 0,
    ...getWorkflowState(clientId),
  }
}
