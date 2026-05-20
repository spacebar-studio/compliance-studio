import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageWrapper } from '../components/Layout'
import { motion } from 'framer-motion'
import { Upload, Sparkles, ChevronRight, ChevronLeft, Smartphone, Monitor, Tablet, Check } from 'lucide-react'

const GENERATED_PALETTES = [
  { name: 'Vivid Purple', colors: ['#7C5CFC', '#1A1735', '#E8E0FF', '#F5F3FF'] },
  { name: 'Ocean Blue', colors: ['#3B82F6', '#0F172A', '#DBEAFE', '#EFF6FF'] },
  { name: 'Emerald', colors: ['#10B981', '#064E3B', '#D1FAE5', '#ECFDF5'] },
  { name: 'Sunset', colors: ['#F97316', '#431407', '#FFEDD5', '#FFF7ED'] },
]

export default function SetupBrand() {
  const navigate = useNavigate()
  const [logoUploaded, setLogoUploaded] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [customize, setCustomize] = useState(false)
  const [selectedPalette, setSelectedPalette] = useState(0)
  const [previewStep, setPreviewStep] = useState(0)
  const [device, setDevice] = useState<'phone' | 'tablet' | 'desktop'>('phone')

  const steps = ['Age Gate', 'Estimation', 'Appeal', 'Consent']
  const palette = GENERATED_PALETTES[selectedPalette]

  const handleLogoDrop = useCallback(() => {
    setLogoUploaded(true)
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
    }, 2000)
  }, [])

  const deviceWidth = device === 'phone' ? 'w-[240px]' : device === 'tablet' ? 'w-[320px]' : 'w-[400px]'
  const deviceHeight = device === 'phone' ? 'h-[480px]' : device === 'tablet' ? 'h-[420px]' : 'h-[360px]'
  const deviceRadius = device === 'phone' ? 'rounded-[24px]' : device === 'tablet' ? 'rounded-[16px]' : 'rounded-[12px]'

  return (
    <PageWrapper>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Brand your experience</h1>
          <p className="mb-10 text-gray-400">Drop your logo and we'll match your brand automatically.</p>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div
                onClick={handleLogoDrop}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-8 py-12 transition-all ${
                  logoUploaded
                    ? 'border-purple-500/30 bg-purple-500/5'
                    : 'border-navy-600 bg-navy-800/30 hover:border-navy-500 hover:bg-navy-800/50'
                }`}
              >
                {logoUploaded ? (
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500 text-2xl font-bold text-white">
                      P
                    </div>
                    <p className="text-sm font-medium text-purple-400">Logo uploaded</p>
                    <p className="text-xs text-gray-500">Click to replace</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto mb-3 h-8 w-8 text-gray-500" />
                    <p className="mb-1 text-sm font-medium text-gray-300">Drop your logo here</p>
                    <p className="text-xs text-gray-500">PNG, SVG, or JPG up to 5MB</p>
                  </div>
                )}
              </div>

              <div
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-navy-600 bg-navy-800/20 px-8 py-8 transition-all hover:border-navy-500"
              >
                <Upload className="mb-2 h-5 w-5 text-gray-600" />
                <p className="text-sm text-gray-500">App screenshot <span className="text-gray-600">(optional)</span></p>
                <p className="text-xs text-gray-600">Helps us match your visual style</p>
              </div>

              {generating && (
                <div className="flex items-center gap-3 rounded-xl bg-navy-800 p-4">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
                  <div>
                    <p className="text-sm font-medium text-purple-400">Generating your theme...</p>
                    <p className="text-xs text-gray-500">Analyzing colors and style</p>
                  </div>
                </div>
              )}

              {generated && !generating && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="rounded-xl border border-navy-700 bg-navy-800/50 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-purple-400" />
                      <span className="text-sm font-medium text-gray-300">Generated palette</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {GENERATED_PALETTES.map((p, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedPalette(i)}
                          className={`flex items-center gap-2.5 rounded-lg border p-2.5 transition-all ${
                            selectedPalette === i
                              ? 'border-purple-500 bg-purple-500/10'
                              : 'border-navy-600 hover:border-navy-500'
                          }`}
                        >
                          <div className="flex -space-x-1">
                            {p.colors.slice(0, 3).map((c, j) => (
                              <div
                                key={j}
                                className="h-5 w-5 rounded-full border-2 border-navy-800"
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">{p.name}</span>
                          {selectedPalette === i && <Check className="ml-auto h-3.5 w-3.5 text-purple-400" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setCustomize(!customize)}
                    className="flex w-full items-center justify-between rounded-xl border border-navy-700 bg-navy-800/30 p-4 text-sm text-gray-400 transition-colors hover:text-gray-300"
                  >
                    <span>{customize ? 'Hide' : 'Show'} custom controls</span>
                    <ChevronRight className={`h-4 w-4 transition-transform ${customize ? 'rotate-90' : ''}`} />
                  </button>

                  {customize && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="overflow-hidden rounded-xl border border-navy-700 bg-navy-800/50 p-4"
                    >
                      <div className="space-y-4">
                        <div>
                          <label className="mb-1.5 block text-xs text-gray-500">Primary color</label>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg" style={{ backgroundColor: palette.colors[0] }} />
                            <input
                              type="text"
                              defaultValue={palette.colors[0]}
                              className="flex-1 rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs text-gray-500">Corner radius</label>
                          <input type="range" min="0" max="24" defaultValue="12" className="w-full accent-purple-500" />
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Sharp</span>
                            <span>Rounded</span>
                          </div>
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs text-gray-500">Mode</label>
                          <div className="flex gap-2">
                            <button className="flex-1 rounded-lg bg-purple-500/10 py-2 text-xs text-purple-400">Light</button>
                            <button className="flex-1 rounded-lg bg-navy-700 py-2 text-xs text-gray-400">Dark</button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex gap-1 rounded-lg bg-navy-800 p-1">
                  {([['phone', Smartphone], ['tablet', Tablet], ['desktop', Monitor]] as const).map(([d, Icon]) => (
                    <button
                      key={d}
                      onClick={() => setDevice(d)}
                      className={`rounded-md p-2 transition-colors ${device === d ? 'bg-navy-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex w-full items-center justify-center rounded-2xl bg-navy-950 p-8" style={{ minHeight: 540 }}>
                <div className={`${deviceWidth} ${deviceHeight} ${deviceRadius} overflow-hidden border-2 border-navy-600 bg-white shadow-2xl transition-all`}>
                  <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                    {generated ? (
                      <>
                        <div
                          className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white"
                          style={{ backgroundColor: palette.colors[0] }}
                        >
                          P
                        </div>
                        {previewStep === 0 && (
                          <>
                            <h3 className="mb-2 text-base font-semibold text-gray-900">Verify your age</h3>
                            <p className="mb-6 text-sm text-gray-500">Quick verification to continue</p>
                            <button
                              className="w-full rounded-xl py-3 text-sm font-medium text-white"
                              style={{ backgroundColor: palette.colors[0] }}
                            >
                              Continue
                            </button>
                          </>
                        )}
                        {previewStep === 1 && (
                          <>
                            <h3 className="mb-2 text-base font-semibold text-gray-900">Quick age check</h3>
                            <p className="mb-6 text-sm text-gray-500">Look at the camera briefly</p>
                            <div className="mb-6 h-24 w-24 rounded-full bg-gray-100" />
                            <button
                              className="w-full rounded-xl py-3 text-sm font-medium text-white"
                              style={{ backgroundColor: palette.colors[0] }}
                            >
                              Enable Camera
                            </button>
                          </>
                        )}
                        {previewStep === 2 && (
                          <>
                            <div className="mb-3 text-2xl">⚠️</div>
                            <h3 className="mb-2 text-base font-semibold text-gray-900">Appeal decision</h3>
                            <p className="mb-6 text-sm text-gray-500">Upload ID to verify your age</p>
                            <button
                              className="mb-2 w-full rounded-xl py-3 text-sm font-medium text-white"
                              style={{ backgroundColor: palette.colors[0] }}
                            >
                              Submit Appeal
                            </button>
                          </>
                        )}
                        {previewStep === 3 && (
                          <>
                            <h3 className="mb-2 text-base font-semibold text-gray-900">Parental consent</h3>
                            <p className="mb-6 text-sm text-gray-500">A parent needs to approve</p>
                            <div className="mb-4 w-full rounded-lg border border-gray-200 p-3 text-left">
                              <p className="text-[10px] text-gray-400">Parent's email</p>
                              <p className="text-sm text-gray-600">parent@example.com</p>
                            </div>
                            <button
                              className="w-full rounded-xl py-3 text-sm font-medium text-white"
                              style={{ backgroundColor: palette.colors[0] }}
                            >
                              Send Request
                            </button>
                          </>
                        )}
                        <p className="mt-3 text-[10px] text-gray-400">Powered by Compliance Studio</p>
                      </>
                    ) : generating ? (
                      <div className="space-y-3">
                        <div className="shimmer mx-auto h-12 w-12 rounded-xl" />
                        <div className="shimmer mx-auto h-4 w-32 rounded" />
                        <div className="shimmer mx-auto h-3 w-48 rounded" />
                        <div className="shimmer mx-auto mt-4 h-10 w-full rounded-xl" />
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-200 text-gray-400">
                          ?
                        </div>
                        <p className="text-sm text-gray-400">Upload your logo to see a preview</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {generated && (
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => setPreviewStep(Math.max(0, previewStep - 1))}
                    disabled={previewStep === 0}
                    className="rounded-lg p-1.5 text-gray-500 hover:text-white disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {steps.map((s, i) => (
                    <button
                      key={s}
                      onClick={() => setPreviewStep(i)}
                      className={`rounded-full px-3 py-1 text-xs transition-colors ${
                        i === previewStep ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                  <button
                    onClick={() => setPreviewStep(Math.min(steps.length - 1, previewStep + 1))}
                    disabled={previewStep === steps.length - 1}
                    className="rounded-lg p-1.5 text-gray-500 hover:text-white disabled:opacity-30"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 flex justify-between">
            <button
              onClick={() => navigate('/setup')}
              className="rounded-xl border border-navy-600 px-6 py-3 text-sm text-gray-400 transition-colors hover:border-gray-500 hover:text-white"
            >
              Back
            </button>
            <button
              onClick={() => navigate('/setup/review')}
              disabled={!generated}
              className="rounded-xl bg-purple-500 px-8 py-3 text-[15px] font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:bg-purple-600 disabled:opacity-40 disabled:shadow-none"
            >
              Continue
            </button>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
