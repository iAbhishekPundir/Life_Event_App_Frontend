import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as api from '../api/clients'

const WorkflowStepsContext = createContext(null)

/**
 * The 5 workflow steps, fetched once from GET /api/workflow-steps.
 *
 * No local fallback on purpose: if the API is down you should see that
 * plainly, not silently get the old hardcoded list and think it worked.
 */
export function WorkflowStepsProvider({ children }) {
  const [steps, setSteps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .fetchWorkflowSteps()
      .then(setSteps)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  const value = useMemo(
    () => ({
      steps,
      loading,
      error,
      getStepById: (id) => steps.find((s) => s.id === id),
      // no_signal_summary now lives on each step row
      getNoSignalSummary: (id) =>
        steps.find((s) => s.id === id)?.noSignalSummary ?? '',
    }),
    [steps, loading, error],
  )

  return (
    <WorkflowStepsContext.Provider value={value}>{children}</WorkflowStepsContext.Provider>
  )
}

export function useWorkflowSteps() {
  const ctx = useContext(WorkflowStepsContext)
  if (!ctx) throw new Error('useWorkflowSteps must be used within a WorkflowStepsProvider')
  return ctx
}
