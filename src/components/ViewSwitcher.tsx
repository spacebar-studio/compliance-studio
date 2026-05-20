import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Play, List } from 'lucide-react'

export default function ViewSwitcher() {
  const location = useLocation()
  const navigate = useNavigate()
  const isAllScreens = location.pathname === '/all-screens'
  const [isIframe, setIsIframe] = useState(false)

  useEffect(() => {
    setIsIframe(window !== window.parent)
  }, [])

  if (isIframe) return null

  return (
    <div className="fixed right-8 top-0 z-[100] flex h-16 items-center">
      <div className="flex overflow-hidden rounded-full border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl">
        <button
          onClick={() => { if (isAllScreens) navigate('/') }}
          className={`flex items-center gap-2 px-4 py-1.5 text-[12px] font-medium transition-all ${
            !isAllScreens
              ? 'bg-white/[0.08] text-white'
              : 'text-white/25 hover:bg-white/[0.04] hover:text-white/50'
          }`}
        >
          <Play className="h-3 w-3" />
          Prototype
        </button>
        <button
          onClick={() => { if (!isAllScreens) navigate('/all-screens') }}
          className={`flex items-center gap-2 px-4 py-1.5 text-[12px] font-medium transition-all ${
            isAllScreens
              ? 'bg-white/[0.08] text-white'
              : 'text-white/25 hover:bg-white/[0.04] hover:text-white/50'
          }`}
        >
          <List className="h-3 w-3" />
          All Screens
        </button>
      </div>
    </div>
  )
}
