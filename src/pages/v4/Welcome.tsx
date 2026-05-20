import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Welcome() {
  return (
    <div className="relative flex min-h-screen flex-col bg-navy-950">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.03] blur-[180px]" />

      <nav className="relative z-10 flex items-center justify-between px-10 py-8">
        <span className="text-[13px] font-semibold text-white/50">Compliance Studio</span>
        <Link to="/products" className="text-[13px] text-white/25 transition-colors hover:text-white/50">
          Sign in
        </Link>
      </nav>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10"
          >
            <svg className="h-5 w-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.div>

          <h1 className="mb-6 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.92] tracking-[-0.045em] text-white">
            Paste your URL.
            <br />
            <span className="text-white/20">We'll handle the rest.</span>
          </h1>

          <p className="mx-auto mb-16 max-w-md text-[17px] leading-relaxed text-white/25">
            Enter your product URL and our AI analyzes everything — compliance needs, branding, configuration — in seconds.
          </p>

          <Link
            to="/setup"
            className="inline-block rounded-full bg-white px-8 py-3.5 text-[15px] font-semibold text-navy-950 transition-all hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] active:scale-[0.98]"
          >
            Get started
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
