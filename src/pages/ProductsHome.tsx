import { PageWrapper } from '../components/Layout'
import ProductCard, { NewProductCard } from '../components/ProductCard'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useState } from 'react'

const PRODUCTS = [
  {
    id: 'pixel-quest',
    name: 'Pixel Quest',
    type: 'Game',
    platform: 'iOS',
    status: 'live' as const,
    metric: '12.4k verified today',
    lastActivity: '2 min ago',
    color: '#7C5CFC',
  },
  {
    id: 'socialvibe',
    name: 'SocialVibe',
    type: 'Social',
    platform: 'Web',
    status: 'test' as const,
    metric: 'Setup: 80%',
    lastActivity: '3 days ago',
    color: '#3B82F6',
  },
  {
    id: 'haunted-odyssey',
    name: 'Haunted Odyssey',
    type: 'Game',
    platform: 'Multi-platform',
    status: 'draft' as const,
    metric: 'Setup: 40%',
    lastActivity: '1 week ago',
    color: '#10B981',
  },
]

export default function ProductsHome() {
  const [search, setSearch] = useState('')
  const filtered = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <PageWrapper>
      <div className="mx-auto max-w-5xl px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Your Products</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="rounded-lg border border-navy-600 bg-navy-800 py-2 pl-9 pr-4 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: filtered.length * 0.1 }}
            >
              <NewProductCard />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
