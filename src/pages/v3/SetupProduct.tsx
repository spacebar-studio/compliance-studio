import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageWrapper } from '../../components/v3/Layout'
import { motion, AnimatePresence } from 'framer-motion'

type Step = 'name' | 'type' | 'audience'

const TYPES = [
  { id: 'game', label: 'Game' },
  { id: 'app', label: 'App' },
  { id: 'social', label: 'Social media' },
  { id: 'content', label: 'Content platform' },
]

const AUDIENCES = [
  { id: 'all', label: 'Everyone', desc: 'Including children under 13' },
  { id: 'teens', label: 'Teens and adults', desc: '13 and older' },
  { id: 'adults', label: 'Adults only', desc: '18 and older' },
]

const transition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }

export default function SetupProduct() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('name')
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [audience, setAudience] = useState('')

  function advance() {
    if (step === 'name' && name) setStep('type')
    else if (step === 'type' && type) setStep('audience')
    else if (step === 'audience' && audience) navigate('/setup/brand')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') advance()
  }

  return (
    <PageWrapper>
      <div className="flex min-h-screen items-center justify-center px-8">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {step === 'name' && (
              <motion.div key="name" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={transition}>
                <p className="mb-4 text-[13px] text-white/20">Step 1</p>
                <h1 className="mb-16 text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-white">
                  What's your product called?
                </h1>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Product name"
                  autoFocus
                  className="w-full border-b-2 border-white/10 bg-transparent pb-4 text-[28px] font-medium tracking-[-0.02em] text-white placeholder-white/10 outline-none transition-colors focus:border-white/30"
                />
                <div className="mt-16 flex items-center justify-between">
                  <p className="text-[13px] text-white/15">Press Enter ↵</p>
                  <button
                    onClick={advance}
                    disabled={!name}
                    className="rounded-full bg-white px-6 py-2.5 text-[14px] font-semibold text-navy-950 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-15"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'type' && (
              <motion.div key="type" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={transition}>
                <p className="mb-4 text-[13px] text-white/20">Step 1</p>
                <h1 className="mb-16 text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-white">
                  What kind of product is{' '}
                  <span className="text-white/40">{name}</span>?
                </h1>
                <div className="space-y-3">
                  {TYPES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { setType(t.id); setTimeout(advance, 200) }}
                      className={`block w-full rounded-2xl border px-7 py-6 text-left text-[17px] font-medium transition-all ${
                        type === t.id
                          ? 'border-white/20 bg-white/[0.06] text-white'
                          : 'border-white/[0.04] text-white/35 hover:border-white/10 hover:bg-white/[0.02] hover:text-white/60'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <div className="mt-14">
                  <button onClick={() => setStep('name')} className="text-[13px] text-white/20 hover:text-white/40">
                    ← Back
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'audience' && (
              <motion.div key="audience" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={transition}>
                <p className="mb-4 text-[13px] text-white/20">Step 1</p>
                <h1 className="mb-16 text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-white">
                  Who will use it?
                </h1>
                <div className="space-y-3">
                  {AUDIENCES.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => { setAudience(a.id); setTimeout(() => navigate('/setup/brand'), 300) }}
                      className={`block w-full rounded-2xl border px-7 py-6 text-left transition-all ${
                        audience === a.id
                          ? 'border-white/20 bg-white/[0.06]'
                          : 'border-white/[0.04] hover:border-white/10 hover:bg-white/[0.02]'
                      }`}
                    >
                      <p className={`text-[17px] font-medium ${audience === a.id ? 'text-white' : 'text-white/35 group-hover:text-white/60'}`}>
                        {a.label}
                      </p>
                      <p className="mt-1.5 text-[14px] text-white/15">{a.desc}</p>
                    </button>
                  ))}
                </div>
                <div className="mt-14">
                  <button onClick={() => setStep('type')} className="text-[13px] text-white/20 hover:text-white/40">
                    ← Back
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  )
}
