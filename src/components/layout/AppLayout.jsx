import { Outlet, useParams } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function AppLayout() {
  const { clientId } = useParams()
  return (
    <div className="flex h-screen bg-canvas font-sans text-ink">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className={`mx-auto p-10 md:p-14 ${clientId ? 'max-w-[1400px]' : 'max-w-5xl'}`}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
