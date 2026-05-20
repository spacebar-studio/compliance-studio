import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageWrapper } from '../../components/v2/Layout'
import { motion, AnimatePresence } from 'framer-motion'

const TYPES = [
  { id: 'game', label: 'Game', glyph: '◆' },
  { id: 'app', label: 'App', glyph: '◇' },
  { id: 'social', label: 'Social', glyph: '○' },
  { id: 'content', label: 'Content', glyph: '□' },
  { id: 'other', label: 'Other', glyph: '△' },
]

const PLATFORMS = [
  { id: 'ios', label: 'iOS' },
  { id: 'android', label: 'Android' },
  { id: 'web', label: 'Web' },
  { id: 'multi', label: 'Multi' },
]

const AUDIENCES = [
  { id: 'all', label: 'All ages', sub: 'Kids, teens, adults' },
  { id: 'teens', label: '13+', sub: 'No children under 13' },
  { id: 'adults', label: '18+', sub: 'Adults only' },
  { id: 'unsure', label: 'Not sure', sub: "We'll figure it out" },
]

export default function SetupProduct() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [platform, setPlatform] = useState('')
  const [audience, setAudience] = useState('')
  const [showGuide, setShowGuide] = useState(false)

  const isValid = name && type && platform && audience

  return (
    <PageWrapper>
      <div className="v2-dotgrid relative min-h-screen">
        <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-purple-500/[0.04] blur-[100px]" />

        <div className="mx-auto max-w-2xl px-8 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>

            {/* Step indicator */}
            <div className="mb-10 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-400/10 text-2xl font-black text-white/90">
                1
              </span>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Tell us about your product</h1>
                <p className="v2-mono text-[12px] text-white/40">we'll handle the compliance setup</p>
              </div>
            </div>

            <div className="space-y-10">
              {/* Name */}
              <div>
                <label className="v2-mono mb-3 block text-[11px] font-medium tracking-wide text-white/40">PRODUCT NAME</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Pixel Quest"
                  className="v2-grain w-full rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-[15px] text-white placeholder-white/15 outline-none transition-all focus:border-purple-500/40 focus:shadow-[0_0_0_4px_rgba(124,92,252,0.08)]"
                />
              </div>

              {/* Type */}
              <div>
                <label className="v2-mono mb-3 block text-[11px] font-medium tracking-wide text-white/40">WHAT ARE YOU BUILDING</label>
                <div className="flex gap-2">
                  {TYPES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setType(t.id)}
                      className={`group flex flex-1 flex-col items-center gap-2 rounded-2xl border py-5 transition-all ${
                        type === t.id
                          ? 'border-purple-500/40 bg-purple-500/[0.08] shadow-[0_0_20px_rgba(124,92,252,0.1)]'
                          : 'border-white/[0.04] bg-white/[0.015] hover:border-white/[0.08] hover:bg-white/[0.03]'
                      }`}
                    >
                      <span className={`text-lg transition-colors ${type === t.id ? 'text-purple-400' : 'text-white/15'}`}>
                        {t.glyph}
                      </span>
                      <span className={`v2-mono text-[11px] transition-colors ${type === t.id ? 'text-purple-400' : 'text-white/45'}`}>
                        {t.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform */}
              <div>
                <label className="v2-mono mb-3 block text-[11px] font-medium tracking-wide text-white/40">PLATFORM</label>
                <div className="flex gap-2">
                  {PLATFORMS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPlatform(p.id)}
                      className={`flex-1 rounded-2xl border py-4 transition-all v2-mono text-[12px] ${
                        platform === p.id
                          ? 'border-purple-500/40 bg-purple-500/[0.08] text-purple-400'
                          : 'border-white/[0.04] bg-white/[0.015] text-white/40 hover:border-white/[0.08] hover:text-white/55'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Audience */}
              <div>
                <label className="v2-mono mb-3 block text-[11px] font-medium tracking-wide text-white/40">AUDIENCE</label>
                <div className="grid grid-cols-2 gap-2">
                  {AUDIENCES.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => {
                        setAudience(a.id)
                        setShowGuide(a.id === 'unsure')
                      }}
                      className={`rounded-2xl border px-5 py-4 text-left transition-all ${
                        audience === a.id
                          ? 'border-purple-500/40 bg-purple-500/[0.08]'
                          : 'border-white/[0.04] bg-white/[0.015] hover:border-white/[0.08]'
                      }`}
                    >
                      <p className={`text-[14px] font-semibold ${audience === a.id ? 'text-purple-400' : 'text-white/55'}`}>
                        {a.label}
                      </p>
                      <p className="v2-mono text-[10px] text-white/35">{a.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Guided flow */}
              <AnimatePresence>
                {showGuide && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="v2-grain rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.02] p-6">
                      <p className="v2-mono mb-5 text-[11px] font-semibold text-cyan-400/80">GUIDED SETUP</p>
                      <div className="space-y-4">
                        <GuideQuestion q="Will users under 13 access your product?" opts={['Yes', 'No', 'Maybe']} />
                        <GuideQuestion q="Does your product collect personal data?" opts={['Yes', 'No', 'Unsure']} />
                        <GuideQuestion q="Available in the EU?" opts={['Yes', 'No', 'Planning']} />
                      </div>
                      <div className="mt-5 rounded-xl bg-white/[0.02] border border-white/[0.04] p-4">
                        <p className="text-[13px] text-white/40">
                          Recommended: <span className="font-semibold text-cyan-400/70">Full compliance coverage</span> — age assurance + parental consent
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* URL */}
              <div>
                <label className="v2-mono mb-3 block text-[11px] font-medium tracking-wide text-white/25">
                  APP URL <span className="text-white/25">— optional</span>
                </label>
                <input
                  type="url"
                  placeholder="https://"
                  className="v2-grain w-full rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-[15px] text-white placeholder-white/15 outline-none transition-all focus:border-purple-500/40 focus:shadow-[0_0_0_4px_rgba(124,92,252,0.08)]"
                />
              </div>
            </div>

            {/* Continue */}
            <div className="mt-12 flex justify-end">
              <button
                onClick={() => isValid && navigate('/setup/brand')}
                disabled={!isValid}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 px-8 py-3.5 text-[14px] font-semibold text-white transition-all hover:shadow-[0_0_30px_rgba(124,92,252,0.3)] disabled:opacity-20 disabled:hover:shadow-none"
              >
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

function GuideQuestion({ q, opts }: { q: string; opts: string[] }) {
  const [selected, setSelected] = useState('')
  return (
    <div>
      <p className="mb-2 text-[13px] text-white/40">{q}</p>
      <div className="flex gap-2">
        {opts.map((o) => (
          <button
            key={o}
            onClick={() => setSelected(o)}
            className={`rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all v2-mono ${
              selected === o
                ? 'bg-cyan-400/20 text-cyan-400'
                : 'bg-white/[0.03] text-white/25 hover:text-white/40'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}
