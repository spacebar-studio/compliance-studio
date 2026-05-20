import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageWrapper } from '../../components/v3/Layout'
import { motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'

const sdkCode = 'npm install @kidentity/compliance-sdk'
const initCode = `import { ComplianceKit } from '@kidentity/compliance-sdk'

const kit = new ComplianceKit({
  apiKey: 'pk_live_a1b2c3d4e5f6g7h8',
  productId: 'prod_pixel_quest_9x8y7z',
})

kit.verify()`

export default function SetupSuccess() {
  const [copied, setCopied] = useState<string | null>(null)

  function copy(text: string, id: string) {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <PageWrapper>
      <div className="flex min-h-screen items-center justify-center px-8">
        <div className="w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 180, damping: 14 }}
              className="mx-auto mb-10 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10"
            >
              <Check className="h-7 w-7 text-emerald-400" />
            </motion.div>

            <h1 className="mb-5 text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-white">
              You're live.
            </h1>
            <p className="mb-20 text-[17px] leading-relaxed text-white/25">
              Pixel Quest is protected. Add the SDK to start verifying users.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <CodeBlock
              label="Install"
              code={sdkCode}
              copied={copied === 'sdk'}
              onCopy={() => copy(sdkCode, 'sdk')}
            />
            <CodeBlock
              label="Initialize"
              code={initCode}
              copied={copied === 'init'}
              onCopy={() => copy(initCode, 'init')}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-20 flex items-center justify-center gap-5"
          >
            <Link
              to="/products/pixel-quest"
              className="rounded-full bg-white px-7 py-2.5 text-[14px] font-semibold text-navy-950 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              View dashboard
            </Link>
            <Link
              to="/products"
              className="rounded-full px-5 py-2.5 text-[14px] text-white/25 transition-colors hover:text-white/45"
            >
              All products
            </Link>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}

function CodeBlock({ label, code, copied, onCopy }: { label: string; code: string; copied: boolean; onCopy: () => void }) {
  return (
    <div className="rounded-2xl border border-white/[0.04] bg-white/[0.02] p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[13px] text-white/30">{label}</span>
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 text-[12px] text-white/20 transition-colors hover:text-white/40"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto text-[13px] leading-[1.8] text-white/50">
        <code>{code}</code>
      </pre>
    </div>
  )
}
