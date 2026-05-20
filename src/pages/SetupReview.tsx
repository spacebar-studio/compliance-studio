import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageWrapper } from '../components/Layout'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight, ChevronLeft, Edit3, Shield, Eye, Clock, FileText, Users, Smartphone, Monitor, Tablet } from 'lucide-react'

const REVIEW_SECTIONS = [
  {
    id: 'details',
    title: 'Product Details',
    icon: FileText,
    summary: 'Game · iOS · All ages · Medium risk',
    items: ['Name: Pixel Quest', 'Type: Game', 'Platform: iOS', 'Audience: All ages', 'Risk: Medium (auto-detected)'],
  },
  {
    id: 'branding',
    title: 'Branding',
    icon: Eye,
    summary: 'AI-generated theme from logo',
    colors: ['#7C5CFC', '#1A1735', '#E8E0FF'],
  },
  {
    id: 'assurance',
    title: 'Age Assurance',
    icon: Shield,
    summary: 'Facial estimation enabled',
    items: ['Method: Facial age estimation', 'Confidence threshold: 85%', 'Fallback: ID verification'],
  },
  {
    id: 'appeal',
    title: 'Age Appeal',
    icon: Clock,
    summary: '24hr appeal window',
    items: ['Appeal window: 24 hours', 'Method: ID document upload', 'Auto-escalation: Enabled'],
  },
  {
    id: 'consent',
    title: 'Parental Consent',
    icon: Users,
    summary: 'Email + ID verification flow',
    items: ['Consent method: Email + ID', 'Expiry: 365 days', 'Re-consent: On major updates'],
  },
]

const PREVIEW_STEPS = ['Age Gate', 'Estimation', 'Appeal', 'Consent']

export default function SetupReview() {
  const navigate = useNavigate()
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [previewStep, setPreviewStep] = useState(0)
  const [device, setDevice] = useState<'phone' | 'tablet' | 'desktop'>('phone')
  const [launching, setLaunching] = useState(false)

  function handleGoLive() {
    setLaunching(true)
    setTimeout(() => navigate('/setup/success'), 1500)
  }

  const deviceWidth = device === 'phone' ? 'w-[220px]' : device === 'tablet' ? 'w-[300px]' : 'w-[380px]'
  const deviceHeight = device === 'phone' ? 'h-[440px]' : device === 'tablet' ? 'h-[380px]' : 'h-[320px]'
  const deviceRadius = device === 'phone' ? 'rounded-[24px]' : device === 'tablet' ? 'rounded-[16px]' : 'rounded-[12px]'

  return (
    <PageWrapper>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">You're all set</h1>
          <p className="mb-10 text-gray-400">Here's what we've configured for Pixel Quest.</p>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3 space-y-0 rounded-2xl border border-navy-700/50 bg-navy-800/30 p-6">
              {REVIEW_SECTIONS.map((section) => {
                const isEditing = editingSection === section.id
                return (
                  <div key={section.id} className="border-b border-navy-700/40 last:border-0">
                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10">
                          <Check className="h-4 w-4 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-[15px] font-medium">{section.title}</p>
                          {!isEditing && (
                            <div className="flex items-center gap-2">
                              <p className="text-sm text-gray-500">{section.summary}</p>
                              {'colors' in section && section.colors && (
                                <div className="flex -space-x-0.5">
                                  {section.colors.map((c, i) => (
                                    <div
                                      key={i}
                                      className="h-3.5 w-3.5 rounded-full border border-navy-700"
                                      style={{ backgroundColor: c }}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => setEditingSection(isEditing ? null : section.id)}
                        className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-gray-500 transition-colors hover:bg-navy-700 hover:text-gray-300"
                      >
                        <Edit3 className="h-3 w-3" />
                        {isEditing ? 'Close' : 'Edit'}
                      </button>
                    </div>
                    <AnimatePresence>
                      {isEditing && 'items' in section && section.items && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mb-4 ml-11 rounded-xl border border-navy-600 bg-navy-800 p-4">
                            {section.items.map((item, i) => (
                              <div key={i} className="flex items-center justify-between py-2 text-sm first:pt-0 last:pb-0">
                                <span className="text-gray-400">{item.split(':')[0]}</span>
                                <span className="text-gray-200">{item.split(':').slice(1).join(':').trim()}</span>
                              </div>
                            ))}
                            <div className="mt-3 flex gap-2 border-t border-navy-600 pt-3">
                              <button className="rounded-lg bg-purple-500 px-4 py-1.5 text-xs font-medium text-white">
                                Save
                              </button>
                              <button
                                onClick={() => setEditingSection(null)}
                                className="rounded-lg bg-navy-700 px-4 py-1.5 text-xs text-gray-400"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-400">Live Preview</p>
                  <div className="flex gap-1 rounded-lg bg-navy-800 p-0.5">
                    {([['phone', Smartphone], ['tablet', Tablet], ['desktop', Monitor]] as const).map(([d, Icon]) => (
                      <button
                        key={d}
                        onClick={() => setDevice(d)}
                        className={`rounded-md p-1.5 transition-colors ${device === d ? 'bg-navy-600 text-white' : 'text-gray-600 hover:text-gray-400'}`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center rounded-2xl bg-navy-950 p-6">
                  <div className={`${deviceWidth} ${deviceHeight} ${deviceRadius} overflow-hidden border-2 border-navy-600 bg-white shadow-2xl transition-all`}>
                    <div className="flex h-full flex-col items-center justify-center p-5 text-center">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500 text-sm font-bold text-white">
                        P
                      </div>
                      {previewStep === 0 && (
                        <>
                          <h3 className="mb-1.5 text-sm font-semibold text-gray-900">Verify your age</h3>
                          <p className="mb-5 text-xs text-gray-500">Quick verification to continue</p>
                          <button className="w-full rounded-xl bg-purple-500 py-2.5 text-xs font-medium text-white">Continue</button>
                        </>
                      )}
                      {previewStep === 1 && (
                        <>
                          <h3 className="mb-1.5 text-sm font-semibold text-gray-900">Quick age check</h3>
                          <p className="mb-4 text-xs text-gray-500">Look at the camera briefly</p>
                          <div className="mb-4 h-16 w-16 rounded-full bg-gray-100" />
                          <button className="w-full rounded-xl bg-purple-500 py-2.5 text-xs font-medium text-white">Enable Camera</button>
                        </>
                      )}
                      {previewStep === 2 && (
                        <>
                          <div className="mb-2 text-xl">⚠️</div>
                          <h3 className="mb-1.5 text-sm font-semibold text-gray-900">Appeal decision</h3>
                          <p className="mb-5 text-xs text-gray-500">Upload ID to verify</p>
                          <button className="w-full rounded-xl bg-purple-500 py-2.5 text-xs font-medium text-white">Submit Appeal</button>
                        </>
                      )}
                      {previewStep === 3 && (
                        <>
                          <h3 className="mb-1.5 text-sm font-semibold text-gray-900">Parental consent</h3>
                          <p className="mb-5 text-xs text-gray-500">A parent needs to approve</p>
                          <button className="w-full rounded-xl bg-purple-500 py-2.5 text-xs font-medium text-white">Send Request</button>
                        </>
                      )}
                      <p className="mt-2 text-[9px] text-gray-400">Powered by Compliance Studio</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-center gap-1">
                  <button
                    onClick={() => setPreviewStep(Math.max(0, previewStep - 1))}
                    disabled={previewStep === 0}
                    className="p-1 text-gray-500 disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {PREVIEW_STEPS.map((s, i) => (
                    <button
                      key={s}
                      onClick={() => setPreviewStep(i)}
                      className={`rounded-full px-2 py-0.5 text-[11px] ${
                        i === previewStep ? 'bg-purple-500/20 text-purple-400' : 'text-gray-600'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                  <button
                    onClick={() => setPreviewStep(Math.min(PREVIEW_STEPS.length - 1, previewStep + 1))}
                    disabled={previewStep === PREVIEW_STEPS.length - 1}
                    className="p-1 text-gray-500 disabled:opacity-30"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-3 text-center text-xs text-gray-600">
                  Walk through the experience your users will see
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={() => navigate('/setup/brand')}
              className="rounded-xl border border-navy-600 px-6 py-3 text-sm text-gray-400 transition-colors hover:border-gray-500 hover:text-white"
            >
              Back
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/products')}
                className="rounded-xl border border-navy-600 px-6 py-3 text-sm text-gray-400 transition-colors hover:border-gray-500 hover:text-white"
              >
                Save Draft
              </button>
              <button className="rounded-xl border border-navy-600 px-6 py-3 text-sm text-gray-400 transition-colors hover:border-purple-500/50 hover:text-purple-400">
                Test First
              </button>
              <button
                onClick={handleGoLive}
                disabled={launching}
                className="flex items-center gap-2 rounded-xl bg-purple-500 px-8 py-3 text-[15px] font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:bg-purple-600 disabled:opacity-70"
              >
                {launching ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Going Live...
                  </>
                ) : (
                  'Go Live'
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
