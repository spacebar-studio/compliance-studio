import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Welcome() {
  return (
    <div className="relative flex min-h-screen flex-col bg-navy-950">
      {/* Single ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.04] blur-[150px]" />

      <nav className="relative z-10 flex items-center justify-between px-10 py-8">
        <span className="text-[13px] font-semibold text-white/50">Compliance Studio</span>
        <Link to="/products" className="text-[13px] text-white/25 transition-colors hover:text-white/50">
          Sign in
        </Link>
      </nav>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8 pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center"
        >
          <h1 className="mb-6 text-[clamp(3rem,7vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.045em] text-white">
            Age compliance
            <br />
            <span className="text-white/20">made simple.</span>
          </h1>

          <p className="mx-auto mb-16 max-w-sm text-[17px] leading-relaxed text-white/25">
            Three steps to protect your users and your product.
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
