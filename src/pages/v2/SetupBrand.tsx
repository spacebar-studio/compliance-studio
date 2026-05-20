import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageWrapper } from '../../components/v2/Layout'
import { motion } from 'framer-motion'
import { Upload, Check, ChevronLeft, ChevronRight, Smartphone, Monitor, Tablet } from 'lucide-react'

const PALETTES = [
  { id: 'brand', label: 'Brand Match', primary: '#7C5CFC', secondary: '#22D3EE', bg: '#0A0918' },
  { id: 'ocean', label: 'Deep Ocean', primary: '#3B82F6', secondary: '#06B6D4', bg: '#0A1628' },
  { id: 'forest', label: 'Emerald', primary: '#10B981', secondary: '#34D399', bg: '#0A1812' },
  { id: 'sunset', label: 'Warm', primary: '#F97316', secondary: '#FB923C', bg: '#180F0A' },
]

const STEPS = ['Age Gate', 'Scan', 'Appeal', 'Consent']

export default function SetupBrand() {
  const navigate = useNavigate()
  const [uploaded, setUploaded] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [palette, setPalette] = useState(0)
  const [step, setStep] = useState(0)
  const [device, setDevice] = useState<'phone' | 'tablet' | 'desktop'>('phone')
  const [customize, setCustomize] = useState(false)

  const handleUpload = useCallback(() => {
    setUploaded(true)
    setGenerating(true)
    setTimeout(() => { setGenerating(false); setGenerated(true) }, 2000)
  }, [])

  const p = PALETTES[palette]
  const dw = device === 'phone' ? 260 : device === 'tablet' ? 360 : 440
  const dh = device === 'phone' ? 520 : device === 'tablet' ? 460 : 380

  return (
    <PageWrapper>
      <div className="v2-dotgrid relative min-h-screen">
        <div className="pointer-events-none absolute left-0 top-1/3 h-[400px] w-[400px] rounded-full bg-cyan-400/[0.03] blur-[100px]" />

        <div className="mx-auto max-w-6xl px-8 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>

            <div className="mb-10 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-400/10 text-2xl font-black text-white/90">
                2
              </span>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Brand your experience</h1>
                <p className="v2-mono text-[12px] text-white/40">drop your logo — we'll do the rest</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              {/* Left: Upload + palette */}
              <div className="space-y-6">
                <div
                  onClick={handleUpload}
                  className={`v2-grain group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 transition-all ${
                    uploaded
                      ? 'border-purple-500/30 bg-purple-500/[0.03]'
                      : 'border-white/[0.06] bg-white/[0.01] hover:border-white/[0.12]'
                  }`}
                >
                  {uploaded ? (
                    <div className="text-center">
                      <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 text-2xl font-bold text-white">
                        P
                      </div>
                      <p className="v2-mono text-[11px] text-purple-400">logo uploaded</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto mb-3 h-6 w-6 text-white/15 group-hover:text-white/25 transition-colors" />
                      <p className="text-[14px] font-medium text-white/30">Drop your logo here</p>
                      <p className="v2-mono text-[10px] text-white/30">PNG, SVG, JPG</p>
                    </div>
                  )}
                </div>

                {generating && (
                  <div className="flex items-center gap-3 rounded-2xl border border-white/[0.04] bg-white/[0.02] p-5">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
                    <div>
                      <p className="text-[13px] font-medium text-cyan-400/80">Generating theme...</p>
                      <p className="v2-mono text-[10px] text-white/35">analyzing brand colors</p>
                    </div>
                  </div>
                )}

                {generated && !generating && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div className="v2-grain rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                      <p className="v2-mono mb-4 text-[10px] font-semibold tracking-wide text-white/40">GENERATED THEMES</p>
                      <div className="grid grid-cols-2 gap-2">
                        {PALETTES.map((pl, i) => (
                          <button
                            key={pl.id}
                            onClick={() => setPalette(i)}
                            className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                              palette === i
                                ? 'border-purple-500/40 bg-purple-500/[0.06]'
                                : 'border-white/[0.04] hover:border-white/[0.08]'
                            }`}
                          >
                            <div className="flex -space-x-1.5">
                              <div className="h-5 w-5 rounded-full border-2 border-navy-900" style={{ backgroundColor: pl.primary }} />
                              <div className="h-5 w-5 rounded-full border-2 border-navy-900" style={{ backgroundColor: pl.secondary }} />
                            </div>
                            <span className="v2-mono text-[10px] text-white/45">{pl.label}</span>
                            {palette === i && <Check className="ml-auto h-3 w-3 text-purple-400" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setCustomize(!customize)}
                      className="v2-mono w-full rounded-2xl border border-white/[0.04] bg-white/[0.01] p-4 text-left text-[11px] text-white/40 transition-all hover:border-white/[0.08]"
                    >
                      {customize ? '− hide' : '+ customize'} manual overrides
                    </button>

                    {customize && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="v2-grain rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-4">
                        <div>
                          <label className="v2-mono mb-2 block text-[10px] text-white/35">PRIMARY</label>
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg" style={{ backgroundColor: p.primary }} />
                            <input defaultValue={p.primary} className="v2-mono flex-1 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[12px] text-white/60 outline-none focus:border-purple-500/40" />
                          </div>
                        </div>
                        <div>
                          <label className="v2-mono mb-2 block text-[10px] text-white/35">RADIUS</label>
                          <input type="range" min="0" max="24" defaultValue="16" className="w-full accent-purple-500" />
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Right: Preview */}
              <div className="flex flex-col items-center">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex gap-0.5 rounded-lg bg-white/[0.03] p-0.5">
                    {([['phone', Smartphone], ['tablet', Tablet], ['desktop', Monitor]] as const).map(([d, Icon]) => (
                      <button
                        key={d}
                        onClick={() => setDevice(d)}
                        className={`rounded-md p-2 transition-all ${device === d ? 'bg-white/[0.08] text-white/80' : 'text-white/20 hover:text-white/40'}`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex w-full items-center justify-center rounded-2xl bg-navy-950 p-10" style={{ minHeight: 580 }}>
                  <div
                    className="v2-scan-line overflow-hidden border border-white/[0.08] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all"
                    style={{ width: dw, height: dh, borderRadius: device === 'phone' ? 28 : device === 'tablet' ? 20 : 12 }}
                  >
                    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                      {generated ? (
                        <>
                          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold text-white"
                            style={{ background: `linear-gradient(135deg, ${p.primary}, ${p.secondary})` }}>
                            P
                          </div>
                          <PreviewContent step={step} primary={p.primary} />
                          <p className="mt-3 v2-mono text-[8px] text-gray-300/50">COMPLIANCE.STUDIO</p>
                        </>
                      ) : generating ? (
                        <div className="space-y-3 w-full">
                          <div className="shimmer mx-auto h-11 w-11 rounded-xl" />
                          <div className="shimmer mx-auto h-3 w-24 rounded" />
                          <div className="shimmer mx-auto h-2 w-32 rounded" />
                          <div className="shimmer mx-auto mt-4 h-10 w-full rounded-xl" />
                        </div>
                      ) : (
                        <p className="v2-mono text-[11px] text-gray-300">upload logo to preview</p>
                      )}
                    </div>
                  </div>
                </div>

                {generated && (
                  <div className="mt-4 flex items-center gap-1.5">
                    <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="p-1 text-white/20 disabled:opacity-20"><ChevronLeft className="h-4 w-4" /></button>
                    {STEPS.map((s, i) => (
                      <button key={s} onClick={() => setStep(i)}
                        className={`v2-mono rounded-md px-2.5 py-1 text-[10px] transition-all ${i === step ? 'bg-purple-500/20 text-purple-400' : 'text-white/20 hover:text-white/40'}`}
                      >{s}</button>
                    ))}
                    <button onClick={() => setStep(Math.min(3, step + 1))} disabled={step === 3} className="p-1 text-white/20 disabled:opacity-20"><ChevronRight className="h-4 w-4" /></button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12 flex justify-between">
              <button onClick={() => navigate('/setup')}
                className="v2-mono rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-3 text-[12px] text-white/30 transition-all hover:border-white/[0.12] hover:text-white/50">
                Back
              </button>
              <button onClick={() => navigate('/setup/review')} disabled={!generated}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 px-8 py-3.5 text-[14px] font-semibold text-white transition-all hover:shadow-[0_0_30px_rgba(124,92,252,0.3)] disabled:opacity-20">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative">Continue</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}

function PreviewContent({ step, primary }: { step: number; primary: string }) {
  if (step === 0) return (
    <>
      <h3 className="mb-1.5 text-[15px] font-semibold text-gray-900">Verify your age</h3>
      <p className="mb-6 text-[12px] text-gray-400">Quick check to continue</p>
      <button className="w-full rounded-xl py-3 text-[12px] font-semibold text-white" style={{ backgroundColor: primary }}>Continue</button>
    </>
  )
  if (step === 1) return (
    <>
      <div className="mb-3 h-16 w-16 rounded-full bg-gray-100" />
      <h3 className="mb-1.5 text-[15px] font-semibold text-gray-900">Quick scan</h3>
      <p className="mb-6 text-[12px] text-gray-400">Look at your camera briefly</p>
      <button className="w-full rounded-xl py-3 text-[12px] font-semibold text-white" style={{ backgroundColor: primary }}>Enable Camera</button>
    </>
  )
  if (step === 2) return (
    <>
      <div className="mb-3 text-2xl">⚠</div>
      <h3 className="mb-1.5 text-[15px] font-semibold text-gray-900">Appeal</h3>
      <p className="mb-6 text-[12px] text-gray-400">Upload ID to verify</p>
      <button className="w-full rounded-xl py-3 text-[12px] font-semibold text-white" style={{ backgroundColor: primary }}>Submit</button>
    </>
  )
  return (
    <>
      <h3 className="mb-1.5 text-[15px] font-semibold text-gray-900">Parental consent</h3>
      <p className="mb-6 text-[12px] text-gray-400">A parent must approve</p>
      <button className="w-full rounded-xl py-3 text-[12px] font-semibold text-white" style={{ backgroundColor: primary }}>Send Request</button>
    </>
  )
}
