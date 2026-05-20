import { useState } from 'react'
import { PageWrapper, BackButton } from '../components/Layout'
import ExpandableSection from '../components/ExpandableSection'
import PreviewPanel from '../components/PreviewPanel'
import { motion } from 'framer-motion'
import { Eye, Activity, TrendingUp, Clock, Zap } from 'lucide-react'

export default function ProductDashboard() {
  const [previewOpen, setPreviewOpen] = useState(false)

  return (
    <PageWrapper>
      <div className="mx-auto max-w-5xl px-6 py-12">
        <BackButton to="/products" label="Back to Products" />

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8 rounded-2xl border border-navy-700/50 bg-navy-800/30 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500 text-xl font-bold text-white">
                  P
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold">Pixel Quest</h1>
                    <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Live
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Game · iOS · All ages</p>
                </div>
              </div>
              <button
                onClick={() => setPreviewOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-purple-500/10 px-4 py-2.5 text-sm font-medium text-purple-400 transition-colors hover:bg-purple-500/20"
              >
                <Eye className="h-4 w-4" />
                Preview
              </button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <MetricCard icon={TrendingUp} label="Verified today" value="12,431" trend="+8%" />
              <MetricCard icon={Activity} label="Success rate" value="98.2%" trend="+0.3%" />
              <MetricCard icon={Clock} label="Avg time" value="< 3s" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-navy-700/50 bg-navy-800/30 p-6">
                <h2 className="mb-4 text-base font-semibold">Configuration</h2>

                <ExpandableSection title="Product Details" summary="Game · iOS · All ages" status="configured">
                  <div className="space-y-4">
                    <Field label="Product name" value="Pixel Quest" />
                    <Field label="Type" value="Game" />
                    <Field label="Platform" value="iOS" />
                    <Field label="Audience" value="All ages" />
                    <Field label="Risk level" value="Medium (auto-detected)" />
                    <div className="flex gap-2 pt-2">
                      <button className="rounded-lg bg-purple-500 px-4 py-2 text-xs font-medium text-white">Save</button>
                      <button className="rounded-lg bg-navy-700 px-4 py-2 text-xs text-gray-400">Cancel</button>
                    </div>
                  </div>
                </ExpandableSection>

                <ExpandableSection title="Branding" summary="AI-generated theme" status="configured">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500 text-lg font-bold text-white">P</div>
                      <button className="rounded-lg bg-navy-700 px-3 py-1.5 text-xs text-gray-400 hover:text-gray-300">Replace logo</button>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs text-gray-500">Color theme</label>
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-1">
                          {['#7C5CFC', '#1A1735', '#E8E0FF'].map((c) => (
                            <div key={c} className="h-7 w-7 rounded-full border-2 border-navy-800" style={{ backgroundColor: c }} />
                          ))}
                        </div>
                        <span className="flex items-center gap-1 text-xs text-purple-400">
                          <Zap className="h-3 w-3" /> AI-generated
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs text-gray-500">Corner radius</label>
                      <input type="range" min="0" max="24" defaultValue="12" className="w-48 accent-purple-500" />
                    </div>
                  </div>
                </ExpandableSection>

                <ExpandableSection title="Age Assurance" summary="Facial estimation" status="on">
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-xs text-gray-500">Verification method</label>
                      <div className="space-y-2">
                        <RadioOption label="Facial age estimation" selected />
                        <RadioOption label="ID document verification" />
                        <RadioOption label="Database lookup" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs text-gray-500">Confidence threshold</label>
                      <div className="flex items-center gap-3">
                        <input type="range" min="50" max="99" defaultValue="85" className="flex-1 accent-purple-500" />
                        <span className="text-sm text-gray-300">85%</span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button className="rounded-lg bg-purple-500 px-4 py-2 text-xs font-medium text-white">Save</button>
                      <button className="rounded-lg bg-navy-700 px-4 py-2 text-xs text-gray-400">Cancel</button>
                    </div>
                  </div>
                </ExpandableSection>

                <ExpandableSection title="Age Appeal" summary="24hr window" status="on">
                  <div className="space-y-4">
                    <Field label="Appeal window" value="24 hours" />
                    <Field label="Method" value="ID document upload" />
                    <ToggleField label="Auto-escalation" defaultOn />
                  </div>
                </ExpandableSection>

                <ExpandableSection title="Adult Verification" status="off">
                  <div className="rounded-lg bg-navy-800 p-4">
                    <p className="text-sm text-gray-400">Adult verification is not required for your configuration. Enable it if your product serves 18+ content.</p>
                    <button className="mt-3 rounded-lg bg-purple-500/10 px-4 py-2 text-xs text-purple-400 hover:bg-purple-500/20">Enable</button>
                  </div>
                </ExpandableSection>

                <ExpandableSection title="Parental Consent" summary="Email + ID flow" status="on">
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-xs text-gray-500">Consent method</label>
                      <div className="space-y-2">
                        <RadioOption label="Email + ID verification" selected />
                        <RadioOption label="Email only" />
                        <RadioOption label="Credit card verification" />
                      </div>
                    </div>
                    <Field label="Consent expiry" value="365 days" />
                    <ToggleField label="Re-consent on major updates" defaultOn />
                  </div>
                </ExpandableSection>

                <ExpandableSection title="Developer Settings" summary="SDK configured" status="configured">
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs text-gray-500">API Key (Live)</label>
                      <div className="flex items-center gap-2 rounded-lg bg-navy-950 p-3 font-mono text-sm text-gray-400">
                        pk_live_a1b2c3d4e5f6g7h8
                        <button className="ml-auto text-xs text-purple-400 hover:text-purple-300">Copy</button>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs text-gray-500">API Key (Test)</label>
                      <div className="flex items-center gap-2 rounded-lg bg-navy-950 p-3 font-mono text-sm text-gray-400">
                        pk_test_x9y8z7w6v5u4t3s2
                        <button className="ml-auto text-xs text-purple-400 hover:text-purple-300">Copy</button>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs text-gray-500">Webhook URL</label>
                      <input
                        type="url"
                        defaultValue="https://api.pixelquest.com/webhooks/compliance"
                        className="w-full rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs text-gray-500">Environment</label>
                      <div className="flex gap-2">
                        <button className="flex-1 rounded-lg bg-emerald-400/10 py-2 text-xs font-medium text-emerald-400">Production</button>
                        <button className="flex-1 rounded-lg bg-navy-700 py-2 text-xs text-gray-500">Sandbox</button>
                      </div>
                    </div>
                  </div>
                </ExpandableSection>
              </div>
            </div>

            <div>
              <div className="sticky top-24 space-y-4">
                <button
                  onClick={() => setPreviewOpen(true)}
                  className="w-full rounded-2xl border border-navy-700/50 bg-navy-800/30 p-5 text-left transition-all hover:border-purple-500/30"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <Eye className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium">Live Preview</span>
                  </div>
                  <div className="flex justify-center rounded-xl bg-navy-950 p-4">
                    <div className="h-32 w-20 rounded-lg border border-navy-600 bg-white p-2">
                      <div className="mx-auto mb-1.5 h-3 w-3 rounded bg-purple-500" />
                      <div className="mx-auto mb-1 h-1.5 w-10 rounded bg-gray-300" />
                      <div className="mx-auto mb-2 h-1 w-12 rounded bg-gray-200" />
                      <div className="mx-auto h-3 w-full rounded bg-purple-500" />
                    </div>
                  </div>
                  <p className="mt-3 text-center text-xs text-gray-500">
                    See what your users experience
                  </p>
                </button>

                <div className="rounded-2xl border border-navy-700/50 bg-navy-800/30 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-medium">Activity</h3>
                    <button className="text-xs text-purple-400 hover:text-purple-300">View all</button>
                  </div>
                  <div className="space-y-3">
                    <ActivityItem time="2:34 PM" action="Branding updated" user="Nina J." />
                    <ActivityItem time="11:20 AM" action="Threshold changed to 85%" user="Tulcy P." />
                    <ActivityItem time="May 15" action="Pushed to production" user="Nina J." />
                    <ActivityItem time="May 14" action="Parental consent enabled" user="Tulcy P." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <PreviewPanel
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        productName="Pixel Quest"
        colors={{ primary: '#7C5CFC', secondary: '#1A1735', bg: '#F5F3FF' }}
      />
    </PageWrapper>
  )
}

function MetricCard({ icon: Icon, label, value, trend }: { icon: React.ElementType; label: string; value: string; trend?: string }) {
  return (
    <div className="rounded-xl bg-navy-800/50 p-4">
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-4 w-4 text-gray-500" />
        <span className="text-xs text-gray-500">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-bold">{value}</span>
        {trend && <span className="text-xs text-emerald-400">{trend}</span>}
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs text-gray-500">{label}</label>
      <input
        type="text"
        defaultValue={value}
        className="w-full rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
      />
    </div>
  )
}

function RadioOption({ label, selected = false }: { label: string; selected?: boolean }) {
  return (
    <label className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 transition-all ${
      selected ? 'border-purple-500 bg-purple-500/10' : 'border-navy-600 hover:border-navy-500'
    }`}>
      <div className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
        selected ? 'border-purple-500' : 'border-gray-600'
      }`}>
        {selected && <div className="h-2 w-2 rounded-full bg-purple-500" />}
      </div>
      <span className={`text-sm ${selected ? 'text-purple-400' : 'text-gray-400'}`}>{label}</span>
    </label>
  )
}

function ToggleField({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-400">{label}</span>
      <button
        onClick={() => setOn(!on)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${on ? 'bg-purple-500' : 'bg-navy-600'}`}
      >
        <div
          className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${on ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
    </div>
  )
}

function ActivityItem({ time, action, user }: { time: string; action: string; user: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-[11px] text-gray-600 w-14">{time}</span>
      <div>
        <p className="text-sm text-gray-300">{action}</p>
        <p className="text-xs text-gray-600">{user}</p>
      </div>
    </div>
  )
}
