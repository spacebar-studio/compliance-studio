import { Link, useLocation } from 'react-router-dom'
import { Shield, ChevronLeft } from 'lucide-react'

export function TopNav() {
  const location = useLocation()
  const isSetup = location.pathname.startsWith('/setup')
  const isHome = location.pathname === '/'

  if (isHome) return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-navy-700/50 bg-navy-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight">Compliance Studio</span>
          </Link>
          {!isSetup && (
            <div className="flex items-center gap-6">
              <NavLink to="/products" label="Products" />
              <NavLink to="/settings" label="Settings" />
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          {isSetup && <SetupProgress />}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 text-sm font-medium text-purple-400">
            T
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ to, label }: { to: string; label: string }) {
  const location = useLocation()
  const active = location.pathname.startsWith(to) && to !== '#'
  return (
    <Link
      to={to}
      className={`text-sm transition-colors ${active ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
    >
      {label}
    </Link>
  )
}

function SetupProgress() {
  const location = useLocation()
  const steps = ['/setup', '/setup/brand', '/setup/review']
  const current = steps.indexOf(location.pathname)

  return (
    <div className="flex items-center gap-2">
      {steps.map((_, i) => (
        <div
          key={i}
          className={`h-2 w-2 rounded-full transition-colors ${
            i <= current ? 'bg-purple-500' : 'bg-navy-600'
          }`}
        />
      ))}
      <span className="ml-2 text-xs text-gray-500">Step {current + 1} of 3</span>
    </div>
  )
}

export function BackButton({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white">
      <ChevronLeft className="h-4 w-4" />
      {label}
    </Link>
  )
}

export function PageWrapper({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <>
      <TopNav />
      <main className={`min-h-screen pt-16 ${className}`}>
        {children}
      </main>
    </>
  )
}
