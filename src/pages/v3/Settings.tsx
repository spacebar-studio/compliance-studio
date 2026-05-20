import { useState } from 'react'
import { PageWrapper } from '../../components/v3/Layout'
import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'

const TEAM = [
  { name: 'Tulcy Patel', email: 'tulcy@acme.com', role: 'Owner' },
  { name: 'Nina Johnson', email: 'nina@acme.com', role: 'Admin' },
  { name: 'Jacob Torres', email: 'jacob@acme.com', role: 'Developer' },
]

const NOTIFICATIONS = [
  { id: 'failures', label: 'Verification failures', defaultOn: true },
  { id: 'appeals', label: 'Appeal submissions', defaultOn: true },
  { id: 'weekly', label: 'Weekly summary', defaultOn: false },
]

export default function Settings() {
  const [copied, setCopied] = useState<string | null>(null)

  function copy(text: string, id: string) {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <PageWrapper>
      <div className="mx-auto max-w-2xl px-8 py-28">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <h1 className="mb-20 text-[32px] font-bold tracking-[-0.03em] text-white">Settings</h1>

          {/* Organization */}
          <Section title="Organization">
            <div className="border-b border-white/[0.04] py-5">
              <label className="mb-3 block text-[12px] text-white/20">Company name</label>
              <input
                type="text"
                defaultValue="Acme Games Inc."
                className="w-full bg-transparent text-[15px] text-white/70 outline-none placeholder-white/15 focus:text-white"
              />
            </div>
          </Section>

          {/* Team */}
          <Section title="Team">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.email}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center justify-between border-b border-white/[0.04] py-5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.04] text-[12px] font-medium text-white/30">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-[14px] text-white/60">{member.name}</p>
                    <p className="mt-1 text-[12px] text-white/15">{member.email}</p>
                  </div>
                </div>
                <span className="text-[12px] text-white/20">{member.role}</span>
              </motion.div>
            ))}
          </Section>

          {/* API Keys */}
          <Section title="API Keys">
            <KeyRow
              label="Live"
              value="pk_live_a1b2c3d4e5f6g7h8"
              copied={copied === 'live'}
              onCopy={() => copy('pk_live_a1b2c3d4e5f6g7h8', 'live')}
              dotColor="bg-emerald-400"
            />
            <KeyRow
              label="Test"
              value="pk_test_x9y8z7w6v5u4t3s2"
              copied={copied === 'test'}
              onCopy={() => copy('pk_test_x9y8z7w6v5u4t3s2', 'test')}
              dotColor="bg-amber-400"
            />
          </Section>

          {/* Notifications */}
          <Section title="Notifications">
            {NOTIFICATIONS.map((n) => (
              <NotificationRow key={n.id} label={n.label} defaultOn={n.defaultOn} />
            ))}
          </Section>
        </motion.div>
      </div>
    </PageWrapper>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-16">
      <h2 className="mb-6 text-[13px] font-medium uppercase tracking-[0.08em] text-white/15">{title}</h2>
      {children}
    </div>
  )
}

function KeyRow({ label, value, copied, onCopy, dotColor }: { label: string; value: string; copied: boolean; onCopy: () => void; dotColor: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.04] py-5">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
          <span className="text-[12px] text-white/25">{label}</span>
        </div>
        <code className="text-[13px] text-white/40">{value}</code>
      </div>
      <button
        onClick={onCopy}
        className="flex items-center gap-1.5 text-[12px] text-white/20 transition-colors hover:text-white/40"
      >
        {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}

function NotificationRow({ label, defaultOn }: { label: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div className="flex items-center justify-between border-b border-white/[0.04] py-5">
      <span className="text-[14px] text-white/40">{label}</span>
      <button
        onClick={() => setOn(!on)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${on ? 'bg-white/20' : 'bg-white/[0.06]'}`}
      >
        <div
          className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${on ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
    </div>
  )
}
