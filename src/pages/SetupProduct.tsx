import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageWrapper } from '../components/Layout'
import { motion } from 'framer-motion'
import { Gamepad2, Smartphone, MessageSquare, Tv, Settings, Globe, Tablet, Layers } from 'lucide-react'

const PRODUCT_TYPES = [
  { id: 'game', label: 'Game', icon: Gamepad2 },
  { id: 'app', label: 'App', icon: Smartphone },
  { id: 'social', label: 'Social', icon: MessageSquare },
  { id: 'content', label: 'Content', icon: Tv },
  { id: 'other', label: 'Other', icon: Settings },
]

const PLATFORMS = [
  { id: 'ios', label: 'iOS', icon: Smartphone },
  { id: 'android', label: 'Android', icon: Tablet },
  { id: 'web', label: 'Web', icon: Globe },
  { id: 'multi', label: 'Multi-platform', icon: Layers },
]

const AUDIENCES = [
  { id: 'all', label: 'All ages', desc: 'Kids, teens, and adults' },
  { id: 'teens', label: '13+ (teens & adults)', desc: 'No children under 13' },
  { id: 'adults', label: '18+ (adults only)', desc: 'Adult content or services' },
  { id: 'unsure', label: 'I\'m not sure', desc: 'We\'ll help you figure it out' },
]

export default function SetupProduct() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [platform, setPlatform] = useState('')
  const [audience, setAudience] = useState('')
  const [url, setUrl] = useState('')
  const [showFollowUp, setShowFollowUp] = useState(false)

  const isValid = name && type && platform && audience

  function handleAudience(id: string) {
    setAudience(id)
    setShowFollowUp(id === 'unsure')
  }

  return (
    <PageWrapper>
      <div className="mx-auto max-w-2xl px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Tell us about your product</h1>
          <p className="mb-10 text-gray-400">We'll handle the compliance setup for you.</p>

          <div className="space-y-8">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Product name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Pixel Quest"
                className="w-full rounded-xl border border-navy-600 bg-navy-800 px-4 py-3 text-[15px] text-white placeholder-gray-600 outline-none transition-colors focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30"
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-gray-300">What are you building?</label>
              <div className="grid grid-cols-5 gap-2">
                {PRODUCT_TYPES.map((t) => {
                  const Icon = t.icon
                  const selected = type === t.id
                  return (
                    <button
                      key={t.id}
                      onClick={() => setType(t.id)}
                      className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-sm transition-all ${
                        selected
                          ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                          : 'border-navy-600 bg-navy-800/50 text-gray-400 hover:border-navy-500 hover:text-gray-300'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {t.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-gray-300">Where does it run?</label>
              <div className="grid grid-cols-4 gap-2">
                {PLATFORMS.map((p) => {
                  const Icon = p.icon
                  const selected = platform === p.id
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPlatform(p.id)}
                      className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-sm transition-all ${
                        selected
                          ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                          : 'border-navy-600 bg-navy-800/50 text-gray-400 hover:border-navy-500 hover:text-gray-300'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {p.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-gray-300">Who's your audience?</label>
              <div className="grid grid-cols-2 gap-2">
                {AUDIENCES.map((a) => {
                  const selected = audience === a.id
                  return (
                    <button
                      key={a.id}
                      onClick={() => handleAudience(a.id)}
                      className={`rounded-xl border px-4 py-3.5 text-left transition-all ${
                        selected
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-navy-600 bg-navy-800/50 hover:border-navy-500'
                      }`}
                    >
                      <p className={`text-sm font-medium ${selected ? 'text-purple-400' : 'text-gray-300'}`}>
                        {a.label}
                      </p>
                      <p className="text-xs text-gray-500">{a.desc}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {showFollowUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="overflow-hidden rounded-xl border border-purple-500/20 bg-purple-500/5 p-5"
              >
                <p className="mb-4 text-sm font-medium text-purple-400">Let's figure it out together</p>
                <div className="space-y-3">
                  <FollowUpQuestion
                    question="Will users under 13 access your product?"
                    options={['Yes', 'No', 'Possibly']}
                  />
                  <FollowUpQuestion
                    question="Does your product collect personal data?"
                    options={['Yes', 'No', 'I\'m not sure']}
                  />
                  <FollowUpQuestion
                    question="Is your product available in the EU?"
                    options={['Yes', 'No', 'Planning to']}
                  />
                </div>
                <div className="mt-4 rounded-lg bg-navy-800 p-3">
                  <p className="text-xs text-gray-400">
                    Based on your answers, we recommend <span className="font-medium text-purple-400">full compliance coverage</span> with
                    age assurance + parental consent.
                  </p>
                </div>
              </motion.div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                App URL or store link <span className="text-gray-600">(optional)</span>
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://"
                className="w-full rounded-xl border border-navy-600 bg-navy-800 px-4 py-3 text-[15px] text-white placeholder-gray-600 outline-none transition-colors focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30"
              />
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <button
              onClick={() => isValid && navigate('/setup/brand')}
              disabled={!isValid}
              className="rounded-xl bg-purple-500 px-8 py-3 text-[15px] font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:bg-purple-600 disabled:opacity-40 disabled:shadow-none"
            >
              Continue
            </button>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}

function FollowUpQuestion({ question, options }: { question: string; options: string[] }) {
  const [selected, setSelected] = useState('')
  return (
    <div>
      <p className="mb-2 text-sm text-gray-300">{question}</p>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className={`rounded-lg px-3 py-1.5 text-xs transition-all ${
              selected === opt
                ? 'bg-purple-500 text-white'
                : 'bg-navy-700 text-gray-400 hover:text-gray-300'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
