import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Welcome() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-navy-950">
      {/* Dot grid background */}
      <div className="v2-dotgrid absolute inset-0 opacity-60" />

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-purple-500/[0.08] blur-[100px]" />
        <div className="absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full bg-cyan-400/[0.06] blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-purple-700/[0.05] blur-[100px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 opacity-80" />
            <svg className="relative z-10 h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
              <path d="M12 22V12" />
              <path d="M12 12L3 7" />
              <path d="M12 12l9-5" />
            </svg>
          </div>
          <span className="v2-mono text-[13px] font-semibold text-white/90">compliance.studio</span>
        </div>
        <Link
          to="/products"
          className="v2-mono rounded-md bg-white/[0.04] px-4 py-2 text-[12px] text-white/50 transition-all hover:bg-white/[0.08] hover:text-white/80"
        >
          sign in
        </Link>
      </nav>

      {/* Hero */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          {/* Tagline badge */}
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            <span className="v2-mono text-[11px] text-white/50">age compliance infrastructure</span>
          </div>

          {/* Headline */}
          <h1 className="mx-auto mb-6 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[0.95] tracking-[-0.04em]">
            <span className="text-white">Ship compliant.</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Not complicated.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-12 max-w-md text-[15px] leading-relaxed text-white/45">
            Age verification, assurance, and parental consent for your app.
            Three steps. One SDK call. Full compliance.
          </p>

          {/* CTA */}
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/setup"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 px-8 py-4 transition-all hover:shadow-[0_0_40px_rgba(124,92,252,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative flex items-center gap-2 text-[14px] font-semibold text-white">
                Set up your app
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Product preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 w-full max-w-4xl"
        >
          <div className="v2-glow-border p-px">
            <div className="v2-grain relative overflow-hidden rounded-[20px] bg-navy-900">
              {/* Browser chrome */}
              <div className="flex items-center justify-between border-b border-white/[0.04] px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-white/[0.06]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/[0.06]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/[0.06]" />
                </div>
                <div className="v2-mono rounded-md bg-white/[0.03] px-4 py-1 text-[10px] text-white/20">
                  your-app.com/signup
                </div>
                <div className="w-[52px]" />
              </div>

              {/* App content with verification modal */}
              <div className="relative flex items-center justify-center px-12 py-16">
                {/* Blurred background app */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 blur-sm">
                  <div className="h-40 w-80 rounded-xl bg-navy-700" />
                </div>

                {/* Verification card */}
                <div className="v2-scan-line relative w-[340px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0918] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                  <div className="absolute right-4 top-4 v2-mono text-[9px] text-white/10">
                    POWERED BY COMPLIANCE.STUDIO
                  </div>

                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400">
                      <span className="text-sm font-bold text-white">P</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Pixel Quest</p>
                      <p className="v2-mono text-[10px] text-white/40">verification required</p>
                    </div>
                  </div>

                  <p className="mb-6 text-[13px] leading-relaxed text-white/60">
                    Verify your age to continue. This takes less than 3 seconds.
                  </p>

                  <button className="mb-3 w-full rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 py-3.5 text-[13px] font-semibold text-white">
                    Continue
                  </button>
                  <button className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] py-3 text-[13px] text-white/40">
                    I have a parent code
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 flex items-center gap-8"
        >
          {['COPPA', 'SOC 2', 'GDPR', 'CCPA'].map((badge) => (
            <span key={badge} className="v2-mono text-[10px] font-semibold tracking-[0.15em] text-white/30">
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
