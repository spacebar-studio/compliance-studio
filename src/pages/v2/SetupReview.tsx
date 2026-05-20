import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageWrapper } from '../../components/v2/Layout'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown, ChevronLeft, ChevronRight, Smartphone, Tablet, Monitor } from 'lucide-react'

const SECTIONS = [
  { id: 'details', title: 'Product Details', summary: 'Game · iOS · All ages', sub: 'Medium risk (auto-detected)', items: ['Name: Pixel Quest', 'Type: Game', 'Platform: iOS', 'Risk: Medium'] },
  { id: 'brand', title: 'Branding', summary: 'AI-generated from logo', sub: 'Brand Match palette', colors: ['#7C5CFC', '#22D3EE', '#0A0918'] },
  { id: 'assurance', title: 'Age Assurance', summary: 'Facial estimation', sub: '85% confidence threshold', items: ['Method: Facial estimation', 'Threshold: 85%', 'Fallback: ID verification'] },
  { id: 'appeal', title: 'Age Appeal', summary: '24hr appeal window', sub: 'ID document upload', items: ['Window: 24 hours', 'Method: ID upload', 'Auto-escalation: On'] },
  { id: 'consent', title: 'Parental Consent', summary: 'Email + ID flow', sub: '365 day expiry', items: ['Method: Email + ID', 'Expiry: 365 days', 'Re-consent: Major updates'] },
]

const PREVIEW_STEPS = ['Gate', 'Scan', 'Appeal', 'Consent']

export default function SetupReview() {
  const navigate = useNavigate()
  const [editing, setEditing] = useState<string | null>(null)
  const [step, setStep] = useState(0)
  const [device, setDevice] = useState<'phone' | 'tablet' | 'desktop'>('phone')
  const [launching, setLaunching] = useState(false)

  function handleLaunch() {
    setLaunching(true)
    setTimeout(() => navigate('/setup/success'), 1500)
  }

  const dw = device === 'phone' ? 200 : device === 'tablet' ? 280 : 360
  const dh = device === 'phone' ? 400 : device === 'tablet' ? 350 : 300

  return (
    <PageWrapper>
      <div className="v2-dotgrid relative min-h-screen">
        <div className="pointer-events-none absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-emerald-400/[0.03] blur-[100px]" />

        <div className="mx-auto max-w-6xl px-8 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>

            <div className="mb-10 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400/20 to-cyan-400/10 text-2xl font-black text-white/90">
                3
              </span>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">You're all set</h1>
                <p className="v2-mono text-[12px] text-white/40">here's what we configured for Pixel Quest</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
              {/* Config summary */}
              <div className="lg:col-span-3">
                <div className="v2-grain rounded-2xl border border-white/[0.06] bg-white/[0.015] p-1">
                  {SECTIONS.map((s, i) => {
                    const isEditing = editing === s.id
                    return (
                      <div key={s.id} className={`${i > 0 ? 'border-t border-white/[0.03]' : ''}`}>
                        <button
                          onClick={() => setEditing(isEditing ? null : s.id)}
                          className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-400/10">
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-[14px] font-medium text-white/90">{s.title}</p>
                                {'colors' in s && s.colors && (
                                  <div className="flex -space-x-1">
                                    {s.colors.map((c, j) => (
                                      <div key={j} className="h-3 w-3 rounded-full border border-navy-900" style={{ backgroundColor: c }} />
                                    ))}
                                  </div>
                                )}
                              </div>
                              <p className="v2-mono text-[10px] text-white/35">{s.summary} — {s.sub}</p>
                            </div>
                          </div>
                          <ChevronDown className={`h-4 w-4 text-white/15 transition-transform ${isEditing ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {isEditing && 'items' in s && s.items && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="mx-5 mb-4 rounded-xl border border-white/[0.04] bg-white/[0.02] p-4">
                                {s.items.map((item, j) => (
                                  <div key={j} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
                                    <span className="v2-mono text-[11px] text-white/40">{item.split(':')[0]}</span>
                                    <span className="text-[13px] text-white/60">{item.split(':').slice(1).join(':').trim()}</span>
                                  </div>
                                ))}
                                <div className="mt-3 flex gap-2 border-t border-white/[0.04] pt-3">
                                  <button className="rounded-lg bg-purple-500 px-4 py-1.5 text-[11px] font-medium text-white v2-mono">save</button>
                                  <button onClick={() => setEditing(null)} className="rounded-lg bg-white/[0.04] px-4 py-1.5 text-[11px] text-white/30 v2-mono">cancel</button>
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

              {/* Preview */}
              <div className="lg:col-span-2">
                <div className="sticky top-20">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="v2-mono text-[10px] text-white/35">LIVE PREVIEW</p>
                    <div className="flex gap-0.5 rounded-md bg-white/[0.03] p-0.5">
                      {([['phone', Smartphone], ['tablet', Tablet], ['desktop', Monitor]] as const).map(([d, Icon]) => (
                        <button key={d} onClick={() => setDevice(d)}
                          className={`rounded p-1.5 transition-all ${device === d ? 'bg-white/[0.08] text-white/80' : 'text-white/15'}`}>
                          <Icon className="h-3 w-3" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-center rounded-2xl bg-navy-950 p-6">
                    <div className="v2-scan-line overflow-hidden border border-white/[0.08] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
                      style={{ width: dw, height: dh, borderRadius: device === 'phone' ? 24 : 12 }}>
                      <div className="flex h-full flex-col items-center justify-center p-5 text-center">
                        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 text-[11px] font-bold text-white">P</div>
                        {step === 0 && <><h3 className="mb-1 text-[13px] font-semibold text-gray-900">Verify your age</h3><p className="mb-4 text-[11px] text-gray-400">Quick check</p><div className="w-full rounded-lg bg-purple-500 py-2.5 text-[11px] font-medium text-white">Continue</div></>}
                        {step === 1 && <><div className="mb-2 h-12 w-12 rounded-full bg-gray-100" /><h3 className="mb-1 text-[13px] font-semibold text-gray-900">Quick scan</h3><div className="mt-3 w-full rounded-lg bg-purple-500 py-2.5 text-[11px] font-medium text-white">Camera</div></>}
                        {step === 2 && <><div className="mb-1 text-lg">⚠</div><h3 className="mb-1 text-[13px] font-semibold text-gray-900">Appeal</h3><div className="mt-3 w-full rounded-lg bg-purple-500 py-2.5 text-[11px] font-medium text-white">Submit</div></>}
                        {step === 3 && <><h3 className="mb-1 text-[13px] font-semibold text-gray-900">Parental consent</h3><div className="mt-3 w-full rounded-lg bg-purple-500 py-2.5 text-[11px] font-medium text-white">Send</div></>}
                        <p className="mt-2 v2-mono text-[7px] text-gray-300">COMPLIANCE.STUDIO</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-center gap-1">
                    <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="p-1 text-white/15 disabled:opacity-20"><ChevronLeft className="h-3.5 w-3.5" /></button>
                    {PREVIEW_STEPS.map((s, i) => (
                      <button key={s} onClick={() => setStep(i)} className={`v2-mono rounded px-2 py-0.5 text-[9px] ${i === step ? 'bg-purple-500/20 text-purple-400' : 'text-white/15'}`}>{s}</button>
                    ))}
                    <button onClick={() => setStep(Math.min(3, step + 1))} disabled={step === 3} className="p-1 text-white/15 disabled:opacity-20"><ChevronRight className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex items-center justify-between">
              <button onClick={() => navigate('/setup/brand')}
                className="v2-mono rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-3 text-[12px] text-white/30 transition-all hover:border-white/[0.12] hover:text-white/50">
                Back
              </button>
              <div className="flex gap-3">
                <button onClick={() => navigate('/products')}
                  className="v2-mono rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-3 text-[12px] text-white/25 transition-all hover:text-white/40">
                  save draft
                </button>
                <button className="v2-mono rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-3 text-[12px] text-white/25 transition-all hover:border-purple-500/20 hover:text-purple-400/60">
                  test first
                </button>
                <button onClick={handleLaunch} disabled={launching}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 px-8 py-3.5 text-[14px] font-semibold text-white transition-all hover:shadow-[0_0_30px_rgba(124,92,252,0.3)] disabled:opacity-70">
                  {launching ? (
                    <span className="flex items-center gap-2"><div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />deploying...</span>
                  ) : (
                    <><div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" /><span className="relative">Go Live</span></>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}
