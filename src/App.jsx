import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ConfigureDataPage from './pages/ConfigureDataPage'
import ClientOverviewPage from './pages/ClientOverviewPage'
import StepDetailPage from './pages/StepDetailPage'
import { ClientsProvider } from './context/ClientsContext'
import { WorkflowStepsProvider } from './context/WorkflowStepsContext'
import { CaseStatusProvider } from './context/CaseStatusContext'
import { WorkflowSessionProvider } from './context/WorkflowSessionContext'
import { ExternalConnectionsProvider } from './context/ExternalConnectionsContext'

export default function App() {
  return (
    <ClientsProvider>
      <WorkflowStepsProvider>
      <CaseStatusProvider>
      <WorkflowSessionProvider>
        <ExternalConnectionsProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/configure-data" element={<ConfigureDataPage />} />
              <Route path="/client/:clientId" element={<ClientOverviewPage />} />
              <Route path="/client/:clientId/step/:stepId" element={<StepDetailPage />} />
            </Route>
          </Routes>
        </ExternalConnectionsProvider>
      </WorkflowSessionProvider>
      </CaseStatusProvider>
      </WorkflowStepsProvider>
    </ClientsProvider>
  )
}
