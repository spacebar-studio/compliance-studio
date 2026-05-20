import { useRef, useState, useEffect } from 'react'

const VIEWPORT_WIDTH = 1440
const MAX_VISIBLE_H = 600

interface ScreenEmbedProps {
  route: string
  name: string
  iframeHeight: number
}

export default function ScreenEmbed({ route, name, iframeHeight }: ScreenEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.65)

  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth
        setScale(w / VIEWPORT_WIDTH)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const scaledH = iframeHeight * scale
  const needsScroll = scaledH > MAX_VISIBLE_H

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.04] bg-navy-950">
      <div className="flex items-center gap-2 border-b border-white/[0.04] px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/40" />
        </div>
        <span className="ml-2 font-mono text-[11px] text-gray-600">
          compliance.studio{route === '/' ? '' : route.split('?')[0]}
        </span>
      </div>
      <div
        ref={containerRef}
        className={`embed-scroll relative w-full ${needsScroll ? 'overflow-y-auto' : 'overflow-hidden'}`}
        style={{ height: needsScroll ? MAX_VISIBLE_H : scaledH }}
      >
        <div style={{ height: scaledH, position: 'relative' }}>
          <iframe
            src={route}
            title={name}
            className="absolute left-0 top-0 border-0"
            style={{
              width: VIEWPORT_WIDTH,
              height: iframeHeight,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}
