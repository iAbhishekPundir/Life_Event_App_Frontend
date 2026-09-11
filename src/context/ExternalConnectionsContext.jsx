import { createContext, useContext, useState } from 'react'
import { INITIAL_EXTERNAL_CONNECTIONS } from '../data/configureData'

const ExternalConnectionsContext = createContext(null)

export function ExternalConnectionsProvider({ children }) {
  const [connections, setConnections] = useState(INITIAL_EXTERNAL_CONNECTIONS)

  const addConnection = (conn) => setConnections((prev) => [...prev, conn])

  const setConnectionStatus = (id, status) =>
    setConnections((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)))

  const removeConnection = (id) => setConnections((prev) => prev.filter((c) => c.id !== id))

  return (
    <ExternalConnectionsContext.Provider
      value={{ connections, addConnection, setConnectionStatus, removeConnection }}
    >
      {children}
    </ExternalConnectionsContext.Provider>
  )
}

export function useExternalConnections() {
  const ctx = useContext(ExternalConnectionsContext)
  if (!ctx) throw new Error('useExternalConnections must be used within an ExternalConnectionsProvider')
  return ctx
}
