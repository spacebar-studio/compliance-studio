import { Link } from 'react-router-dom'
import { PageWrapper } from '../../components/v2/Layout'
import { motion } from 'framer-motion'
import { Check, Copy, ExternalLink } from 'lucide-react'
import { useState } from 'react'

export default function SetupSuccess() {
  const [copied, setCopied] = useState<string | null>(null)

  function handleCopy(key: string, text: string) {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <PageWrapper>
      <div className="v2-dotgrid relative min-h-screen">
        <div className="pointer-events-none absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-emerald-400/[0.05] blur-[100px]" />

        <div className="mx-auto max-w-2xl px-8 py-24">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="text-center">

            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400/10">
              <Check className="h-8 w-8 text-emerald-400" />
            </motion.div>

            <h1 className="mb-3 text-3xl font-bold tracking-tight text-white">Pixel Quest is live</h1>
            <p className="mb-12 text-[15px] text-white/45">Age verification active. Integrate with one SDK call.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-4">

            <CodeBlock
              label="01"
              title="install"
              code="npm install @kidentity/compliance-sdk"
              copied={copied === 'install'}
              onCopy={() => handleCopy('install', 'npm install @kidentity/compliance-sdk')}
            />

            <div className="v2-grain overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015]">
              <div className="flex items-center justify-between border-b border-white/[0.04] px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="v2-mono text-[10px] font-bold text-white/15">02</span>
                  <span className="v2-mono text-[11px] text-white/40">initialize + verify</span>
                </div>
                <button onClick={() => handleCopy('init', 'kit.verify()')} className="flex items-center gap-1.5 v2-mono text-[10px] text-white/20 hover:text-white/40">
                  {copied === 'init' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  {copied === 'init' ? 'copied' : 'copy'}
                </button>
              </div>
              <div className="p-5">
                <pre className="v2-mono overflow-x-auto text-[12px] leading-[1.8]">
                  <code>
                    <span className="text-purple-400">import</span><span className="text-white/40"> {'{ ComplianceKit }'} </span><span className="text-purple-400">from</span><span className="text-cyan-400/60"> '@kidentity/compliance-sdk'</span>{'\n'}
                    {'\n'}
                    <span className="text-white/40">const kit = </span><span className="text-purple-400">new</span><span className="text-white/40"> ComplianceKit</span><span className="text-white/20">{'({'}</span>{'\n'}
                    <span className="text-white/20">  apiKey: </span><span className="text-cyan-400/60">'pk_live_a1b2c3d4e5f6g7h8'</span><span className="text-white/20">,</span>{'\n'}
                    <span className="text-white/20">  productId: </span><span className="text-cyan-400/60">'prod_pixel_quest_9x8y7z'</span>{'\n'}
                    <span className="text-white/20">{'})'}</span>{'\n'}
                    {'\n'}
                    <span className="text-white/10">// call at your sign-up / access point</span>{'\n'}
                    <span className="text-white/60">kit.</span><span className="text-emerald-400/70">verify</span><span className="text-white/20">()</span>
                  </code>
                </pre>
              </div>
            </div>

            <div className="v2-grain flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.015] px-5 py-4">
              <div>
                <p className="v2-mono text-[10px] text-white/35">API KEY</p>
                <p className="v2-mono mt-1 text-[13px] text-white/50">pk_live_a1b2c3d4e5f6g7h8</p>
              </div>
              <button onClick={() => handleCopy('key', 'pk_live_a1b2c3d4e5f6g7h8')} className="rounded-lg bg-white/[0.04] p-2 text-white/20 hover:bg-white/[0.08] hover:text-white/40">
                {copied === 'key' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-10 flex items-center justify-center gap-4">
            <Link to="/products/pixel-quest"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:shadow-[0_0_30px_rgba(124,92,252,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative">View Dashboard</span>
            </Link>
            <a href="#" className="flex items-center gap-2 v2-mono rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-3.5 text-[12px] text-white/30 hover:text-white/50">
              docs <ExternalLink className="h-3 w-3" />
            </a>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}

function CodeBlock({ label, title, code, copied, onCopy }: { label: string; title: string; code: string; copied: boolean; onCopy: () => void }) {
  return (
    <div className="v2-grain flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.015] px-5 py-4">
      <div className="flex items-center gap-3">
        <span className="v2-mono text-[10px] font-bold text-white/30">{label}</span>
        <span className="v2-mono text-[11px] text-white/50">{title}</span>
        <code className="v2-mono rounded-lg bg-white/[0.03] px-3 py-1 text-[12px] text-cyan-400/70">{code}</code>
      </div>
      <button onClick={onCopy} className="flex items-center gap-1.5 v2-mono text-[10px] text-white/20 hover:text-white/40">
        {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
        {copied ? 'copied' : 'copy'}
      </button>
    </div>
  )
}
