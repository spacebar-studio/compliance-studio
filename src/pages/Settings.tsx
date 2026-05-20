import { useState } from 'react'
import { PageWrapper } from '../components/Layout'
import { motion } from 'framer-motion'
import { Copy, Check, Plus, Trash2, RotateCw } from 'lucide-react'

export default function Settings() {
  const [copiedLive, setCopiedLive] = useState(false)
  const [copiedTest, setCopiedTest] = useState(false)

  function handleCopy(text: string, setter: (v: boolean) => void) {
    navigator.clipboard.writeText(text).catch(() => {})
    setter(true)
    setTimeout(() => setter(false), 2000)
  }

  return (
    <PageWrapper>
      <div className="mx-auto max-w-3xl px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-8 text-2xl font-bold tracking-tight">Settings</h1>

          <div className="space-y-6">
            <section className="rounded-2xl border border-navy-700/50 bg-navy-800/30 p-6">
              <h2 className="mb-5 text-base font-semibold">Organization</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs text-gray-500">Company name</label>
                  <input
                    type="text"
                    defaultValue="Acme Games Inc."
                    className="w-full rounded-lg border border-navy-600 bg-navy-800 px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-xs text-gray-500">Team members</label>
                    <button className="flex items-center gap-1.5 rounded-lg bg-purple-500/10 px-3 py-1.5 text-xs text-purple-400 transition-colors hover:bg-purple-500/20">
                      <Plus className="h-3 w-3" />
                      Invite
                    </button>
                  </div>
                  <div className="space-y-2">
                    <MemberRow name="Tulcy Patel" email="tulcy@acme.com" role="Owner" />
                    <MemberRow name="Nina Johnson" email="nina@acme.com" role="Admin" />
                    <MemberRow name="Jacob Torres" email="jacob@acme.com" role="Developer" />
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-navy-700/50 bg-navy-800/30 p-6">
              <h2 className="mb-5 text-base font-semibold">API Keys</h2>
              <div className="space-y-3">
                <KeyRow
                  label="Live"
                  value="pk_live_a1b2c3d4e5f6g7h8"
                  copied={copiedLive}
                  onCopy={() => handleCopy('pk_live_a1b2c3d4e5f6g7h8', setCopiedLive)}
                />
                <KeyRow
                  label="Test"
                  value="pk_test_x9y8z7w6v5u4t3s2"
                  copied={copiedTest}
                  onCopy={() => handleCopy('pk_test_x9y8z7w6v5u4t3s2', setCopiedTest)}
                />
              </div>
            </section>

            <section className="rounded-2xl border border-navy-700/50 bg-navy-800/30 p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-base font-semibold">Webhooks</h2>
                <button className="flex items-center gap-1.5 rounded-lg bg-purple-500/10 px-3 py-1.5 text-xs text-purple-400 transition-colors hover:bg-purple-500/20">
                  <Plus className="h-3 w-3" />
                  Add
                </button>
              </div>
              <div className="rounded-xl border border-navy-600 bg-navy-800 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-300">https://api.acme.com/webhooks/compliance</p>
                    <div className="mt-1.5 flex gap-1.5">
                      <span className="rounded bg-navy-600 px-2 py-0.5 text-[11px] text-gray-400">verification.complete</span>
                      <span className="rounded bg-navy-600 px-2 py-0.5 text-[11px] text-gray-400">appeal.filed</span>
                      <span className="rounded bg-navy-600 px-2 py-0.5 text-[11px] text-gray-400">consent.granted</span>
                    </div>
                  </div>
                  <button className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-navy-700 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-navy-700/50 bg-navy-800/30 p-6">
              <h2 className="mb-5 text-base font-semibold">Notifications</h2>
              <div className="space-y-3">
                <NotificationToggle label="Verification failures" description="Alert when verification success rate drops below threshold" defaultOn />
                <NotificationToggle label="Appeal submissions" description="Notify when a user files an age appeal" defaultOn />
                <NotificationToggle label="Weekly summary" description="Email digest of verification metrics" />
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}

function MemberRow({ name, email, role }: { name: string; email: string; role: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-navy-800 p-3">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 text-xs font-medium text-purple-400">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p className="text-sm text-gray-300">{name}</p>
          <p className="text-xs text-gray-600">{email}</p>
        </div>
      </div>
      <span className="rounded bg-navy-600 px-2 py-0.5 text-[11px] text-gray-400">{role}</span>
    </div>
  )
}

function KeyRow({ label, value, copied, onCopy }: { label: string; value: string; copied: boolean; onCopy: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-navy-800 p-3">
      <div className="flex items-center gap-3">
        <span className={`rounded px-2 py-0.5 text-[11px] font-medium ${
          label === 'Live' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-amber-400/10 text-amber-400'
        }`}>
          {label}
        </span>
        <span className="font-mono text-sm text-gray-400">{value}</span>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={onCopy} className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-navy-700 hover:text-gray-300">
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
        <button className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-navy-700 hover:text-gray-300">
          <RotateCw className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

function NotificationToggle({ label, description, defaultOn = false }: { label: string; description: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div className="flex items-start justify-between rounded-lg bg-navy-800 p-3">
      <div>
        <p className="text-sm text-gray-300">{label}</p>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative mt-0.5 h-7 w-12 shrink-0 rounded-full transition-colors ${on ? 'bg-purple-500' : 'bg-navy-600'}`}
      >
        <div
          className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${on ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
    </div>
  )
}
