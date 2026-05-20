import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ExpandableSectionProps {
  title: string
  summary?: string
  status?: 'on' | 'off' | 'configured' | 'incomplete'
  children: React.ReactNode
  defaultOpen?: boolean
}

export default function ExpandableSection({ title, summary, status, children, defaultOpen = false }: ExpandableSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-navy-700/50">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-0 py-4 text-left transition-colors hover:opacity-80"
      >
        <div className="flex items-center gap-3">
          <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.15 }}>
            <ChevronRight className="h-4 w-4 text-gray-500" />
          </motion.div>
          <span className="text-[15px] font-medium">{title}</span>
          {status && <StatusDot status={status} />}
        </div>
        {summary && !open && (
          <span className="text-sm text-gray-500">{summary}</span>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-7">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function StatusDot({ status }: { status: 'on' | 'off' | 'configured' | 'incomplete' }) {
  const config = {
    on: { color: 'bg-emerald-400', label: 'On' },
    off: { color: 'bg-gray-500', label: 'Off' },
    configured: { color: 'bg-emerald-400', label: 'Configured' },
    incomplete: { color: 'bg-amber-400', label: 'Incomplete' },
  }
  const c = config[status]
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-navy-800 px-2.5 py-0.5 text-xs text-gray-400">
      <span className={`h-1.5 w-1.5 rounded-full ${c.color}`} />
      {c.label}
    </span>
  )
}
