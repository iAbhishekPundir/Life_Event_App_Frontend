import { createContext, useContext, useMemo } from 'react'
import { useClients } from './ClientsContext'

const CaseStatusContext = createContext(null)

/**
 * Case status, backed by the API.
 *
 * The public interface (getStatus / setStatus / markOpened / counts) is
 * unchanged from the mock-data version, so ActiveCaseCard, ClientHeader,
 * CaseIdStrip and WorkflowOrchestrationStep did not need modifying. Only
 * the source of truth moved: status now lives in the backend's
 * ui_client_workflow_state table rather than React state.
 */
export function CaseStatusProvider({ children }) {
  const { clients, workflows, setCaseStatus } = useClients()

  const statuses = useMemo(() => {
    const result = {}
    clients.forEach((c) => {
      // The clients list endpoint now returns caseInfo directly, so the
      // dashboard shows real case counts on first load. A loaded workflow
      // takes precedence because it reflects any mutation made since.
      const caseInfo = workflows[c.id]?.caseInfo ?? c.caseInfo
      if (caseInfo) result[c.id] = caseInfo.status
    })
    return result
  }, [clients, workflows])

  const counts = useMemo(() => {
    const result = { Open: 0, 'In Progress': 0, Converted: 0, Lost: 0 }
    Object.values(statuses).forEach((s) => {
      if (s in result) result[s] += 1
    })
    return result
  }, [statuses])

  const value = useMemo(
    () => ({
      statuses,
      counts,
      getStatus: (id) => statuses[id] ?? 'Open',
      // Only Converted / Lost are client-settable; Open -> In Progress is
      // driven by the backend when orchestration runs.
      setStatus: (id, status) => setCaseStatus(id, status),
      markOpened: () => {},
    }),
    [statuses, counts, setCaseStatus],
  )

  return <CaseStatusContext.Provider value={value}>{children}</CaseStatusContext.Provider>
}

export function useCaseStatus() {
  const ctx = useContext(CaseStatusContext)
  if (!ctx) throw new Error('useCaseStatus must be used within a CaseStatusProvider')
  return ctx
}
