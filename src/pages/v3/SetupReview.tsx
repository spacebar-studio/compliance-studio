import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageWrapper } from '../../components/v3/Layout'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const ITEMS = [
  { label: 'Product', value: 'Pixel Quest — Game, iOS' },
  { label: 'Audience', value: 'Everyone (including under 13)' },
  { label: 'Age assurance', value: 'Facial estimation, 85% threshold' },
  { label: 'Parental consent', value: 'Email + ID verification' },
  { label: 'Appeal window', value: '24 hours, ID upload' },
  { label: 'Branding', value: 'Generated from logo' },
]

export default function SetupReview() {
  const navigate = useNavigate()
  const [launching, setLaunching] = useState(false)

  function handleLaunch() {
    setLaunching(true)
    setTimeout(() => navigate('/setup/success'), 1500)
  }

  return (
    <PageWrapper>
      <div className="flex min-h-screen items-center justify-center px-8">
        <div className="w-full max-w-lg">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <p className="mb-4 text-[13px] text-white/20">Step 3</p>
            <h1 className="mb-5 text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-white">
              Ready to go.
            </h1>
            <p className="mb-16 text-[17px] leading-relaxed text-white/25">
              We configured everything based on your inputs. Here's the summary.
            </p>

            <div className="space-y-0">
              {ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start justify-between border-b border-white/[0.04] py-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.06]">
                      <Check className="h-3.5 w-3.5 text-white/40" />
                    </div>
                    <span className="text-[15px] text-white/40">{item.label}</span>
                  </div>
                  <span className="text-right text-[15px] text-white/70">{item.value}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-20 flex items-center justify-between">
              <button onClick={() => navigate('/setup/brand')}
                className="text-[13px] text-white/20 transition-colors hover:text-white/40">
                ← Back
              </button>
              <div className="flex items-center gap-4">
                <button onClick={() => navigate('/products')}
                  className="rounded-full px-5 py-2.5 text-[14px] text-white/25 transition-colors hover:text-white/45">
                  Save draft
                </button>
                <button
                  onClick={handleLaunch}
                  disabled={launching}
                  className="rounded-full bg-white px-7 py-2.5 text-[14px] font-semibold text-navy-950 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                >
                  {launching ? (
                    <span className="flex items-center gap-2">
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-navy-950 border-t-transparent" />
                      Going live…
                    </span>
                  ) : 'Go live'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}
