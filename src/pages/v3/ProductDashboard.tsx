import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageWrapper } from '../../components/v3/Layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Copy, Check } from 'lucide-react'

const METRICS = [
  { label: 'Verified today', value: '12,431' },
  { label: 'Success rate', value: '98.2%' },
  { label: 'Avg time', value: '< 3s' },
]

const CONFIG = [
  { label: 'Type', value: 'Game · iOS' },
  { label: 'Audience', value: 'Everyone (including under 13)' },
  { label: 'Age assurance', value: 'Facial estimation, 85%' },
  { label: 'Parental consent', value: 'Email + ID verification' },
  { label: 'Appeal window', value: '24 hours' },
]

const ACTIVITY = [
  { time: '2:34 PM', action: 'Branding updated', who: 'Nina J.' },
  { time: '11:20 AM', action: 'Threshold → 85%', who: 'Tulcy P.' },
  { time: 'May 15', action: 'Pushed to production', who: 'Nina J.' },
]

export default function ProductDashboard() {
  const [copied, setCopied] = useState(false)

  function copyKey() {
    navigator.clipboard.writeText('pk_live_a1b2c3d4e5f6g7h8').catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <PageWrapper>
      <div className="mx-auto max-w-2xl px-8 py-28">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <Link to="/products" className="mb-10 inline-flex items-center gap-1.5 text-[13px] text-white/20 transition-colors hover:text-white/40">
            <ArrowLeft className="h-3 w-3" />
            Products
          </Link>

          <div className="mb-16 flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 text-xl font-bold text-white">
              P
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-[28px] font-bold tracking-[-0.03em] text-white">Pixel Quest</h1>
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[12px] text-white/30">Live</span>
                </div>
              </div>
              <p className="mt-1 text-[14px] text-white/20">Game · iOS · All ages</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="mb-16 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.04]">
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/[0.02] px-6 py-7"
              >
                <p className="mb-3 text-[12px] text-white/20">{m.label}</p>
                <p className="text-[24px] font-semibold tracking-[-0.02em] text-white">{m.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Configuration */}
          <div className="mb-16">
            <h2 className="mb-6 text-[13px] font-medium uppercase tracking-[0.08em] text-white/15">Configuration</h2>
            <div className="space-y-0">
              {CONFIG.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.04 }}
                  className="flex items-center justify-between border-b border-white/[0.04] py-5"
                >
                  <span className="text-[14px] text-white/30">{item.label}</span>
                  <span className="text-[14px] text-white/60">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* API Key */}
          <div className="mb-16">
            <h2 className="mb-6 text-[13px] font-medium uppercase tracking-[0.08em] text-white/15">API Key</h2>
            <div className="flex items-center justify-between rounded-2xl border border-white/[0.04] bg-white/[0.02] px-6 py-5">
              <code className="text-[13px] text-white/40">pk_live_a1b2c3d4e5f6g7h8</code>
              <button
                onClick={copyKey}
                className="flex items-center gap-1.5 text-[12px] text-white/20 transition-colors hover:text-white/40"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Activity */}
          <div>
            <h2 className="mb-6 text-[13px] font-medium uppercase tracking-[0.08em] text-white/15">Activity</h2>
            <div className="space-y-0">
              {ACTIVITY.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.04 }}
                  className="flex items-center gap-8 border-b border-white/[0.04] py-5"
                >
                  <span className="w-16 shrink-0 text-[12px] text-white/15">{item.time}</span>
                  <span className="text-[14px] text-white/40">{item.action}</span>
                  <span className="ml-auto text-[12px] text-white/15">{item.who}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
