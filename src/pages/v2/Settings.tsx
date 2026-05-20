import { useState } from 'react'
import { PageWrapper } from '../../components/v2/Layout'
import { motion } from 'framer-motion'
import { Copy, Check, Plus, Trash2, RotateCw } from 'lucide-react'

export default function Settings() {
  const [copied, setCopied] = useState<string | null>(null)

  function handleCopy(key: string, text: string) {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <PageWrapper>
      <div className="v2-dotgrid relative min-h-screen">
        <div className="mx-auto max-w-3xl px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="mb-8 text-2xl font-bold tracking-tight">Settings</h1>

            <div className="space-y-6">
              <Section label="ORGANIZATION">
                <div className="space-y-4">
                  <div>
                    <label className="v2-mono mb-2 block text-[10px] text-white/20">COMPANY NAME</label>
                    <input defaultValue="Acme Games Inc."
                      className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-[14px] text-white/70 outline-none focus:border-purple-500/30" />
                  </div>
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <label className="v2-mono text-[10px] text-white/35">TEAM</label>
                      <button className="v2-mono flex items-center gap-1.5 rounded-lg bg-purple-500/10 px-3 py-1.5 text-[10px] text-purple-400/70 hover:bg-purple-500/20">
                        <Plus className="h-3 w-3" /> invite
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      <Member initials="TP" name="Tulcy Patel" email="tulcy@acme.com" role="OWNER" />
                      <Member initials="NJ" name="Nina Johnson" email="nina@acme.com" role="ADMIN" />
                      <Member initials="JT" name="Jacob Torres" email="jacob@acme.com" role="DEV" />
                    </div>
                  </div>
                </div>
              </Section>

              <Section label="API KEYS">
                <div className="space-y-2">
                  <KeyRow label="LIVE" value="pk_live_a1b2c3d4e5f6g7h8" color="text-emerald-400 bg-emerald-400/10"
                    copied={copied === 'live'} onCopy={() => handleCopy('live', 'pk_live_a1b2c3d4e5f6g7h8')} />
                  <KeyRow label="TEST" value="pk_test_x9y8z7w6v5u4t3s2" color="text-amber-400 bg-amber-400/10"
                    copied={copied === 'test'} onCopy={() => handleCopy('test', 'pk_test_x9y8z7w6v5u4t3s2')} />
                </div>
              </Section>

              <Section label="WEBHOOKS">
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="v2-mono text-[12px] text-white/50">https://api.acme.com/webhooks/compliance</p>
                      <div className="mt-2 flex gap-1.5">
                        {['verification.complete', 'appeal.filed', 'consent.granted'].map(e => (
                          <span key={e} className="v2-mono rounded bg-white/[0.04] px-2 py-0.5 text-[9px] text-white/35">{e}</span>
                        ))}
                      </div>
                    </div>
                    <button className="rounded-lg p-2 text-white/10 hover:bg-white/[0.04] hover:text-red-400/60">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </Section>

              <Section label="NOTIFICATIONS">
                <div className="space-y-1.5">
                  <Toggle label="Verification failures" desc="Alert on success rate drops" defaultOn />
                  <Toggle label="Appeal submissions" desc="Notify on new appeals" defaultOn />
                  <Toggle label="Weekly summary" desc="Email digest of metrics" />
                </div>
              </Section>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="v2-grain rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6">
      <p className="v2-mono mb-5 text-[10px] font-semibold tracking-wide text-white/35">{label}</p>
      {children}
    </div>
  )
}

function Member({ initials, name, email, role }: { initials: string; name: string; email: string; role: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.03] p-3">
      <div className="flex items-center gap-3">
        <div className="v2-mono flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-purple-500/20 to-cyan-400/10 text-[10px] font-bold text-white/50">
          {initials}
        </div>
        <div>
          <p className="text-[13px] text-white/60">{name}</p>
          <p className="v2-mono text-[10px] text-white/35">{email}</p>
        </div>
      </div>
      <span className="v2-mono rounded bg-white/[0.04] px-2 py-0.5 text-[9px] text-white/35">{role}</span>
    </div>
  )
}

function KeyRow({ label, value, color, copied, onCopy }: { label: string; value: string; color: string; copied: boolean; onCopy: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.03] p-3">
      <div className="flex items-center gap-3">
        <span className={`v2-mono rounded px-2 py-0.5 text-[9px] font-bold ${color}`}>{label}</span>
        <span className="v2-mono text-[12px] text-white/45">{value}</span>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={onCopy} className="rounded-lg p-2 text-white/15 hover:bg-white/[0.04] hover:text-white/40">
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
        <button className="rounded-lg p-2 text-white/15 hover:bg-white/[0.04] hover:text-white/40">
          <RotateCw className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

function Toggle({ label, desc, defaultOn = false }: { label: string; desc: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.03] p-3">
      <div>
        <p className="text-[13px] text-white/60">{label}</p>
        <p className="v2-mono text-[10px] text-white/30">{desc}</p>
      </div>
      <button onClick={() => setOn(!on)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${on ? 'bg-purple-500' : 'bg-white/[0.06]'}`}>
        <div className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${on ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  )
}
