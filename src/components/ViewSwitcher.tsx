import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Play, List } from 'lucide-react'
import { useVersion } from '../context/VersionContext'

export default function ViewSwitcher() {
  const location = useLocation()
  const navigate = useNavigate()
  const isAllScreens = location.pathname === '/all-screens'
  const { version, setVersion } = useVersion()
  const [isIframe, setIsIframe] = useState(false)

  useEffect(() => {
    setIsIframe(window !== window.parent)
  }, [])

  if (isIframe) return null

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-2">
      {/* Version toggle */}
      <div className="flex overflow-hidden rounded-xl border border-navy-600 bg-navy-800/95 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <button
          onClick={() => setVersion('v1')}
          className={`whitespace-nowrap px-3.5 py-2.5 text-[11px] font-semibold tracking-tight transition-colors ${
            version === 'v1'
              ? 'bg-white/10 text-white'
              : 'text-gray-500 hover:bg-white/[0.04] hover:text-gray-300'
          }`}
        >
          Design System
        </button>
        <button
          onClick={() => setVersion('v2')}
          className={`whitespace-nowrap px-3.5 py-2.5 text-[11px] font-semibold tracking-tight transition-colors ${
            version === 'v2'
              ? 'bg-gradient-to-r from-purple-500/20 to-cyan-400/10 text-white'
              : 'text-gray-500 hover:bg-white/[0.04] hover:text-gray-300'
          }`}
        >
          New Design System
        </button>
        <button
          onClick={() => setVersion('v3')}
          className={`whitespace-nowrap px-3.5 py-2.5 text-[11px] font-semibold tracking-tight transition-colors ${
            version === 'v3'
              ? 'bg-white/10 text-white'
              : 'text-gray-500 hover:bg-white/[0.04] hover:text-gray-300'
          }`}
        >
          Simple
        </button>
        <button
          onClick={() => setVersion('v4')}
          className={`whitespace-nowrap px-3.5 py-2.5 text-[11px] font-semibold tracking-tight transition-colors ${
            version === 'v4'
              ? 'bg-gradient-to-r from-orange-500/20 to-purple-500/10 text-white'
              : 'text-gray-500 hover:bg-white/[0.04] hover:text-gray-300'
          }`}
        >
          AI Analyze
        </button>
      </div>

      {/* Mode toggle */}
      <div className="flex overflow-hidden rounded-xl border border-navy-600 bg-navy-800/95 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <button
          onClick={() => { if (isAllScreens) navigate('/') }}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
            !isAllScreens
              ? 'bg-purple-500 text-white'
              : 'text-gray-400 hover:bg-navy-700 hover:text-gray-200'
          }`}
        >
          <Play className="h-3.5 w-3.5" />
          Prototype
        </button>
        <button
          onClick={() => { if (!isAllScreens) navigate('/all-screens') }}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
            isAllScreens
              ? 'bg-purple-500 text-white'
              : 'text-gray-400 hover:bg-navy-700 hover:text-gray-200'
          }`}
        >
          <List className="h-3.5 w-3.5" />
          All Screens
        </button>
      </div>
    </div>
  )
}
