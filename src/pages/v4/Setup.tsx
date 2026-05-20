import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles, Check, ChevronDown, Smartphone, Tablet, Monitor, Sun, Moon, RotateCcw, Globe, Shield, Users, Lock, Eye } from 'lucide-react'

type Phase = 'input' | 'analyzing' | 'ready'
type Platform = 'mobile' | 'desktop' | 'tablet'
type Orientation = 'portrait' | 'landscape'
type Mode = 'light' | 'dark'
type Lang = 'en' | 'es' | 'zh'
type ScreenView = 'overview' | 'methods'

const THEMES = [
  { name: 'Standard', primary: '#7C5CFC', accent: '#C4B5FD', dot: '#7C5CFC' },
  { name: 'Minimal', primary: '#374151', accent: '#D1D5DB', dot: '#9CA3AF' },
  { name: 'Playful', primary: '#E040A0', accent: '#FFB6D9', dot: '#E040A0' },
  { name: 'Immersive', primary: '#059669', accent: '#6EE7B7', dot: '#059669' },
  { name: 'Compact', primary: '#6366F1', accent: '#A5B4FC', dot: '#6366F1' },
]

const T = {
  en: {
    verifyChild: "Verify your child's age", childDesc: 'Your child wants to access age-restricted content in this app',
    verifyAge: 'Verify your age', ageDesc: 'A quick check to keep playing safely',
    begin: 'Begin Verification', parentCode: 'I have a parent code',
    step1: 'Confirm your identity', step2: "Verify you're an adult", steps: 'Steps to complete',
    faceScan: 'Face scan', faceScanDesc: 'Quick face scan to verify your age',
    selfie: 'Selfie check', selfieDesc: 'Take a photo for age estimation',
    idUpload: 'ID upload', idUploadDesc: 'Upload a government-issued ID',
    instant: 'Instant', sec30: '~30s', min2: '~2 min',
    privacy: "We're committed to your privacy",
    p1: 'Photos deleted immediately', p2: 'We never share your data', p3: 'End-to-end encryption',
    recommended: 'Recommended', powered: 'Powered by', cont: 'Continue', verified: 'Verified',
  },
  es: {
    verifyChild: 'Verifica la edad de tu hijo', childDesc: 'Tu hijo quiere acceder a contenido restringido',
    verifyAge: 'Verifica tu edad', ageDesc: 'Una verificación rápida para seguir jugando',
    begin: 'Comenzar', parentCode: 'Tengo un código',
    step1: 'Confirma tu identidad', step2: 'Verifica que eres adulto', steps: 'Pasos a completar',
    faceScan: 'Escaneo facial', faceScanDesc: 'Escaneo facial para verificar tu edad',
    selfie: 'Selfie', selfieDesc: 'Toma una foto para estimar tu edad',
    idUpload: 'Subir ID', idUploadDesc: 'Sube un documento de identidad',
    instant: 'Instantáneo', sec30: '~30s', min2: '~2 min',
    privacy: 'Protegemos tu privacidad',
    p1: 'Fotos eliminadas al instante', p2: 'Nunca compartimos datos', p3: 'Cifrado extremo a extremo',
    recommended: 'Recomendado', powered: 'Desarrollado por', cont: 'Continuar', verified: 'Verificado',
  },
  zh: {
    verifyChild: '验证您孩子的年龄', childDesc: '您的孩子想访问年龄限制内容',
    verifyAge: '验证您的年龄', ageDesc: '快速检查以安全继续游戏',
    begin: '开始验证', parentCode: '我有家长密码',
    step1: '确认您的身份', step2: '验证您是成人', steps: '完成步骤',
    faceScan: '面部扫描', faceScanDesc: '快速面部扫描验证年龄',
    selfie: '自拍验证', selfieDesc: '拍照进行年龄估算',
    idUpload: '上传证件', idUploadDesc: '上传政府身份证件',
    instant: '即时', sec30: '~30秒', min2: '~2分钟',
    privacy: '我们保护您的隐私',
    p1: '照片立即删除', p2: '绝不共享数据', p3: '端到端加密',
    recommended: '推荐', powered: '技术支持', cont: '继续', verified: '已验证',
  },
}

const SECTIONS = [
  {
    id: 'product',
    title: 'Your Product',
    items: [
      { label: 'Name', value: 'Crazy Cat' },
      { label: 'Type', value: 'Mobile Game' },
      { label: 'Genre', value: 'Casual / Puzzle' },
      { label: 'Platforms', value: 'iOS, Android' },
      { label: 'Developer', value: 'Crazy Cat Studios' },
      { label: 'App Store', value: 'Available in 42 countries' },
    ],
    summary: 'A casual puzzle game for all ages, available on iOS and Android across 42 countries.',
  },
  {
    id: 'safety',
    title: 'Safety & Compliance',
    items: [
      { label: 'Audience', value: 'Ages 4+ (children under 13 present)' },
      { label: 'Regions', value: 'United States, EU, United Kingdom' },
      { label: 'Regulations', value: 'COPPA, GDPR-K, UK AADC' },
      { label: 'Data collected', value: 'Username, gameplay progress, device ID' },
      { label: 'Risk level', value: 'High — children under 13 have access' },
    ],
    summary: 'High-risk profile due to under-13 audience. Must comply with COPPA, GDPR-K, and UK Age Appropriate Design Code.',
  },
  {
    id: 'config',
    title: 'Configuration',
    items: [
      { label: 'Age verification', value: 'Facial estimation at 85% confidence' },
      { label: 'Parental consent', value: 'Email + ID verification, 365-day expiry' },
      { label: 'Age appeal', value: '24-hour window, ID document upload' },
      { label: 'Data privacy', value: 'Enhanced child protection enabled' },
      { label: 'Content filtering', value: 'Safe mode enforced for under-13' },
    ],
    summary: 'Full compliance stack enabled — age verification, parental consent, appeal flow, and enhanced child data protection.',
  },
]

const ease = [0.16, 1, 0.3, 1] as const

export default function Setup() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const demo = searchParams.get('demo')
  const demoEdit = searchParams.get('edit')
  const demoScreen = searchParams.get('screen')

  const [url, setUrl] = useState(demo === 'ready' ? 'https://crazycat.game' : '')
  const [phase, setPhase] = useState<Phase>(demo === 'ready' ? 'ready' : 'input')
  const [activeSection, setActiveSection] = useState<number>(demoEdit !== null ? Number(demoEdit) : 0)
  const [editing, setEditing] = useState<number | null>(demoEdit !== null ? Number(demoEdit) : null)
  const [themeIndex, setThemeIndex] = useState(0)
  const [platform, setPlatform] = useState<Platform>('mobile')
  const [orientation, setOrientation] = useState<Orientation>('portrait')
  const [mode, setMode] = useState<Mode>('light')
  const [lang, setLang] = useState<Lang>('en')
  const [launching, setLaunching] = useState(false)
  const [screen, setScreen] = useState<ScreenView>(demoScreen === 'methods' ? 'methods' : 'overview')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return
    setPhase('analyzing')
    setTimeout(() => setPhase('ready'), 2800)
  }

  function handleLaunch() {
    setLaunching(true)
    setTimeout(() => navigate('/setup/success'), 1600)
  }

  const theme = THEMES[themeIndex]
  const t = T[lang]
  const isEditing = editing !== null

  return (
    <div className="flex min-h-screen flex-col bg-navy-950">
      {/* Top bar */}
      <header className="relative z-20 flex h-16 shrink-0 items-center gap-8 border-b border-white/[0.04] px-8">
        <span className="shrink-0 text-[13px] font-semibold text-white/50">Compliance Studio</span>

        <div className="flex flex-1 justify-center">
          <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
            <AnimatePresence mode="wait">
              {phase === 'input' ? (
                <motion.div key="input" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                  <div className="flex items-center gap-3 rounded-full border border-white/[0.06] bg-white/[0.03] px-5 py-2.5">
                    <Search className="h-4 w-4 shrink-0 text-white/20" />
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onFocus={() => { if (!url) setUrl('https://crazycat.game') }}
                      placeholder="Enter your product or app URL..."
                      autoFocus
                      className="flex-1 bg-transparent text-[14px] text-white placeholder-white/20 outline-none"
                    />
                    <button type="submit" disabled={!url.trim()} className="shrink-0 rounded-full bg-white/10 px-4 py-1.5 text-[12px] font-medium text-white/60 transition-all hover:bg-white/15 disabled:opacity-30">
                      Analyze
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="loaded" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}>
                  <div className="flex items-center gap-3 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 text-[11px] font-bold text-white">
                      C
                    </div>
                    <span className="text-[14px] font-medium text-white/70">Crazy Cat</span>
                    <div className="mx-2 h-4 w-px bg-white/[0.06]" />
                    <span className="flex-1 truncate text-[13px] text-white/25">{url}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {phase === 'analyzing' && (
              <motion.div
                className="absolute inset-x-0 -bottom-px h-px overflow-hidden rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="h-full w-1/3 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                  animate={{ x: ['-100%', '400%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            )}
          </form>
        </div>

        <div className="w-[160px]" />
      </header>

      {/* Main layout — always visible */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel — sections */}
        <div className="w-[400px] shrink-0 overflow-y-auto border-r border-white/[0.04] px-8 py-8">
          {phase === 'ready' ? (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease }}>
              <div className="mb-8 flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-purple-400/60" />
                <p className="text-[13px] text-white/30">AI Analysis Complete</p>
              </div>

                <div className="space-y-3">
                  {SECTIONS.map((section, i) => {
                    const isActive = activeSection === i
                    const isSectionEditing = editing === i
                    return (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease }}
                      >
                        <div
                          className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                            isActive
                              ? 'border-white/[0.08] bg-white/[0.03]'
                              : 'border-white/[0.04] bg-white/[0.015] hover:border-white/[0.06] hover:bg-white/[0.025]'
                          }`}
                        >
                          <button
                            onClick={() => { if (!isSectionEditing) { setActiveSection(i); setEditing(null) } }}
                            className="flex w-full items-center gap-4 px-5 py-4 text-left"
                          >
                            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[13px] font-semibold transition-colors ${
                              isActive ? 'bg-purple-500/15 text-purple-400' : 'bg-white/[0.04] text-white/25'
                            }`}>
                              {i + 1}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className={`text-[14px] font-medium transition-colors ${isActive ? 'text-white/80' : 'text-white/45'}`}>
                                {section.title}
                              </p>
                              {!isActive && (
                                <p className="mt-0.5 truncate text-[12px] text-white/20">{section.summary}</p>
                              )}
                            </div>
                            <ChevronDown className={`h-4 w-4 shrink-0 text-white/15 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
                          </button>

                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease }}
                              >
                                <div className="border-t border-white/[0.04] px-5 pb-5 pt-4">
                                  <p className="mb-5 text-[13px] leading-relaxed text-white/30">
                                    {section.summary}
                                  </p>

                                  <div className="space-y-3">
                                    {section.items.map((item) => (
                                      <div key={item.label} className="flex items-start justify-between gap-4">
                                        <span className="shrink-0 text-[12px] text-white/20">{item.label}</span>
                                        <span className="text-right text-[12px] text-white/50">{item.value}</span>
                                      </div>
                                    ))}
                                  </div>

                                  {isSectionEditing ? (
                                    <div className="mt-6 flex items-center gap-3">
                                      <button onClick={() => setEditing(null)} className="rounded-full px-4 py-2 text-[12px] text-white/25 transition-colors hover:text-white/45">
                                        Cancel
                                      </button>
                                      <button onClick={() => setEditing(null)} className="rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-navy-950 transition-all hover:scale-[1.02] active:scale-[0.98]">
                                        Save
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => setEditing(i)}
                                      className="mt-5 rounded-full bg-white/[0.06] px-4 py-2 text-[12px] font-medium text-white/50 transition-all hover:bg-white/[0.1] hover:text-white/70"
                                    >
                                      Edit details
                                    </button>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Go Live */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5, ease }}
                  className="mt-8"
                >
                  <button
                    onClick={handleLaunch}
                    disabled={launching}
                    className="w-full rounded-full bg-white py-3 text-[14px] font-semibold text-navy-950 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                  >
                    {launching ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-navy-950 border-t-transparent" />
                        Going live…
                      </span>
                    ) : 'Go live'}
                  </button>
                </motion.div>
              </motion.div>
          ) : (
            <EmptyLeftPanel analyzing={phase === 'analyzing'} />
          )}
        </div>

        {/* Right area — preview, edit form, or empty */}
        <div className="relative flex flex-1 flex-col">
          {phase === 'ready' ? (
            <AnimatePresence mode="wait">
              {isEditing ? (
                <EditPanel key="edit" section={SECTIONS[editing]} onDone={() => setEditing(null)} />
              ) : (
                <PreviewPanel
                  key="preview"
                  theme={theme}
                  themeIndex={themeIndex}
                  setThemeIndex={setThemeIndex}
                  platform={platform}
                  setPlatform={setPlatform}
                  orientation={orientation}
                  setOrientation={setOrientation}
                  mode={mode}
                  setMode={setMode}
                  lang={lang}
                  setLang={setLang}
                  t={t}
                  screen={screen}
                  setScreen={setScreen}
                />
              )}
            </AnimatePresence>
          ) : (
            <EmptyRightPanel analyzing={phase === 'analyzing'} />
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Empty States ────────────────────────────────── */

function EmptyLeftPanel({ analyzing }: { analyzing: boolean }) {
  return (
    <div className="space-y-6">
      {analyzing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-2 flex items-center gap-3">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
            <Sparkles className="h-4 w-4 text-purple-400/60" />
          </motion.div>
          <p className="text-[13px] text-white/30">Analyzing your product...</p>
        </motion.div>
      )}
      {!analyzing && (
        <div className="mb-2">
          <p className="text-[13px] text-white/20">Enter a URL above to get started</p>
        </div>
      )}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`rounded-2xl border border-white/[0.04] bg-white/[0.015] p-5 transition-all ${analyzing ? 'animate-pulse' : ''}`}
        >
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-xl bg-white/[0.04]" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-28 rounded-full bg-white/[0.06]" />
              <div className="h-2.5 w-44 rounded-full bg-white/[0.03]" />
            </div>
          </div>
          {i === 0 && (
            <div className="mt-5 space-y-3 border-t border-white/[0.04] pt-4">
              {[0, 1, 2, 3].map((j) => (
                <div key={j} className="flex items-center justify-between">
                  <div className="h-2 rounded-full bg-white/[0.04]" style={{ width: 60 + j * 12 }} />
                  <div className="h-2 rounded-full bg-white/[0.04]" style={{ width: 80 - j * 8 }} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="rounded-full bg-white/[0.03] py-3">
        <div className="mx-auto h-3 w-16 rounded-full bg-white/[0.04]" />
      </div>
    </div>
  )
}

function EmptyRightPanel({ analyzing }: { analyzing: boolean }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8">
      {/* Empty screen toggle */}
      <div className="flex gap-1 rounded-xl border border-white/[0.04] bg-white/[0.02] p-1">
        <div className="rounded-lg bg-white/[0.04] px-3.5 py-1.5">
          <div className="h-2.5 w-24 rounded-full bg-white/[0.06]" />
        </div>
        <div className="rounded-lg px-3.5 py-1.5">
          <div className="h-2.5 w-24 rounded-full bg-white/[0.03]" />
        </div>
      </div>

      {/* Empty device frame */}
      <div className="flex items-center gap-6">
        <div
          className={`flex flex-col items-center justify-center overflow-hidden rounded-[36px] border border-white/[0.06] bg-white/[0.02] shadow-[0_25px_80px_rgba(0,0,0,0.3)] ${analyzing ? 'animate-pulse' : ''}`}
          style={{ width: 280, height: 560 }}
        >
          {analyzing ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                <Sparkles className="h-6 w-6 text-purple-400/40" />
              </motion.div>
              <p className="mt-4 text-[12px] text-white/20">Building preview...</p>
            </motion.div>
          ) : (
            <>
              <div className="mb-5 h-10 w-10 rounded-xl bg-white/[0.04]" />
              <div className="mb-3 h-3 w-32 rounded-full bg-white/[0.05]" />
              <div className="mb-8 h-2.5 w-44 rounded-full bg-white/[0.03]" />
              <div className="space-y-3 px-8 w-full">
                <div className="h-10 w-full rounded-xl bg-white/[0.03]" />
                <div className="h-10 w-full rounded-xl bg-white/[0.025]" />
              </div>
              <div className="mt-8 h-9 w-36 rounded-full bg-white/[0.04]" />
            </>
          )}
        </div>

        {/* Empty variation dots */}
        <div className="flex flex-col items-center gap-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 w-4 rounded-full bg-white/[0.06]" />
          ))}
        </div>
      </div>

      {/* Empty config bar */}
      <div className="flex items-center gap-2 self-end">
        {[3, 2, 2, 3].map((count, gi) => (
          <div key={gi} className="flex rounded-xl border border-white/[0.04] bg-white/[0.02] p-0.5">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="flex h-8 w-8 items-center justify-center">
                <div className="h-3.5 w-3.5 rounded bg-white/[0.04]" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Preview Panel ────────────────────────────────── */

function PreviewPanel({
  theme, themeIndex, setThemeIndex,
  platform, setPlatform,
  orientation, setOrientation,
  mode, setMode,
  lang, setLang,
  t, screen, setScreen,
}: {
  theme: typeof THEMES[0]
  themeIndex: number
  setThemeIndex: (i: number) => void
  platform: Platform
  setPlatform: (p: Platform) => void
  orientation: Orientation
  setOrientation: (o: Orientation) => void
  mode: Mode
  setMode: (m: Mode) => void
  lang: Lang
  setLang: (l: Lang) => void
  t: typeof T['en']
  screen: ScreenView
  setScreen: (s: ScreenView) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease }}
      className="flex flex-1 flex-col"
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8">
        {/* Screen toggle */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }} className="relative -left-[20px] flex gap-1 rounded-xl border border-white/[0.04] bg-white/[0.02] p-1">
          <button onClick={() => setScreen('overview')} className={`rounded-lg px-3.5 py-1.5 text-[11px] font-medium transition-all ${screen === 'overview' ? 'bg-white/[0.08] text-white/70' : 'text-white/25 hover:text-white/40'}`}>
            Parental Consent
          </button>
          <button onClick={() => setScreen('methods')} className={`rounded-lg px-3.5 py-1.5 text-[11px] font-medium transition-all ${screen === 'methods' ? 'bg-white/[0.08] text-white/70' : 'text-white/25 hover:text-white/40'}`}>
            Age Verification
          </button>
        </motion.div>

        <div className="flex items-center gap-6">
          <DeviceFrame platform={platform} orientation={orientation} mode={mode} theme={theme} themeIndex={themeIndex} t={t} screen={screen} />

          {/* Variation dots */}
          <div className="flex flex-col items-center gap-3">
            {THEMES.map((th, i) => (
              <motion.button
                key={th.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                onClick={() => setThemeIndex(i)}
                className="group relative"
                title={th.name}
              >
                <div
                  className={`h-4 w-4 rounded-full transition-all duration-300 ${
                    i === themeIndex ? 'scale-125 ring-2 ring-white/20 ring-offset-2 ring-offset-navy-950' : 'opacity-40 hover:opacity-70 hover:scale-110'
                  }`}
                  style={{ backgroundColor: th.dot }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Config bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4, ease }}
        className="flex items-center justify-end gap-2 px-8 pb-6"
      >
        <ConfigGroup>
          <ConfigBtn active={platform === 'mobile'} onClick={() => setPlatform('mobile')} title="Mobile"><Smartphone className="h-3.5 w-3.5" /></ConfigBtn>
          <ConfigBtn active={platform === 'tablet'} onClick={() => setPlatform('tablet')} title="Tablet"><Tablet className="h-3.5 w-3.5" /></ConfigBtn>
          <ConfigBtn active={platform === 'desktop'} onClick={() => setPlatform('desktop')} title="Desktop"><Monitor className="h-3.5 w-3.5" /></ConfigBtn>
        </ConfigGroup>
        <AnimatePresence>
          {platform === 'mobile' && (
            <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.2 }}>
              <ConfigGroup>
                <ConfigBtn active={orientation === 'portrait'} onClick={() => setOrientation('portrait')} title="Portrait">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 14 18" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="12" height="16" rx="2" /></svg>
                </ConfigBtn>
                <ConfigBtn active={orientation === 'landscape'} onClick={() => setOrientation('landscape')} title="Landscape"><RotateCcw className="h-3.5 w-3.5" /></ConfigBtn>
              </ConfigGroup>
            </motion.div>
          )}
        </AnimatePresence>
        <ConfigGroup>
          <ConfigBtn active={mode === 'light'} onClick={() => setMode('light')} title="Light"><Sun className="h-3.5 w-3.5" /></ConfigBtn>
          <ConfigBtn active={mode === 'dark'} onClick={() => setMode('dark')} title="Dark"><Moon className="h-3.5 w-3.5" /></ConfigBtn>
        </ConfigGroup>
        <ConfigGroup>
          <ConfigBtn active={lang === 'en'} onClick={() => setLang('en')} title="English"><span className="text-[10px] font-semibold">EN</span></ConfigBtn>
          <ConfigBtn active={lang === 'es'} onClick={() => setLang('es')} title="Spanish"><span className="text-[10px] font-semibold">ES</span></ConfigBtn>
          <ConfigBtn active={lang === 'zh'} onClick={() => setLang('zh')} title="Chinese"><span className="text-[10px] font-semibold">中</span></ConfigBtn>
        </ConfigGroup>
      </motion.div>
    </motion.div>
  )
}

/* ─── Device Frame ─────────────────────────────────── */

function DeviceFrame({ platform, orientation, mode, theme, themeIndex, t, screen }: {
  platform: Platform; orientation: Orientation; mode: Mode; theme: typeof THEMES[0]; themeIndex: number; t: typeof T['en']; screen: ScreenView
}) {
  const isLandscape = platform === 'mobile' && orientation === 'landscape'
  const dims = platform === 'mobile'
    ? isLandscape ? { w: 480, h: 260 } : { w: 280, h: 560 }
    : platform === 'tablet' ? { w: 380, h: 500 } : { w: 540, h: 360 }
  const radius = platform === 'mobile' ? 36 : platform === 'tablet' ? 20 : 12
  const dk = mode === 'dark'
  const bg = dk ? '#111118' : '#FFFFFF'
  const sub = dk ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'
  const bd = dk ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'

  return (
    <motion.div layout animate={{ y: [0, -4, 0] }} transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }, layout: { duration: 0.4, ease } }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${platform}-${orientation}-${themeIndex}-${mode}-${screen}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease }}
          className="overflow-hidden border shadow-[0_25px_80px_rgba(0,0,0,0.4)]"
          style={{ width: dims.w, height: dims.h, borderRadius: radius, backgroundColor: bg, borderColor: bd }}
        >
          {platform !== 'desktop' && !isLandscape && (
            <div className="flex items-center justify-between px-6 pt-2" style={{ color: sub }}>
              <span style={{ fontSize: 10, fontWeight: 500 }}>9:41</span>
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: sub }} />
                <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: sub }} />
                <div className="h-1.5 w-3 rounded-full" style={{ backgroundColor: sub }} />
              </div>
            </div>
          )}
          {platform === 'desktop' && (
            <div className="flex items-center gap-2 border-b px-4 py-2" style={{ borderColor: bd }}>
              <div className="flex gap-1.5">
                {[0, 1, 2].map(i => <div key={i} className="h-2 w-2 rounded-full" style={{ backgroundColor: dk ? 'rgba(255,255,255,0.1)' : '#E4E4E4' }} />)}
              </div>
              <div className="flex-1 rounded px-3 py-0.5 text-center" style={{ fontSize: 9, color: sub, backgroundColor: dk ? 'rgba(255,255,255,0.04)' : '#F5F5F5' }}>crazycat.game/verify</div>
            </div>
          )}
          <div style={{ overflow: 'hidden', height: platform === 'desktop' ? 'calc(100% - 32px)' : isLandscape ? '100%' : 'calc(100% - 22px)' }}>
            {screen === 'overview'
              ? <OverviewContent v={themeIndex} dk={dk} t={t} p={theme.primary} a={theme.accent} />
              : <MethodsContent v={themeIndex} dk={dk} t={t} p={theme.primary} a={theme.accent} />}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Screen Content ──────────────────────────────── */

type SP = { v: number; dk: boolean; t: typeof T['en']; p: string; a: string }

function OverviewContent({ v, dk, t, p, a }: SP) {
  const tx = dk ? '#FFF' : '#111'
  const sb = dk ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)'
  const dm = dk ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
  const sf = dk ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'
  const bd = dk ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const bg = dk ? '#111118' : '#FFF'

  if (v === 0) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 80, background: 'linear-gradient(135deg, #FFB347, #FF6B35, #E24A00)', flexShrink: 0, position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: -16, left: '50%', transform: 'translateX(-50%)', width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #FF8A50, #FF6B35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#FFF', border: `2px solid ${bg}`, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>C</div>
      </div>
      <div style={{ textAlign: 'center', padding: '24px 20px 8px' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: tx }}>Crazy Cat</p>
        <p style={{ fontSize: 9, color: dm, marginTop: 2 }}>Crazy Cat Studios</p>
      </div>
      <div style={{ margin: '8px 20px', padding: '8px 10px', borderRadius: 10, backgroundColor: sf, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 22, height: 22, borderRadius: 11, background: p, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#FFF', fontWeight: 700 }}>13</div>
        <div><p style={{ fontSize: 9, fontWeight: 600, color: tx }}>13 years old</p><p style={{ fontSize: 7, color: dm }}>{t.verified}</p></div>
      </div>
      <div style={{ padding: '12px 20px', flex: 1 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: tx, marginBottom: 4 }}>{t.verifyChild}</p>
        <p style={{ fontSize: 9, color: sb, marginBottom: 14, lineHeight: 1.4 }}>{t.childDesc}</p>
        <p style={{ fontSize: 8, color: dm, marginBottom: 8, textTransform: 'uppercase' as const, letterSpacing: 0.5 }}>{t.steps}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: `${p}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 6, height: 6, borderRadius: 2, backgroundColor: p }} /></div>
          <span style={{ fontSize: 10, color: tx }}>{t.step1}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 14, height: 14, borderRadius: 3, border: `1px solid ${bd}` }} />
          <span style={{ fontSize: 10, color: sb }}>{t.step2}</span>
        </div>
      </div>
      <div style={{ padding: '0 20px 12px', flexShrink: 0 }}>
        <div style={{ padding: '10px 0', borderRadius: 12, backgroundColor: p, textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#FFF' }}>{t.begin}</div>
        <p style={{ textAlign: 'center', fontSize: 9, color: dm, marginTop: 10 }}>{t.parentCode}</p>
      </div>
      <div style={{ textAlign: 'center', padding: '0 0 12px', flexShrink: 0 }}><span style={{ fontSize: 7, color: dm }}>{t.powered} <strong style={{ color: sb }}>k-id</strong></span></div>
    </div>
  )

  if (v === 1) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '24px 24px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
        <div style={{ width: 24, height: 24, borderRadius: 6, background: 'linear-gradient(135deg, #FF8A50, #FF6B35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#FFF' }}>C</div>
        <span style={{ fontSize: 11, fontWeight: 500, color: sb }}>Crazy Cat</span>
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: tx, lineHeight: 1.15, marginBottom: 8, letterSpacing: -0.5 }}>{t.verifyChild}</h2>
      <p style={{ fontSize: 11, color: sb, lineHeight: 1.5, marginBottom: 32 }}>{t.childDesc}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `1px solid ${bd}` }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: p }}>1</span>
        <span style={{ fontSize: 12, color: tx }}>{t.step1}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: dm }}>2</span>
        <span style={{ fontSize: 12, color: sb }}>{t.step2}</span>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <div style={{ padding: '12px 0', borderRadius: 8, backgroundColor: tx, textAlign: 'center', fontSize: 12, fontWeight: 600, color: bg }}>{t.begin}</div>
        <p style={{ textAlign: 'center', fontSize: 9, color: dm, marginTop: 12 }}>{t.parentCode}</p>
      </div>
    </div>
  )

  if (v === 2) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '20px 20px 16px', background: dk ? undefined : `linear-gradient(180deg, ${p}08, transparent 60%)` }}>
      <div style={{ width: 56, height: 56, borderRadius: 28, background: 'linear-gradient(135deg, #FFB347, #FF6B35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: '#FFF', marginBottom: 12, boxShadow: `0 8px 24px ${p}30` }}>C</div>
      <p style={{ fontSize: 13, fontWeight: 700, color: tx }}>Crazy Cat</p>
      <p style={{ fontSize: 9, color: dm, marginBottom: 16 }}>Crazy Cat Studios</p>
      <div style={{ backgroundColor: `${p}15`, borderRadius: 20, padding: '8px 14px', marginBottom: 16 }}>
        <p style={{ fontSize: 10, fontWeight: 600, color: p }}>{t.verifyChild}</p>
      </div>
      <p style={{ fontSize: 10, color: sb, lineHeight: 1.5, marginBottom: 20, maxWidth: 200 }}>{t.childDesc}</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' as const, justifyContent: 'center' }}>
        <div style={{ borderRadius: 16, padding: '8px 14px', backgroundColor: `${p}12`, display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: p }} />
          <span style={{ fontSize: 9, fontWeight: 600, color: p }}>{t.step1}</span>
        </div>
        <div style={{ borderRadius: 16, padding: '8px 14px', backgroundColor: sf, display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: dm }} />
          <span style={{ fontSize: 9, color: sb }}>{t.step2}</span>
        </div>
      </div>
      <div style={{ marginTop: 'auto', width: '100%' }}>
        <div style={{ padding: '12px 0', borderRadius: 24, background: `linear-gradient(135deg, ${p}, ${a})`, textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#FFF', boxShadow: `0 4px 16px ${p}40` }}>{t.begin}</div>
        <p style={{ fontSize: 9, color: dm, marginTop: 12 }}>{t.parentCode}</p>
      </div>
    </div>
  )

  if (v === 3) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #FF8A50 0%, #FF6B35 30%, #1a1020 70%)' }}>
      <div style={{ padding: '20px 20px 12px', textAlign: 'center' }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#FFF', marginBottom: 8 }}>C</div>
        <p style={{ fontSize: 12, fontWeight: 600, color: '#FFF' }}>Crazy Cat</p>
      </div>
      <div style={{ flex: 1, margin: '0 12px 12px', borderRadius: 20, background: dk ? 'rgba(17,17,24,0.85)' : 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', padding: '24px 20px 16px', display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 16, fontWeight: 700, color: tx, marginBottom: 4, letterSpacing: -0.3 }}>{t.verifyChild}</p>
        <p style={{ fontSize: 9, color: sb, marginBottom: 20, lineHeight: 1.4 }}>{t.childDesc}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          <div style={{ padding: '10px 12px', borderRadius: 12, backgroundColor: `${p}12`, border: `1px solid ${p}25`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: p, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#FFF', fontWeight: 600 }}>1</div>
            <span style={{ fontSize: 10, fontWeight: 500, color: tx }}>{t.step1}</span>
          </div>
          <div style={{ padding: '10px 12px', borderRadius: 12, backgroundColor: sf, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: dm, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: bg, fontWeight: 600 }}>2</div>
            <span style={{ fontSize: 10, color: sb }}>{t.step2}</span>
          </div>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '11px 0', borderRadius: 14, background: `linear-gradient(135deg, ${p}, ${a})`, textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#FFF' }}>{t.begin}</div>
          <p style={{ textAlign: 'center', fontSize: 9, color: dm, marginTop: 10 }}>{t.parentCode}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderBottom: `1px solid ${bd}` }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg, #FF8A50, #FF6B35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#FFF' }}>C</div>
        <div><p style={{ fontSize: 11, fontWeight: 600, color: tx }}>Crazy Cat</p><p style={{ fontSize: 8, color: dm }}>Crazy Cat Studios</p></div>
        <div style={{ marginLeft: 'auto', padding: '3px 8px', borderRadius: 4, backgroundColor: `${p}15`, fontSize: 8, fontWeight: 600, color: p }}>Ages 4+</div>
      </div>
      <div style={{ padding: '14px 16px', flex: 1 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: tx, marginBottom: 3 }}>{t.verifyChild}</p>
        <p style={{ fontSize: 9, color: sb, marginBottom: 16, lineHeight: 1.4 }}>{t.childDesc}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 6, backgroundColor: sf }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: p }} />
            <span style={{ fontSize: 10, color: tx, flex: 1 }}>{t.step1}</span>
            <span style={{ fontSize: 8, color: dm }}>Required</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 6, backgroundColor: sf }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: dm }} />
            <span style={{ fontSize: 10, color: sb, flex: 1 }}>{t.step2}</span>
            <span style={{ fontSize: 8, color: dm }}>Pending</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <div style={{ flex: 1, textAlign: 'center', padding: '6px', borderRadius: 6, backgroundColor: sf }}><p style={{ fontSize: 15, fontWeight: 700, color: tx }}>13</p><p style={{ fontSize: 7, color: dm }}>Age</p></div>
          <div style={{ flex: 1, textAlign: 'center', padding: '6px', borderRadius: 6, backgroundColor: sf }}><p style={{ fontSize: 15, fontWeight: 700, color: p }}>2</p><p style={{ fontSize: 7, color: dm }}>Steps</p></div>
          <div style={{ flex: 1, textAlign: 'center', padding: '6px', borderRadius: 6, backgroundColor: sf }}><p style={{ fontSize: 10, fontWeight: 600, color: '#059669' }}>Low</p><p style={{ fontSize: 7, color: dm }}>Risk</p></div>
        </div>
      </div>
      <div style={{ padding: '10px 16px', borderTop: `1px solid ${bd}`, display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, padding: '8px 0', borderRadius: 6, border: `1px solid ${bd}`, textAlign: 'center', fontSize: 10, color: sb }}>{t.parentCode}</div>
        <div style={{ flex: 2, padding: '8px 0', borderRadius: 6, backgroundColor: p, textAlign: 'center', fontSize: 10, fontWeight: 600, color: '#FFF' }}>{t.begin}</div>
      </div>
    </div>
  )
}

function MethodsContent({ v, dk, t, p, a }: SP) {
  const tx = dk ? '#FFF' : '#111'
  const sb = dk ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)'
  const dm = dk ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
  const sf = dk ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'
  const bd = dk ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const bg = dk ? '#111118' : '#FFF'
  const methods = [
    { letter: 'F', name: t.faceScan, desc: t.faceScanDesc, time: t.instant, color: p },
    { letter: 'S', name: t.selfie, desc: t.selfieDesc, time: t.sec30, color: '#E040A0' },
    { letter: 'ID', name: t.idUpload, desc: t.idUploadDesc, time: t.min2, color: '#059669' },
  ]
  const chevron = <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={dm} strokeWidth="1.5"><path d="M4.5 2.5L8 6L4.5 9.5" /></svg>

  if (v === 0) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderBottom: `1px solid ${bd}` }}>
        <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg, #FF8A50, #FF6B35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#FFF' }}>C</div>
        <span style={{ fontSize: 11, fontWeight: 500, color: sb }}>Crazy Cat</span>
      </div>
      <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 16, fontWeight: 700, color: tx, marginBottom: 4 }}>{t.verifyAge}</p>
        <p style={{ fontSize: 10, color: sb, marginBottom: 16 }}>{t.ageDesc}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {methods.map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px', borderRadius: 14, backgroundColor: sf, border: `1px solid ${i === 0 ? `${p}25` : bd}` }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: `${m.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: m.color }}>{m.letter}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: tx }}>{m.name}</span>
                  <span style={{ fontSize: 8, padding: '1px 5px', borderRadius: 4, backgroundColor: `${m.color}15`, color: m.color, fontWeight: 600 }}>{m.time}</span>
                </div>
                <p style={{ fontSize: 9, color: dm, marginTop: 2 }}>{m.desc}</p>
              </div>
              {chevron}
            </div>
          ))}
        </div>
        <div style={{ padding: '12px', borderRadius: 12, backgroundColor: sf, marginTop: 'auto' }}>
          <p style={{ fontSize: 10, fontWeight: 600, color: tx, marginBottom: 6 }}>{t.privacy}</p>
          {[t.p1, t.p2, t.p3].map((pi, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <div style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#059669' }} />
              <span style={{ fontSize: 8, color: sb }}>{pi}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '8px 0' }}><span style={{ fontSize: 7, color: dm }}>{t.powered} <strong style={{ color: sb }}>k-id</strong></span></div>
    </div>
  )

  if (v === 1) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '24px 24px 16px' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: tx, marginBottom: 4, letterSpacing: -0.5 }}>{t.verifyAge}</h2>
      <p style={{ fontSize: 11, color: sb, marginBottom: 28, lineHeight: 1.5 }}>{t.ageDesc}</p>
      {methods.map((m, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: i < 2 ? `1px solid ${bd}` : 'none' }}>
          <div style={{ flex: 1 }}><p style={{ fontSize: 13, fontWeight: 500, color: tx }}>{m.name}</p><p style={{ fontSize: 9, color: dm, marginTop: 2 }}>{m.desc}</p></div>
          <span style={{ fontSize: 10, color: sb, marginRight: 8 }}>{m.time}</span>
          {chevron}
        </div>
      ))}
      <div style={{ marginTop: 'auto', textAlign: 'center' }}><p style={{ fontSize: 9, color: dm }}>{t.privacy}</p></div>
    </div>
  )

  if (v === 2) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '16px 16px 12px', background: dk ? undefined : `linear-gradient(180deg, ${p}06, transparent 50%)` }}>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <div style={{ width: 32, height: 32, borderRadius: 16, background: 'linear-gradient(135deg, #FF8A50, #FF6B35)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#FFF', marginBottom: 8 }}>C</div>
        <p style={{ fontSize: 14, fontWeight: 700, color: tx }}>{t.verifyAge}</p>
        <p style={{ fontSize: 9, color: sb, marginTop: 2 }}>{t.ageDesc}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {methods.map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px', borderRadius: 20, background: `linear-gradient(135deg, ${m.color}12, ${m.color}06)`, border: `1px solid ${m.color}20` }}>
            <div style={{ width: 40, height: 40, borderRadius: 20, background: `${m.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: m.color }}>{m.letter}</div>
            <div style={{ flex: 1 }}><p style={{ fontSize: 12, fontWeight: 600, color: tx }}>{m.name}</p><p style={{ fontSize: 8, color: sb, marginTop: 2 }}>{m.desc}</p></div>
            <div style={{ padding: '3px 8px', borderRadius: 12, backgroundColor: `${m.color}18`, fontSize: 8, fontWeight: 700, color: m.color }}>{m.time}</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 12 }}><span style={{ fontSize: 8, color: dm }}>{t.powered} <strong style={{ color: sb }}>k-id</strong></span></div>
    </div>
  )

  if (v === 3) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: `linear-gradient(180deg, #FF8A50 0%, ${p} 50%, ${dk ? '#111118' : '#F8F8FA'} 100%)` }}>
      <div style={{ padding: '20px 20px 12px', textAlign: 'center' }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#FFF', marginBottom: 6 }}>C</div>
        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>Crazy Cat</p>
      </div>
      <div style={{ flex: 1, margin: '0 12px 12px', borderRadius: 20, background: dk ? 'rgba(17,17,24,0.88)' : 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', padding: '20px 16px 12px', display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: tx, marginBottom: 3 }}>{t.verifyAge}</p>
        <p style={{ fontSize: 9, color: sb, marginBottom: 14 }}>{t.ageDesc}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {methods.map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px', borderRadius: 12, backgroundColor: sf, border: `1px solid ${bd}`, position: 'relative', overflow: 'hidden' }}>
              {i === 0 && <div style={{ position: 'absolute', top: 0, right: 0, padding: '2px 6px', borderBottomLeftRadius: 6, backgroundColor: p, fontSize: 7, fontWeight: 600, color: '#FFF' }}>{t.recommended}</div>}
              <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: `${m.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: m.color }}>{m.letter}</div>
              <div style={{ flex: 1 }}><p style={{ fontSize: 11, fontWeight: 600, color: tx }}>{m.name}</p><p style={{ fontSize: 8, color: dm, marginTop: 1 }}>{m.desc}</p></div>
              <span style={{ fontSize: 9, color: m.color, fontWeight: 500 }}>{m.time}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 12, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: `${p}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: p }} /></div>
          <span style={{ fontSize: 8, color: dm }}>{t.privacy}</span>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: `1px solid ${bd}` }}>
        <div style={{ width: 20, height: 20, borderRadius: 5, background: 'linear-gradient(135deg, #FF8A50, #FF6B35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#FFF' }}>C</div>
        <span style={{ fontSize: 10, fontWeight: 600, color: tx }}>Crazy Cat</span>
        <span style={{ fontSize: 8, color: dm, marginLeft: 'auto' }}>crazycat.game</span>
      </div>
      <div style={{ padding: '12px 16px', flex: 1 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: tx, marginBottom: 2 }}>{t.verifyAge}</p>
        <p style={{ fontSize: 9, color: sb, marginBottom: 12 }}>{t.ageDesc}</p>
        <div style={{ display: 'flex', padding: '4px 8px', marginBottom: 4 }}>
          <span style={{ flex: 2, fontSize: 8, color: dm, textTransform: 'uppercase' as const, letterSpacing: 0.5 }}>Method</span>
          <span style={{ flex: 1, fontSize: 8, color: dm, textTransform: 'uppercase' as const, letterSpacing: 0.5, textAlign: 'center' }}>Time</span>
          <span style={{ width: 40, fontSize: 8, color: dm, textTransform: 'uppercase' as const, letterSpacing: 0.5, textAlign: 'right' }}>Status</span>
        </div>
        {methods.map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '8px', borderRadius: 6, backgroundColor: i === 0 ? sf : 'transparent', marginBottom: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 2 }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: m.color }} />
              <span style={{ fontSize: 10, fontWeight: 500, color: tx }}>{m.name}</span>
            </div>
            <span style={{ flex: 1, fontSize: 9, color: sb, textAlign: 'center' }}>{m.time}</span>
            <span style={{ width: 40, fontSize: 8, color: i === 0 ? p : dm, fontWeight: 500, textAlign: 'right' }}>Ready</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '8px 16px', borderTop: `1px solid ${bd}`, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#059669' }} />
          <span style={{ fontSize: 7, color: dm }}>Encrypted</span>
        </div>
        <span style={{ fontSize: 7, color: dm }}>{t.powered} <strong>k-id</strong></span>
        <div style={{ marginLeft: 'auto', padding: '6px 16px', borderRadius: 6, backgroundColor: p, fontSize: 10, fontWeight: 600, color: '#FFF' }}>{t.cont}</div>
      </div>
    </div>
  )
}

/* ─── Edit Panel ───────────────────────────────────── */

function EditPanel({ section, onDone }: { section: typeof SECTIONS[0]; onDone: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease }}
      className="flex flex-1 overflow-y-auto py-10"
    >
      <div className="mx-auto w-full max-w-xl px-16">
        <div className="mb-10">
          <p className="mb-2 text-[12px] text-white/20">Editing</p>
          <h2 className="text-[24px] font-bold tracking-[-0.02em] text-white">{section.title}</h2>
        </div>

        {section.id === 'product' && <EditProduct />}
        {section.id === 'safety' && <EditSafety />}
        {section.id === 'config' && <EditConfig />}
      </div>
    </motion.div>
  )
}

function EditProduct() {
  const [name, setName] = useState('Crazy Cat')
  const [type, setType] = useState('mobile-game')
  const [genres, setGenres] = useState<string[]>(['Casual', 'Puzzle'])
  const [platforms, setPlatforms] = useState<string[]>(['iOS', 'Android'])
  const [developer, setDeveloper] = useState('Crazy Cat Studios')

  const productTypes = [
    { id: 'mobile-game', label: 'Mobile Game', Icon: Smartphone },
    { id: 'web-app', label: 'Web App', Icon: Globe },
    { id: 'desktop', label: 'Desktop', Icon: Monitor },
  ]
  const allGenres = ['Casual', 'Puzzle', 'Action', 'Adventure', 'Strategy', 'RPG', 'Educational', 'Social']
  const allPlatforms = ['iOS', 'Android', 'Web', 'Windows', 'macOS']

  const toggle = (arr: string[], val: string, set: (v: string[]) => void) =>
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])

  return (
    <div className="space-y-8">
      <div>
        <label className="mb-3 block text-[12px] font-medium text-white/30">Product name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3.5 text-[16px] font-medium text-white outline-none transition-all focus:border-purple-500/30 focus:bg-white/[0.04]" />
      </div>

      <div>
        <label className="mb-3 block text-[12px] font-medium text-white/30">Product type</label>
        <div className="grid grid-cols-3 gap-3">
          {productTypes.map(({ id, label, Icon }) => {
            const active = type === id
            return (
              <button key={id} onClick={() => setType(id)} className={`flex flex-col items-center gap-3 rounded-2xl border p-5 transition-all ${active ? 'border-purple-500/30 bg-purple-500/[0.08]' : 'border-white/[0.04] bg-white/[0.02] hover:border-white/[0.08] hover:bg-white/[0.04]'}`}>
                <Icon className={`h-5 w-5 ${active ? 'text-purple-400' : 'text-white/25'}`} />
                <span className={`text-[12px] font-medium ${active ? 'text-white/80' : 'text-white/35'}`}>{label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className="mb-3 block text-[12px] font-medium text-white/30">Genre</label>
        <div className="flex flex-wrap gap-2">
          {allGenres.map(g => {
            const active = genres.includes(g)
            return (
              <button key={g} onClick={() => toggle(genres, g, setGenres)} className={`rounded-full px-3.5 py-2 text-[12px] font-medium transition-all ${active ? 'bg-purple-500/15 text-purple-300 ring-1 ring-purple-500/25' : 'bg-white/[0.03] text-white/30 hover:bg-white/[0.06] hover:text-white/50'}`}>
                {active && <Check className="-ml-0.5 mr-1.5 inline h-3 w-3" />}{g}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className="mb-3 block text-[12px] font-medium text-white/30">Platforms</label>
        <div className="flex flex-wrap gap-2">
          {allPlatforms.map(p => {
            const active = platforms.includes(p)
            return (
              <button key={p} onClick={() => toggle(platforms, p, setPlatforms)} className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[12px] font-medium transition-all ${active ? 'border-emerald-500/20 bg-emerald-500/[0.08] text-emerald-300' : 'border-white/[0.04] bg-white/[0.02] text-white/30 hover:border-white/[0.08]'}`}>
                <div className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-emerald-400' : 'bg-white/15'}`} />
                {p}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className="mb-3 block text-[12px] font-medium text-white/30">Developer</label>
        <input type="text" value={developer} onChange={e => setDeveloper(e.target.value)} className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-[14px] text-white/70 outline-none transition-all focus:border-purple-500/30" />
      </div>
    </div>
  )
}

function EditSafety() {
  const [audience, setAudience] = useState('all-ages')
  const [regions, setRegions] = useState<string[]>(['US', 'EU', 'UK'])
  const [dataTypes, setDataTypes] = useState<string[]>(['Username', 'Gameplay', 'Device ID'])

  const audiences = [
    { id: 'all-ages', age: '4+', label: 'All Ages', desc: 'Children may be present', risk: 'High' },
    { id: 'kids', age: '4–12', label: 'Kids Only', desc: 'Primarily children', risk: 'Critical' },
    { id: 'teens', age: '13+', label: 'Teens', desc: 'Teens and above', risk: 'Medium' },
    { id: 'adults', age: '18+', label: 'Adults', desc: 'Adults only', risk: 'Low' },
  ]
  const allRegions = [
    { id: 'US', label: 'United States', reg: 'COPPA' },
    { id: 'EU', label: 'European Union', reg: 'GDPR-K' },
    { id: 'UK', label: 'United Kingdom', reg: 'UK AADC' },
    { id: 'CA', label: 'Canada', reg: 'PIPEDA' },
    { id: 'AU', label: 'Australia', reg: 'OP Act' },
    { id: 'JP', label: 'Japan', reg: 'APPI' },
  ]
  const allDataTypes = ['Username', 'Email', 'Location', 'Device ID', 'Gameplay', 'Payment', 'Photos', 'Contacts']
  const riskMeta: Record<string, { color: string; bg: string; width: string }> = {
    Critical: { color: 'text-red-400', bg: 'bg-red-400', width: 'w-full' },
    High: { color: 'text-orange-400', bg: 'bg-orange-400', width: 'w-3/4' },
    Medium: { color: 'text-yellow-400', bg: 'bg-yellow-400', width: 'w-1/2' },
    Low: { color: 'text-emerald-400', bg: 'bg-emerald-400', width: 'w-1/4' },
  }

  const toggle = (arr: string[], val: string, set: (v: string[]) => void) =>
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])

  const risk = audiences.find(a => a.id === audience)!.risk
  const rm = riskMeta[risk]

  return (
    <div className="space-y-8">
      <div>
        <label className="mb-3 block text-[12px] font-medium text-white/30">Target audience</label>
        <div className="grid grid-cols-4 gap-2">
          {audiences.map(a => {
            const active = audience === a.id
            return (
              <button key={a.id} onClick={() => setAudience(a.id)} className={`flex flex-col items-center gap-1.5 rounded-2xl border p-4 transition-all ${active ? 'border-purple-500/30 bg-purple-500/[0.08]' : 'border-white/[0.04] bg-white/[0.02] hover:border-white/[0.08]'}`}>
                <span className={`text-[22px] font-bold tracking-tight ${active ? 'text-white' : 'text-white/30'}`}>{a.age}</span>
                <span className={`text-[11px] font-medium ${active ? 'text-white/70' : 'text-white/25'}`}>{a.label}</span>
                <span className={`text-[9px] leading-tight ${active ? 'text-white/35' : 'text-white/15'}`}>{a.desc}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className="mb-3 block text-[12px] font-medium text-white/30">Active regions</label>
        <div className="grid grid-cols-2 gap-2">
          {allRegions.map(r => {
            const active = regions.includes(r.id)
            return (
              <button key={r.id} onClick={() => toggle(regions, r.id, setRegions)} className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all ${active ? 'border-purple-500/20 bg-purple-500/[0.06]' : 'border-white/[0.04] bg-white/[0.015] hover:border-white/[0.08]'}`}>
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${active ? 'bg-purple-500/15 text-purple-300' : 'bg-white/[0.04] text-white/25'}`}>{r.id}</div>
                <div className="min-w-0 flex-1">
                  <p className={`text-[12px] font-medium ${active ? 'text-white/70' : 'text-white/35'}`}>{r.label}</p>
                  <p className={`text-[10px] ${active ? 'text-purple-400/60' : 'text-white/15'}`}>{r.reg}</p>
                </div>
                {active && <Check className="h-3.5 w-3.5 shrink-0 text-purple-400/60" />}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className="mb-3 block text-[12px] font-medium text-white/30">Data collected</label>
        <div className="flex flex-wrap gap-2">
          {allDataTypes.map(d => {
            const active = dataTypes.includes(d)
            return (
              <button key={d} onClick={() => toggle(dataTypes, d, setDataTypes)} className={`rounded-full px-3.5 py-2 text-[12px] font-medium transition-all ${active ? 'bg-white/[0.08] text-white/60 ring-1 ring-white/[0.08]' : 'bg-white/[0.02] text-white/20 hover:bg-white/[0.05] hover:text-white/35'}`}>
                {active && <Check className="-ml-0.5 mr-1.5 inline h-3 w-3" />}{d}
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-white/30">Risk assessment</span>
          <span className={`text-[13px] font-semibold ${rm.color}`}>{risk}</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
          <div className={`h-full rounded-full transition-all duration-500 ${rm.width} ${rm.bg}`} style={{ opacity: 0.6 }} />
        </div>
        <p className="mt-3 text-[11px] text-white/15">Auto-calculated based on audience and data scope</p>
      </div>
    </div>
  )
}

function EditConfig() {
  const [ageVerification, setAgeVerification] = useState(true)
  const [verifyMethod, setVerifyMethod] = useState('facial')
  const [confidence, setConfidence] = useState(85)
  const [parentalConsent, setParentalConsent] = useState(true)
  const [consentMethod, setConsentMethod] = useState('email-id')
  const [ageAppeal, setAgeAppeal] = useState(true)
  const [appealWindow, setAppealWindow] = useState('24h')
  const [dataPrivacy, setDataPrivacy] = useState(true)
  const [contentFiltering, setContentFiltering] = useState(true)
  const [filterMode, setFilterMode] = useState('strict')

  return (
    <div className="space-y-3">
      <ConfigCard enabled={ageVerification} onToggle={setAgeVerification} icon={Eye} color="purple" title="Age Verification" desc="Verify user age before granting access">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-[11px] text-white/25">Method</label>
            <div className="flex gap-2">
              {[{ id: 'facial', label: 'Facial estimation' }, { id: 'id-doc', label: 'ID document' }, { id: 'self', label: 'Self-declaration' }].map(m => (
                <button key={m.id} onClick={() => setVerifyMethod(m.id)} className={`rounded-lg px-3 py-2 text-[11px] font-medium transition-all ${verifyMethod === m.id ? 'bg-purple-500/15 text-purple-300 ring-1 ring-purple-500/20' : 'bg-white/[0.03] text-white/25 hover:bg-white/[0.06]'}`}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-[11px] text-white/25">Confidence threshold</label>
              <span className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[12px] font-medium text-white/50">{confidence}%</span>
            </div>
            <input type="range" min={50} max={99} value={confidence} onChange={e => setConfidence(+e.target.value)} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/[0.06] accent-purple-500 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-400" />
          </div>
        </div>
      </ConfigCard>

      <ConfigCard enabled={parentalConsent} onToggle={setParentalConsent} icon={Users} color="purple" title="Parental Consent" desc="Require parent verification for minors">
        <div>
          <label className="mb-2 block text-[11px] text-white/25">Verification method</label>
          <div className="flex gap-2">
            {[{ id: 'email-id', label: 'Email + ID' }, { id: 'credit-card', label: 'Credit card' }, { id: 'email-only', label: 'Email only' }].map(m => (
              <button key={m.id} onClick={() => setConsentMethod(m.id)} className={`rounded-lg px-3 py-2 text-[11px] font-medium transition-all ${consentMethod === m.id ? 'bg-purple-500/15 text-purple-300 ring-1 ring-purple-500/20' : 'bg-white/[0.03] text-white/25 hover:bg-white/[0.06]'}`}>
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </ConfigCard>

      <ConfigCard enabled={ageAppeal} onToggle={setAgeAppeal} icon={Shield} color="purple" title="Age Appeal" desc="Allow users to dispute age results">
        <div>
          <label className="mb-2 block text-[11px] text-white/25">Appeal window</label>
          <div className="flex gap-2">
            {['12h', '24h', '48h', '72h'].map(w => (
              <button key={w} onClick={() => setAppealWindow(w)} className={`rounded-lg px-3.5 py-2 text-[11px] font-medium transition-all ${appealWindow === w ? 'bg-purple-500/15 text-purple-300 ring-1 ring-purple-500/20' : 'bg-white/[0.03] text-white/25 hover:bg-white/[0.06]'}`}>
                {w}
              </button>
            ))}
          </div>
        </div>
      </ConfigCard>

      <ConfigCard enabled={dataPrivacy} onToggle={setDataPrivacy} icon={Lock} color="emerald" title="Enhanced Data Privacy" desc="Extra protection for child data" />

      <ConfigCard enabled={contentFiltering} onToggle={setContentFiltering} icon={Eye} color="emerald" title="Content Filtering" desc="Filter inappropriate content for minors">
        <div>
          <label className="mb-2 block text-[11px] text-white/25">Filter mode</label>
          <div className="flex gap-2">
            {[{ id: 'strict', label: 'Strict' }, { id: 'moderate', label: 'Moderate' }, { id: 'custom', label: 'Custom' }].map(m => (
              <button key={m.id} onClick={() => setFilterMode(m.id)} className={`rounded-lg px-3 py-2 text-[11px] font-medium transition-all ${filterMode === m.id ? 'bg-purple-500/15 text-purple-300 ring-1 ring-purple-500/20' : 'bg-white/[0.03] text-white/25 hover:bg-white/[0.06]'}`}>
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </ConfigCard>
    </div>
  )
}

function ConfigCard({ enabled, onToggle, icon: Icon, color, title, desc, children }: {
  enabled: boolean; onToggle: (v: boolean) => void; icon: typeof Eye; color: 'purple' | 'emerald'; title: string; desc: string; children?: React.ReactNode
}) {
  const iconBg = enabled ? (color === 'purple' ? 'bg-purple-500/15' : 'bg-emerald-500/15') : 'bg-white/[0.04]'
  const iconColor = enabled ? (color === 'purple' ? 'text-purple-400' : 'text-emerald-400') : 'text-white/20'

  return (
    <div className={`rounded-2xl border p-5 transition-all ${enabled ? 'border-white/[0.08] bg-white/[0.03]' : 'border-white/[0.04] bg-white/[0.015]'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${iconBg}`}>
            <Icon className={`h-4 w-4 ${iconColor}`} />
          </div>
          <div>
            <p className={`text-[13px] font-medium ${enabled ? 'text-white/80' : 'text-white/40'}`}>{title}</p>
            <p className="text-[11px] text-white/20">{desc}</p>
          </div>
        </div>
        <ToggleSwitch enabled={enabled} onChange={onToggle} />
      </div>
      {enabled && children && (
        <div className="mt-5 border-t border-white/[0.04] pt-5">{children}</div>
      )}
    </div>
  )
}

function ToggleSwitch({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!enabled)} className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${enabled ? 'bg-purple-500' : 'bg-white/[0.08]'}`}>
      <div className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${enabled ? 'left-6' : 'left-1'}`} />
    </button>
  )
}

/* ─── Config Controls ──────────────────────────────── */

function ConfigGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-0.5 rounded-xl border border-white/[0.04] bg-white/[0.02] p-1">
      {children}
    </div>
  )
}

function ConfigBtn({ active, onClick, children, title }: { active: boolean; onClick: () => void; children: React.ReactNode; title: string }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`flex h-7 items-center justify-center rounded-lg px-2.5 transition-all duration-200 ${
        active
          ? 'bg-white/[0.08] text-white/70'
          : 'text-white/20 hover:bg-white/[0.04] hover:text-white/40'
      }`}
    >
      {children}
    </button>
  )
}
