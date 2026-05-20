import { useRef, useState, useEffect } from 'react'

const VIEWPORT_WIDTH = 1440

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

  const containerH = iframeHeight * scale

  return (
    <div className="overflow-hidden rounded-2xl border border-navy-700/60 bg-navy-950">
      <div className="flex items-center gap-2 border-b border-navy-700/40 px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/40" />
        </div>
        <span className="ml-2 font-mono text-[11px] text-gray-600">
          compliance.studio{route === '/' ? '' : route}
        </span>
      </div>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ height: containerH }}
      >
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
  )
}
