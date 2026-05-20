import { Link } from 'react-router-dom'
import { PageWrapper } from '../../components/v3/Layout'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

const PRODUCTS = [
  {
    id: 'pixel-quest',
    name: 'Pixel Quest',
    detail: 'Game · iOS',
    status: 'Live',
    statusColor: 'bg-emerald-400',
    metric: '12.4k verified today',
  },
  {
    id: 'socialvibe',
    name: 'SocialVibe',
    detail: 'Social · Web',
    status: 'Testing',
    statusColor: 'bg-amber-400',
    metric: 'Setup 80% complete',
  },
  {
    id: 'haunted-odyssey',
    name: 'Haunted Odyssey',
    detail: 'Game · Multi-platform',
    status: 'Draft',
    statusColor: 'bg-white/20',
    metric: 'Setup 40% complete',
  },
]

export default function ProductsHome() {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-2xl px-8 py-28">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <div className="mb-16 flex items-end justify-between">
            <h1 className="text-[32px] font-bold tracking-[-0.03em] text-white">Products</h1>
            <Link
              to="/setup"
              className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-navy-950 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="h-3.5 w-3.5" />
              New
            </Link>
          </div>

          <div className="space-y-0">
            {PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={`/products/${product.id}`}
                  className="group flex items-center justify-between border-b border-white/[0.04] py-7 transition-colors hover:border-white/[0.08]"
                >
                  <div className="flex items-center gap-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] text-[15px] font-semibold text-white/50 transition-colors group-hover:bg-white/[0.07]">
                      {product.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-[15px] font-medium text-white/80 transition-colors group-hover:text-white">
                          {product.name}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <div className={`h-1.5 w-1.5 rounded-full ${product.statusColor}`} />
                          <span className="text-[12px] text-white/25">{product.status}</span>
                        </div>
                      </div>
                      <span className="mt-1 block text-[13px] text-white/20">{product.detail}</span>
                    </div>
                  </div>
                  <span className="text-[13px] text-white/20 transition-colors group-hover:text-white/35">
                    {product.metric}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
