import { Link, useLocation } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

export function TopNav() {
  const location = useLocation()
  const isSetup = location.pathname.startsWith('/setup')
  const isHome = location.pathname === '/'

  if (isHome) return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.04] bg-navy-950/70 backdrop-blur-2xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-8">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative flex h-8 w-8 items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 opacity-80" />
              <svg className="relative z-10 h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
                <path d="M12 22V12" />
                <path d="M12 12L3 7" />
                <path d="M12 12l9-5" />
              </svg>
            </div>
            <span className="v2-mono text-[13px] font-semibold tracking-tight text-white/90">compliance.studio</span>
          </Link>
          {!isSetup && (
            <div className="flex items-center gap-1">
              <NavLink to="/products" label="Products" />
              <NavLink to="/settings" label="Settings" />
            </div>
          )}
        </div>
        <div className="flex items-center gap-5">
          {isSetup && <SetupProgress />}
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-purple-500/30 to-cyan-400/20 text-[11px] font-bold text-white/80 v2-mono">
            TP
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ to, label }: { to: string; label: string }) {
  const location = useLocation()
  const active = location.pathname.startsWith(to)
  return (
    <Link
      to={to}
      className={`rounded-md px-3 py-1.5 text-[13px] transition-all v2-mono ${
        active
          ? 'bg-white/[0.06] text-white'
          : 'text-white/50 hover:bg-white/[0.03] hover:text-white/80'
      }`}
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
    <div className="flex items-center gap-3">
      {steps.map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold v2-mono transition-all ${
            i <= current
              ? 'bg-gradient-to-br from-purple-500 to-cyan-400 text-white'
              : 'bg-white/[0.04] text-white/20'
          }`}>
            {i + 1}
          </div>
          {i < steps.length - 1 && (
            <div className={`h-px w-4 transition-colors ${i < current ? 'bg-purple-500/40' : 'bg-white/[0.06]'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export function BackButton({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="mb-8 inline-flex items-center gap-1.5 text-[13px] text-white/30 transition-colors hover:text-white/60 v2-mono">
      <ChevronLeft className="h-3.5 w-3.5" />
      {label}
    </Link>
  )
}

export function PageWrapper({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <>
      <TopNav />
      <main className={`min-h-screen pt-14 ${className}`}>
        {children}
      </main>
    </>
  )
}
