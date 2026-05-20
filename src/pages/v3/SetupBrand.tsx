import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageWrapper } from '../../components/v3/Layout'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Image, Monitor, Sparkles } from 'lucide-react'

type UploadState = { logo: boolean; banner: boolean; screen: boolean }

export default function SetupBrand() {
  const navigate = useNavigate()
  const [uploads, setUploads] = useState<UploadState>({ logo: false, banner: false, screen: false })
  const [generating, setGenerating] = useState(false)
  const [ready, setReady] = useState(false)


  const handleUpload = useCallback((key: keyof UploadState) => {
    setUploads(prev => {
      const next = { ...prev, [key]: true }
      const count = Object.values(next).filter(Boolean).length
      if (count >= 1 && !generating && !ready) {
        setGenerating(true)
        setTimeout(() => { setGenerating(false); setReady(true) }, 2400)
      }
      return next
    })
  }, [generating, ready])

  return (
    <PageWrapper>
      <div className="flex min-h-screen flex-col items-center justify-center px-8 py-24">
        <div className="w-full max-w-5xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>

            <div className="mb-6">
              <p className="mb-4 text-[13px] text-white/20">Step 2</p>
              <h1 className="mb-5 text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-white">
                {ready ? 'Your branded experience.' : 'Show us your product.'}
              </h1>
              <p className="max-w-md text-[17px] leading-relaxed text-white/25">
                {ready
                  ? 'We generated a verification flow that feels native to your product.'
                  : 'Upload your assets and we\'ll generate a verification experience that feels like it belongs.'}
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
              {/* Upload zones */}
              <div className="space-y-5">
                <UploadZone
                  label="Logo"
                  description="Your app icon or brand mark"
                  icon={Upload}
                  uploaded={uploads.logo}
                  onUpload={() => handleUpload('logo')}
                  preview={
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 text-xl font-bold text-white shadow-[0_4px_20px_rgba(124,92,252,0.3)]">
                      P
                    </div>
                  }
                />

                <UploadZone
                  label="Banner"
                  description="Hero image, splash screen, or key art"
                  icon={Image}
                  uploaded={uploads.banner}
                  onUpload={() => handleUpload('banner')}
                  preview={
                    <div className="h-14 w-full overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 via-purple-800 to-violet-900">
                      <div className="flex h-full items-center justify-center">
                        <span className="text-[13px] font-semibold text-white/60">Pixel Quest</span>
                      </div>
                    </div>
                  }
                />

                <UploadZone
                  label="UI Screenshot"
                  description="A screen from your app, game, or site"
                  icon={Monitor}
                  uploaded={uploads.screen}
                  onUpload={() => handleUpload('screen')}
                  preview={
                    <div className="h-14 w-full overflow-hidden rounded-xl border border-white/[0.06] bg-navy-950">
                      <div className="flex h-full items-center justify-center gap-2">
                        <div className="h-3 w-3 rounded bg-purple-500/40" />
                        <div className="space-y-1">
                          <div className="h-1.5 w-16 rounded bg-white/10" />
                          <div className="h-1 w-10 rounded bg-white/[0.05]" />
                        </div>
                      </div>
                    </div>
                  }
                />

                {generating && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 rounded-2xl border border-white/[0.04] bg-white/[0.02] px-6 py-5"
                  >
                    <Sparkles className="h-4 w-4 animate-pulse text-purple-400/60" />
                    <div>
                      <p className="text-[14px] text-white/40">Generating your experience...</p>
                      <p className="mt-1 text-[12px] text-white/15">Extracting colors, typography, and style</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Preview */}
              <div className="flex items-start justify-center lg:pt-2">
                <AnimatePresence mode="wait">
                  {ready ? (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="w-[300px]"
                    >
                      <div className="overflow-hidden rounded-[36px] border border-white/[0.06] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
                        {/* Status bar */}
                        <div className="flex items-center justify-between bg-gray-50 px-7 pt-3 pb-0">
                          <span className="text-[10px] font-medium text-gray-400">9:41</span>
                          <div className="flex items-center gap-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                            <div className="h-1.5 w-3 rounded-full bg-gray-300" />
                          </div>
                        </div>

                        {/* Banner area */}
                        <div className="relative h-28 bg-gradient-to-br from-indigo-900 via-purple-800 to-violet-900">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[15px] font-bold tracking-wide text-white/40">PIXEL QUEST</span>
                          </div>
                          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 text-lg font-bold text-white shadow-lg ring-4 ring-white">
                              P
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="px-8 pb-10 pt-12 text-center">
                          <h3 className="mb-2 text-[18px] font-semibold text-gray-900">Verify your age</h3>
                          <p className="mb-10 text-[14px] leading-relaxed text-gray-400">
                            A quick check to keep playing Pixel Quest safely
                          </p>

                          <button className="mb-4 w-full rounded-2xl bg-gradient-to-b from-purple-500 to-purple-600 py-4 text-[15px] font-semibold text-white shadow-sm">
                            Continue
                          </button>

                          <button className="w-full rounded-2xl border border-gray-200 py-3.5 text-[14px] font-medium text-gray-400">
                            I have a parent code
                          </button>

                          <div className="mt-8 flex items-center justify-center gap-2">
                            <div className="h-3 w-3 rounded bg-gradient-to-br from-purple-400 to-purple-600" />
                            <span className="text-[10px] font-medium tracking-wide text-gray-300">
                              Powered by <span className="text-gray-400">k-id</span> + <span className="text-gray-400">Compliance Studio</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : generating ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-[300px]"
                    >
                      <div className="overflow-hidden rounded-[36px] border border-white/[0.06] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
                        <div className="space-y-0 px-8 py-12">
                          <div className="mx-auto mb-6 h-28 w-full animate-pulse rounded-2xl bg-gray-100" />
                          <div className="mx-auto mb-3 h-14 w-14 animate-pulse rounded-2xl bg-gray-100" />
                          <div className="mx-auto mb-2 h-5 w-32 animate-pulse rounded-lg bg-gray-100" />
                          <div className="mx-auto mb-8 h-3 w-40 animate-pulse rounded-lg bg-gray-50" />
                          <div className="mx-auto h-12 w-full animate-pulse rounded-2xl bg-gray-100" />
                          <div className="mx-auto mt-3 h-12 w-full animate-pulse rounded-2xl bg-gray-50" />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-[300px]"
                    >
                      <div className="flex h-[520px] items-center justify-center rounded-[36px] border border-dashed border-white/[0.06]">
                        <p className="text-[14px] text-white/15">Preview appears here</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-20 flex items-center justify-between">
              <button onClick={() => navigate('/setup')}
                className="text-[13px] text-white/20 transition-colors hover:text-white/40">
                ← Back
              </button>
              <button
                onClick={() => navigate('/setup/review')}
                disabled={!ready}
                className="rounded-full bg-white px-6 py-2.5 text-[14px] font-semibold text-navy-950 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-15"
              >
                Continue
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}

function UploadZone({
  label,
  description,
  icon: Icon,
  uploaded,
  onUpload,
  preview,
}: {
  label: string
  description: string
  icon: React.ElementType
  uploaded: boolean
  onUpload: () => void
  preview: React.ReactNode
}) {
  return (
    <button
      onClick={onUpload}
      className={`flex w-full items-center gap-5 rounded-2xl border px-6 py-5 text-left transition-all ${
        uploaded
          ? 'border-white/[0.08] bg-white/[0.03]'
          : 'border-dashed border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.01]'
      }`}
    >
      <div className="w-14 shrink-0">
        {uploaded ? (
          preview
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.03]">
            <Icon className="h-5 w-5 text-white/15" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className={`text-[15px] font-medium ${uploaded ? 'text-white/60' : 'text-white/30'}`}>
          {label}
        </p>
        <p className="mt-1 text-[13px] text-white/15">
          {uploaded ? 'Uploaded' : description}
        </p>
      </div>
    </button>
  )
}
