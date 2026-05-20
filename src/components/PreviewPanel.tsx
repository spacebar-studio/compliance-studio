import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Smartphone, Monitor, Tablet } from 'lucide-react'

const FLOW_STEPS = [
  { label: 'Age Gate', screen: 'age-gate' },
  { label: 'Estimation', screen: 'estimation' },
  { label: 'Appeal', screen: 'appeal' },
  { label: 'Consent', screen: 'consent' },
] as const

type FlowStep = typeof FLOW_STEPS[number]

interface PreviewPanelProps {
  open: boolean
  onClose: () => void
  productName?: string
  colors?: { primary: string; secondary: string; bg: string }
}

export default function PreviewPanel({ open, onClose, productName = 'Your App', colors }: PreviewPanelProps) {
  const [step, setStep] = useState(0)
  const [device, setDevice] = useState<'phone' | 'tablet' | 'desktop'>('phone')

  if (!open) return null

  const primary = colors?.primary || '#7C5CFC'
  const currentStep = FLOW_STEPS[step]

  const deviceWidth = device === 'phone' ? 'w-[280px]' : device === 'tablet' ? 'w-[400px]' : 'w-[500px]'
  const deviceHeight = device === 'phone' ? 'h-[560px]' : device === 'tablet' ? 'h-[500px]' : 'h-[420px]'

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl overflow-y-auto border-l border-navy-700 bg-navy-900">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-navy-700 bg-navy-900/95 px-6 py-4 backdrop-blur-sm">
          <h3 className="text-base font-semibold">Preview: {productName}</h3>
          <button onClick={onClose} className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-navy-700 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex gap-1 rounded-lg bg-navy-800 p-1">
              {([['phone', Smartphone], ['tablet', Tablet], ['desktop', Monitor]] as const).map(([d, Icon]) => (
                <button
                  key={d}
                  onClick={() => setDevice(d)}
                  className={`rounded-md p-2 transition-colors ${device === d ? 'bg-navy-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center rounded-2xl bg-navy-950 p-8">
            <div className={`${deviceWidth} ${deviceHeight} overflow-hidden rounded-[28px] border-2 border-navy-600 bg-white shadow-2xl`}>
              <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                <div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-white"
                  style={{ backgroundColor: primary }}
                >
                  {productName[0]}
                </div>
                <PreviewScreen step={currentStep} productName={productName} primary={primary} />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:text-white disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3">
              {FLOW_STEPS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  className={`rounded-full px-3 py-1 text-xs transition-colors ${
                    i === step ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(Math.min(FLOW_STEPS.length - 1, step + 1))}
              disabled={step === FLOW_STEPS.length - 1}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:text-white disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function PreviewScreen({ step, productName, primary }: { step: FlowStep; productName: string; primary: string }) {
  switch (step.screen) {
    case 'age-gate':
      return (
        <>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Verify your age</h3>
          <p className="mb-8 text-sm text-gray-500">
            {productName} requires age verification to continue
          </p>
          <button
            className="w-full rounded-xl px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: primary }}
          >
            Continue
          </button>
          <p className="mt-4 text-[11px] text-gray-400">Powered by Compliance Studio</p>
        </>
      )
    case 'estimation':
      return (
        <>
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Quick age check</h3>
          <p className="mb-8 text-sm text-gray-500">
            Look at the camera for a quick, private age estimation
          </p>
          <button
            className="w-full rounded-xl px-6 py-3 text-sm font-medium text-white"
            style={{ backgroundColor: primary }}
          >
            Enable Camera
          </button>
        </>
      )
    case 'appeal':
      return (
        <>
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-2xl">
            ⚠️
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Verification needed</h3>
          <p className="mb-8 text-sm text-gray-500">
            We couldn't verify your age. You can appeal this decision.
          </p>
          <button
            className="mb-3 w-full rounded-xl px-6 py-3 text-sm font-medium text-white"
            style={{ backgroundColor: primary }}
          >
            Submit Appeal
          </button>
          <button className="w-full rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-600">
            Try Again
          </button>
        </>
      )
    case 'consent':
      return (
        <>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Parental consent</h3>
          <p className="mb-6 text-sm text-gray-500">
            A parent or guardian needs to approve your account
          </p>
          <div className="mb-6 w-full rounded-lg border border-gray-200 p-3 text-left">
            <label className="mb-1 block text-xs text-gray-400">Parent's email</label>
            <p className="text-sm text-gray-600">parent@example.com</p>
          </div>
          <button
            className="w-full rounded-xl px-6 py-3 text-sm font-medium text-white"
            style={{ backgroundColor: primary }}
          >
            Send Request
          </button>
        </>
      )
  }
}
