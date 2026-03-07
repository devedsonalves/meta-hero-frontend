import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import {
  type Transaction,
  type TransactionType,
  formatCurrency,
  formatDate,
} from '../types/transaction'

const PER_PAGE = 8

interface TransactionListProps {
  transactions: Transaction[]
}

type FilterKey = 'todas' | TransactionType

const tabs: { key: FilterKey; label: string }[] = [
  { key: 'todas', label: 'Todas' },
  { key: 'receita', label: 'Receitas' },
  { key: 'despesa', label: 'Despesas' },
]

export default function TransactionList({
  transactions,
}: TransactionListProps) {
  const [filter, setFilter] = useState<FilterKey>('todas')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = transactions.filter((t) => {
    const matchType = filter === 'todas' || t.type === filter
    const matchSearch =
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  useEffect(() => {
    setPage(1)
  }, [filter, search, transactions])

  return (
    <div className="bg-white rounded-[20px] shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-gray-100 rounded-2xl shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                filter === tab.key
                  ? 'bg-white text-[#464255] shadow-sm'
                  : 'text-gray-400 hover:text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar transação..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm text-[#464255] placeholder-gray-300 focus:outline-none focus:border-[#00B074] transition-colors"
          />
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-50">
        <AnimatePresence initial={false}>
          {paginated.length === 0 ? (
            <div className="py-16 flex flex-col items-center gap-3 text-gray-300">
              <Search size={36} />
              <p className="text-sm font-medium">
                Nenhuma transação encontrada
              </p>
            </div>
          ) : (
            paginated.map((t) => {
              const isReceita = t.type === 'receita'
              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/60 transition-colors"
                >
                  {/* Fixed type icon */}
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: isReceita ? '#00B07418' : '#FF5B5B18',
                    }}
                  >
                    {isReceita ? (
                      <TrendingUp size={20} color="#00B074" />
                    ) : (
                      <TrendingDown size={20} color="#FF5B5B" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#464255] truncate">
                      {t.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {t.category} · {formatDate(t.date)}
                    </p>
                  </div>

                  {/* Amount */}
                  <span
                    className={`text-sm font-bold shrink-0 ${
                      isReceita ? 'text-[#00B074]' : 'text-[#FF5B5B]'
                    }`}
                  >
                    {isReceita ? '+' : '-'} {formatCurrency(t.amount)}
                  </span>
                </motion.div>
              )
            })
          )}
        </AnimatePresence>
      </div>

      {/* Footer: count + pagination */}
      {filtered.length > 0 && (
        <div className="px-5 py-3 border-t border-gray-50 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            {filtered.length} transaç{filtered.length === 1 ? 'ão' : 'ões'}{' '}
            encontrada{filtered.length === 1 ? '' : 's'}
          </p>

          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${
                    n === page
                      ? 'bg-[#00B074] text-white shadow-sm'
                      : 'text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  {n}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
