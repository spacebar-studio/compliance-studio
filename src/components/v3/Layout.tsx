import { Link, useLocation } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

export function TopNav() {
  const location = useLocation()
  const isSetup = location.pathname.startsWith('/setup')
  const isHome = location.pathname === '/'

  if (isHome) return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-950/60 backdrop-blur-2xl">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-[13px] font-semibold tracking-[-0.01em] text-white/70 transition-colors hover:text-white">
            Compliance Studio
          </Link>
          {!isSetup && (
            <div className="flex items-center gap-1">
              <NavLink to="/products" label="Products" />
              <NavLink to="/settings" label="Settings" />
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          {isSetup && <StepDots />}
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600" />
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
      className={`rounded-full px-3 py-1 text-[13px] transition-all ${
        active ? 'bg-white/[0.07] text-white/90' : 'text-white/30 hover:text-white/50'
      }`}
    >
      {label}
    </Link>
  )
}

function StepDots() {
  const location = useLocation()
  const steps = ['/setup', '/setup/brand', '/setup/review']
  const current = steps.indexOf(location.pathname)
  return (
    <div className="flex gap-1.5">
      {steps.map((_, i) => (
        <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${
          i === current ? 'w-5 bg-white/80' : i < current ? 'w-1.5 bg-white/30' : 'w-1.5 bg-white/10'
        }`} />
      ))}
    </div>
  )
}

export function BackButton({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="inline-flex items-center gap-1 text-[13px] text-white/25 transition-colors hover:text-white/50">
      <ChevronLeft className="h-3.5 w-3.5" />
      {label}
    </Link>
  )
}

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <main className="min-h-screen pt-12">{children}</main>
    </>
  )
}
