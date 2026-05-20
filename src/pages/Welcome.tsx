import { Link } from 'react-router-dom'
import { Shield, ArrowRight, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Welcome() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-purple-500/[0.07] blur-[120px]" />
        <div className="absolute right-1/4 top-1/2 h-[400px] w-[400px] rounded-full bg-purple-700/[0.05] blur-[100px]" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight">Compliance Studio</span>
        </div>
        <Link
          to="/products"
          className="rounded-lg border border-navy-600 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
        >
          Sign In
        </Link>
      </nav>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-400">
            <Shield className="h-3.5 w-3.5" />
            Age compliance for modern apps
          </div>

          <h1 className="mx-auto mb-5 max-w-2xl text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl">
            Get compliant in{' '}
            <span className="bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
              minutes
            </span>
            , not months
          </h1>

          <p className="mx-auto mb-10 max-w-lg text-lg text-gray-400">
            Set up age verification, assurance, and parental consent for your app.
            Three steps. One integration. Full compliance.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              to="/setup"
              className="group flex items-center gap-2 rounded-xl bg-purple-500 px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:bg-purple-600 hover:shadow-purple-500/40"
            >
              Set Up Your App
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/products"
              className="rounded-xl border border-navy-600 px-7 py-3.5 text-[15px] font-medium text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
            >
              View Demo
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 w-full max-w-3xl"
        >
          <div className="rounded-2xl border border-navy-700/50 bg-navy-800/30 p-1.5">
            <div className="rounded-xl bg-navy-900/80 p-6">
              <div className="mb-1 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
                <span className="ml-2 text-xs text-gray-600">Your app</span>
              </div>
              <div className="mt-4 flex items-center justify-center">
                <div className="flex w-72 flex-col items-center rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500 text-lg font-bold text-white">
                    P
                  </div>
                  <p className="mb-2 text-base font-semibold text-gray-900">Verify your age</p>
                  <p className="mb-6 text-center text-sm text-gray-500">Quick verification to continue using Pixel Quest</p>
                  <div className="w-full rounded-xl bg-purple-500 py-3 text-center text-sm font-medium text-white">
                    Continue
                  </div>
                  <p className="mt-3 text-[10px] text-gray-400">Powered by Compliance Studio</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          {['3-step setup', 'COPPA compliant', 'SOC 2 certified', 'GDPR ready'].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle className="h-4 w-4 text-purple-500/60" />
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
