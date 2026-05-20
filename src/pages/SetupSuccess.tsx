import { Link } from 'react-router-dom'
import { PageWrapper } from '../components/Layout'
import { motion } from 'framer-motion'
import { Check, Copy, ExternalLink } from 'lucide-react'
import { useState } from 'react'

export default function SetupSuccess() {
  const [copiedSDK, setCopiedSDK] = useState(false)
  const [copiedInit, setCopiedInit] = useState(false)

  function copyToClipboard(text: string, setter: (v: boolean) => void) {
    navigator.clipboard.writeText(text).catch(() => {})
    setter(true)
    setTimeout(() => setter(false), 2000)
  }

  const sdkCode = 'npm install @kidentity/compliance-sdk'
  const initCode = `import { ComplianceKit } from '@kidentity/compliance-sdk';

const kit = new ComplianceKit({
  apiKey: 'pk_live_a1b2c3d4e5f6g7h8',
  productId: 'prod_pixel_quest_9x8y7z'
});

// Call this at your sign-up / access point
kit.verify();`

  return (
    <PageWrapper>
      <div className="mx-auto max-w-2xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10"
          >
            <Check className="h-8 w-8 text-emerald-400" />
          </motion.div>

          <h1 className="mb-3 text-3xl font-bold tracking-tight">Pixel Quest is live</h1>
          <p className="mb-12 text-gray-400">
            Your age verification is active and ready for users. Here's how to integrate it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="rounded-2xl border border-navy-700/50 bg-navy-800/30 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-300">1. Install the SDK</h3>
              <button
                onClick={() => copyToClipboard(sdkCode, setCopiedSDK)}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-gray-500 transition-colors hover:bg-navy-700 hover:text-gray-300"
              >
                {copiedSDK ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                {copiedSDK ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="rounded-xl bg-navy-950 p-4">
              <code className="text-sm text-purple-400">{sdkCode}</code>
            </div>
          </div>

          <div className="rounded-2xl border border-navy-700/50 bg-navy-800/30 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-300">2. Initialize & verify</h3>
              <button
                onClick={() => copyToClipboard(initCode, setCopiedInit)}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-gray-500 transition-colors hover:bg-navy-700 hover:text-gray-300"
              >
                {copiedInit ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                {copiedInit ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="rounded-xl bg-navy-950 p-4">
              <pre className="overflow-x-auto text-sm leading-relaxed">
                <code>
                  {initCode.split('\n').map((line, i) => (
                    <div key={i}>
                      {line.includes('import') || line.includes('from') ? (
                        <span className="text-purple-400">{line}</span>
                      ) : line.includes('//') ? (
                        <span className="text-gray-600">{line}</span>
                      ) : line.includes("'") ? (
                        <span>
                          {line.split("'").map((part, j) =>
                            j % 2 === 1 ? (
                              <span key={j} className="text-emerald-400">'{part}'</span>
                            ) : (
                              <span key={j} className="text-gray-300">{part}</span>
                            )
                          )}
                        </span>
                      ) : (
                        <span className="text-gray-300">{line}</span>
                      )}
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>

          <div className="rounded-2xl border border-navy-700/50 bg-navy-800/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-300">API Key</h3>
                <p className="mt-1 font-mono text-sm text-gray-500">pk_live_a1b2c3d4e5f6g7h8</p>
              </div>
              <button
                onClick={() => copyToClipboard('pk_live_a1b2c3d4e5f6g7h8', setCopiedSDK)}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-gray-500 transition-colors hover:bg-navy-700 hover:text-gray-300"
              >
                <Copy className="h-3 w-3" />
                Copy
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Link
            to="/products/pixel-quest"
            className="flex items-center gap-2 rounded-xl bg-purple-500 px-7 py-3 text-[15px] font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:bg-purple-600"
          >
            View Dashboard
          </Link>
          <a
            href="#"
            className="flex items-center gap-2 rounded-xl border border-navy-600 px-7 py-3 text-sm text-gray-400 transition-colors hover:border-gray-500 hover:text-white"
          >
            Read Full Docs
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
