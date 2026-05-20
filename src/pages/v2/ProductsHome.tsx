import { Link } from 'react-router-dom'
import { PageWrapper } from '../../components/v2/Layout'
import { motion } from 'framer-motion'
import { Search, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

const PRODUCTS = [
  { id: 'pixel-quest', name: 'Pixel Quest', type: 'Game', platform: 'iOS', status: 'live' as const, metric: '12.4k verified', last: '2m ago', gradient: 'from-purple-500 to-cyan-400' },
  { id: 'socialvibe', name: 'SocialVibe', type: 'Social', platform: 'Web', status: 'test' as const, metric: '80% setup', last: '3d ago', gradient: 'from-blue-500 to-indigo-400' },
  { id: 'haunted-odyssey', name: 'Haunted Odyssey', type: 'Game', platform: 'Multi', status: 'draft' as const, metric: '40% setup', last: '1w ago', gradient: 'from-emerald-500 to-teal-400' },
]

const STATUS = {
  live: { label: 'LIVE', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  test: { label: 'TEST', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
  draft: { label: 'DRAFT', color: 'text-white/30 bg-white/[0.04] border-white/[0.06]' },
}

export default function ProductsHome() {
  const [search, setSearch] = useState('')
  const filtered = PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <PageWrapper>
      <div className="v2-dotgrid relative min-h-screen">
        <div className="mx-auto max-w-5xl px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">Products</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/15" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="search..."
                  className="v2-mono rounded-lg border border-white/[0.06] bg-white/[0.02] py-2 pl-9 pr-4 text-[12px] text-white placeholder-white/15 outline-none focus:border-purple-500/30" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => {
                const s = STATUS[p.status]
                return (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                    <Link to={`/products/${p.id}`}
                      className="v2-grain group block rounded-2xl border border-white/[0.04] bg-white/[0.015] p-5 transition-all hover:border-white/[0.1] hover:bg-white/[0.03]">
                      <div className="mb-5 flex items-start justify-between">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${p.gradient} text-sm font-bold text-white`}>
                          {p.name[0]}
                        </div>
                        <span className={`v2-mono rounded-md border px-2 py-0.5 text-[9px] font-semibold ${s.color}`}>
                          {s.label}
                        </span>
                      </div>
                      <h3 className="mb-0.5 text-[15px] font-semibold text-white/90">{p.name}</h3>
                      <p className="v2-mono mb-4 text-[11px] text-white/35">{p.type} · {p.platform}</p>
                      <div className="flex items-center justify-between border-t border-white/[0.04] pt-4">
                        <span className="v2-mono text-[11px] text-white/40">{p.metric}</span>
                        <span className="v2-mono text-[10px] text-white/30">{p.last}</span>
                      </div>
                      <div className="mt-4 flex items-center gap-1.5 text-white/0 transition-colors group-hover:text-white/30">
                        <span className="v2-mono text-[10px]">open</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </div>
                    </Link>
                  </motion.div>
                )
              })}

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: filtered.length * 0.08 }}>
                <Link to="/setup"
                  className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.06] bg-white/[0.01] p-8 text-center transition-all hover:border-purple-500/20 hover:bg-white/[0.02]">
                  <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-lg text-white/20">+</span>
                  <span className="v2-mono text-[11px] text-white/35">new product</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}
