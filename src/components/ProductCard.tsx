import { Link } from 'react-router-dom'
import { Eye, Settings } from 'lucide-react'

interface ProductCardProps {
  id: string
  name: string
  type: string
  platform: string
  status: 'live' | 'test' | 'draft' | 'paused'
  metric?: string
  lastActivity: string
  color?: string
}

const STATUS_CONFIG = {
  live: { dot: 'bg-emerald-400', label: 'Live', bg: 'bg-emerald-400/10 text-emerald-400' },
  test: { dot: 'bg-amber-400', label: 'Test Mode', bg: 'bg-amber-400/10 text-amber-400' },
  draft: { dot: 'bg-gray-400', label: 'Draft', bg: 'bg-gray-400/10 text-gray-400' },
  paused: { dot: 'bg-red-400', label: 'Paused', bg: 'bg-red-400/10 text-red-400' },
}

export default function ProductCard({ id, name, type, platform, status, metric, lastActivity, color }: ProductCardProps) {
  const s = STATUS_CONFIG[status]
  const accent = color || '#7C5CFC'

  return (
    <div className="group rounded-2xl border border-navy-700/50 bg-navy-800/50 p-5 transition-all hover:border-purple-500/30 hover:bg-navy-800">
      <div className="mb-4 flex items-start justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl text-base font-bold text-white"
          style={{ backgroundColor: accent }}
        >
          {name[0]}
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${s.bg}`}>
          <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${s.dot}`} />
          {s.label}
        </span>
      </div>
      <h3 className="mb-1 text-[15px] font-semibold">{name}</h3>
      <p className="mb-4 text-sm text-gray-500">{type} · {platform}</p>
      {metric && (
        <p className="mb-4 text-sm text-gray-400">{metric}</p>
      )}
      <p className="mb-5 text-xs text-gray-600">Last: {lastActivity}</p>
      <div className="flex gap-2 border-t border-navy-700/50 pt-4">
        <Link
          to={`/products/${id}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-navy-700/50 py-2 text-sm text-gray-300 transition-colors hover:bg-navy-600 hover:text-white"
        >
          <Settings className="h-3.5 w-3.5" />
          Manage
        </Link>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-navy-700/50 py-2 text-sm text-gray-300 transition-colors hover:bg-navy-600 hover:text-white">
          <Eye className="h-3.5 w-3.5" />
          Preview
        </button>
      </div>
    </div>
  )
}

export function NewProductCard() {
  return (
    <Link
      to="/setup"
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy-600 bg-navy-800/20 p-8 text-center transition-all hover:border-purple-500/40 hover:bg-navy-800/40"
    >
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-navy-700 text-xl text-purple-400">
        +
      </div>
      <p className="mb-1 text-sm font-medium text-gray-300">New Product</p>
      <p className="text-xs text-gray-600">Set up in minutes</p>
    </Link>
  )
}
