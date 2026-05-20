import { useState } from 'react'
import { PageWrapper, BackButton } from '../../components/v2/Layout'
import PreviewPanel from '../../components/PreviewPanel'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, TrendingUp, Activity, Clock, ChevronRight, Check, Zap } from 'lucide-react'

const CONFIG_SECTIONS = [
  { id: 'details', title: 'Product Details', status: 'configured' as const, summary: 'Game · iOS · All ages · Medium risk' },
  { id: 'brand', title: 'Branding', status: 'configured' as const, summary: 'AI-generated — Brand Match palette' },
  { id: 'assurance', title: 'Age Assurance', status: 'on' as const, summary: 'Facial estimation · 85% threshold' },
  { id: 'appeal', title: 'Age Appeal', status: 'on' as const, summary: '24hr window · ID upload' },
  { id: 'adult', title: 'Adult Verification', status: 'off' as const, summary: 'Not required for this config' },
  { id: 'consent', title: 'Parental Consent', status: 'on' as const, summary: 'Email + ID · 365d expiry' },
  { id: 'dev', title: 'Developer Settings', status: 'configured' as const, summary: 'SDK keys · webhook configured' },
]

const STATUS_STYLE = {
  on: 'text-emerald-400 bg-emerald-400/10',
  off: 'text-white/20 bg-white/[0.03]',
  configured: 'text-cyan-400 bg-cyan-400/10',
}

export default function ProductDashboard() {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <PageWrapper>
      <div className="v2-dotgrid relative min-h-screen">
        <div className="mx-auto max-w-5xl px-8 py-12">
          <BackButton to="/products" label="products" />

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            {/* Hero */}
            <div className="v2-grain mb-8 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 text-xl font-bold text-white">
                    P
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-xl font-bold">Pixel Quest</h1>
                      <span className="v2-mono rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-bold text-emerald-400">LIVE</span>
                    </div>
                    <p className="v2-mono text-[11px] text-white/40">game · ios · all ages</p>
                  </div>
                </div>
                <button onClick={() => setPreviewOpen(true)}
                  className="flex items-center gap-2 rounded-xl bg-white/[0.04] px-4 py-2.5 text-[13px] text-white/40 transition-all hover:bg-white/[0.08] hover:text-white/70">
                  <Eye className="h-4 w-4" /> Preview
                </button>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <MetricCard icon={TrendingUp} label="VERIFIED TODAY" value="12,431" trend="+8%" />
                <MetricCard icon={Activity} label="SUCCESS RATE" value="98.2%" trend="+0.3%" />
                <MetricCard icon={Clock} label="AVG TIME" value="< 3s" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Config */}
              <div className="lg:col-span-2">
                <p className="v2-mono mb-4 text-[10px] font-semibold tracking-wide text-white/30">CONFIGURATION</p>
                <div className="v2-grain rounded-2xl border border-white/[0.06] bg-white/[0.015] p-1">
                  {CONFIG_SECTIONS.map((s, i) => {
                    const isOpen = expanded === s.id
                    return (
                      <div key={s.id} className={i > 0 ? 'border-t border-white/[0.03]' : ''}>
                        <button onClick={() => setExpanded(isOpen ? null : s.id)}
                          className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/[0.02]">
                          <div className="flex items-center gap-3">
                            <ChevronRight className={`h-3.5 w-3.5 text-white/15 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                            <div>
                              <div className="flex items-center gap-2.5">
                                <span className="text-[14px] font-medium text-white/80">{s.title}</span>
                                <span className={`v2-mono rounded px-1.5 py-0.5 text-[9px] font-semibold ${STATUS_STYLE[s.status]}`}>
                                  {s.status.toUpperCase()}
                                </span>
                              </div>
                              {!isOpen && <p className="v2-mono mt-0.5 text-[10px] text-white/30">{s.summary}</p>}
                            </div>
                          </div>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="mx-5 mb-4 rounded-xl border border-white/[0.04] bg-white/[0.02] p-5">
                                <ConfigContent section={s.id} />
                                <div className="mt-4 flex gap-2 border-t border-white/[0.04] pt-4">
                                  <button className="v2-mono rounded-lg bg-purple-500 px-4 py-2 text-[11px] font-medium text-white">save</button>
                                  <button onClick={() => setExpanded(null)} className="v2-mono rounded-lg bg-white/[0.04] px-4 py-2 text-[11px] text-white/25">cancel</button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <button onClick={() => setPreviewOpen(true)}
                  className="v2-grain group w-full rounded-2xl border border-white/[0.04] bg-white/[0.015] p-5 text-left transition-all hover:border-purple-500/20">
                  <p className="v2-mono mb-3 text-[10px] font-semibold text-white/35">LIVE PREVIEW</p>
                  <div className="flex justify-center rounded-xl bg-navy-950 p-4">
                    <div className="h-28 w-16 rounded-lg border border-white/[0.06] bg-white p-1.5">
                      <div className="mx-auto mb-1 h-2 w-2 rounded bg-gradient-to-br from-purple-500 to-cyan-400" />
                      <div className="mx-auto mb-0.5 h-1 w-8 rounded bg-gray-200" />
                      <div className="mx-auto mb-2 h-0.5 w-10 rounded bg-gray-100" />
                      <div className="mx-auto h-2.5 w-full rounded bg-purple-500" />
                    </div>
                  </div>
                  <p className="v2-mono mt-3 text-center text-[10px] text-white/30 group-hover:text-white/45">see user experience →</p>
                </button>

                <div className="v2-grain rounded-2xl border border-white/[0.04] bg-white/[0.015] p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="v2-mono text-[10px] font-semibold text-white/35">ACTIVITY</p>
                    <button className="v2-mono text-[10px] text-purple-400/60 hover:text-purple-400">view all</button>
                  </div>
                  <div className="space-y-3">
                    <ActivityItem time="2:34p" action="Branding updated" who="NJ" />
                    <ActivityItem time="11:20a" action="Threshold → 85%" who="TP" />
                    <ActivityItem time="May 15" action="Pushed to prod" who="NJ" />
                    <ActivityItem time="May 14" action="Consent enabled" who="TP" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <PreviewPanel open={previewOpen} onClose={() => setPreviewOpen(false)} productName="Pixel Quest"
        colors={{ primary: '#7C5CFC', secondary: '#1A1735', bg: '#F5F3FF' }} />
    </PageWrapper>
  )
}

function MetricCard({ icon: Icon, label, value, trend }: { icon: React.ElementType; label: string; value: string; trend?: string }) {
  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4">
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-white/30" />
        <span className="v2-mono text-[9px] font-semibold tracking-wide text-white/35">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-bold text-white/90">{value}</span>
        {trend && <span className="v2-mono text-[10px] text-emerald-400/70">{trend}</span>}
      </div>
    </div>
  )
}

function ActivityItem({ time, action, who }: { time: string; action: string; who: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="v2-mono mt-0.5 w-12 shrink-0 text-[10px] text-white/30">{time}</span>
      <div>
        <p className="text-[13px] text-white/50">{action}</p>
        <p className="v2-mono text-[10px] text-white/30">{who}</p>
      </div>
    </div>
  )
}

function ConfigContent({ section }: { section: string }) {
  if (section === 'details') return (
    <div className="space-y-3">
      <Field label="NAME" value="Pixel Quest" />
      <Field label="TYPE" value="Game" />
      <Field label="PLATFORM" value="iOS" />
      <Field label="RISK" value="Medium (auto)" />
    </div>
  )
  if (section === 'brand') return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400" />
        <div>
          <p className="v2-mono text-[10px] text-white/20">LOGO</p>
          <button className="v2-mono text-[11px] text-purple-400/60">replace</button>
        </div>
      </div>
      <div>
        <p className="v2-mono mb-2 text-[10px] text-white/20">PALETTE</p>
        <div className="flex items-center gap-2">
          {['#7C5CFC', '#22D3EE', '#0A0918'].map(c => (
            <div key={c} className="h-6 w-6 rounded-md border border-white/[0.06]" style={{ backgroundColor: c }} />
          ))}
          <span className="v2-mono flex items-center gap-1 text-[10px] text-cyan-400/50"><Zap className="h-3 w-3" /> AI</span>
        </div>
      </div>
    </div>
  )
  if (section === 'dev') return (
    <div className="space-y-3">
      <div>
        <p className="v2-mono mb-1 text-[10px] text-white/20">API KEY (LIVE)</p>
        <div className="v2-mono flex items-center justify-between rounded-lg bg-navy-950 p-3 text-[11px] text-white/30">
          pk_live_a1b2c3d4e5f6g7h8
          <button className="text-purple-400/60">copy</button>
        </div>
      </div>
      <div>
        <p className="v2-mono mb-1 text-[10px] text-white/20">WEBHOOK</p>
        <input defaultValue="https://api.pixelquest.com/webhooks/compliance"
          className="v2-mono w-full rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2.5 text-[11px] text-white/50 outline-none focus:border-purple-500/30" />
      </div>
    </div>
  )
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-white/40">Method</span>
        <span className="text-[13px] text-white/60">Facial estimation</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-white/40">Threshold</span>
        <span className="text-[13px] text-white/60">85%</span>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="v2-mono mb-1 text-[10px] text-white/15">{label}</p>
      <input defaultValue={value}
        className="w-full rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2.5 text-[13px] text-white/60 outline-none focus:border-purple-500/30" />
    </div>
  )
}
