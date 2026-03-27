import { useState, useRef, useEffect, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Plus, Calendar, ChevronDown, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DashboardLayout from '@/features/dashboard/components/dashboard-layout'
import Spinner from '@/components/ui/spinner'
import SummaryCards from '../components/summary-cards'
import TransactionList from '../components/transaction-list'
import NovaTransacaoModal from '../components/transactions-modal'
import DeleteModal from '../components/delete-modal'
import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
} from '../services/transaction-service'
import {
  type Transaction,
  type CreateTransactionBody,
  type TransactionFilters,
} from '../types/transaction'

const periodOptions = [
  { label: 'Este mês', value: 'month' },
  { label: 'Últimos 30 dias', value: 'last30' },
  { label: 'Últimos 3 meses', value: 'last3months' },
  { label: 'Este ano', value: 'year' },
  { label: 'Todo o histórico', value: 'all' },
]

const formatDateToApi = (date: Date) => date.toISOString().split('T')[0]

const buildPeriodFilters = (
  period: (typeof periodOptions)[number]['value']
): TransactionFilters => {
  if (period === 'all') return {}

  const now = new Date()

  if (period === 'month') {
    return {
      startDate: formatDateToApi(
        new Date(now.getFullYear(), now.getMonth(), 1)
      ),
      endDate: formatDateToApi(now),
    }
  }

  if (period === 'last30') {
    const startDate = new Date(now)
    startDate.setDate(now.getDate() - 30)
    return {
      startDate: formatDateToApi(startDate),
      endDate: formatDateToApi(now),
    }
  }

  if (period === 'last3months') {
    const startDate = new Date(now)
    startDate.setMonth(now.getMonth() - 3)
    return {
      startDate: formatDateToApi(startDate),
      endDate: formatDateToApi(now),
    }
  }

  return {
    startDate: formatDateToApi(new Date(now.getFullYear(), 0, 1)),
    endDate: formatDateToApi(now),
  }
}

export default function TransacoesPage() {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null)
  const [deletingTransaction, setDeletingTransaction] =
    useState<Transaction | null>(null)
  const [isPeriodOpen, setIsPeriodOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0])
  const periodRef = useRef<HTMLDivElement>(null)

  const periodFilters = useMemo(
    () => buildPeriodFilters(selectedPeriod.value),
    [selectedPeriod.value]
  )

  const transactionsQuery = useQuery({
    queryKey: ['transactions', periodFilters],
    queryFn: () => getTransactions(periodFilters),
  })

  const createTransactionMutation = useMutation({
    mutationKey: ['create-transaction'],
    mutationFn: createTransaction,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  const updateTransactionMutation = useMutation({
    mutationKey: ['update-transaction'],
    mutationFn: ({ id, data }: { id: string; data: CreateTransactionBody }) =>
      updateTransaction(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  const deleteTransactionMutation = useMutation({
    mutationKey: ['delete-transaction'],
    mutationFn: deleteTransaction,
    onSuccess: () => {
      setDeletingTransaction(null)
      void queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (periodRef.current && !periodRef.current.contains(e.target as Node)) {
        setIsPeriodOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleAdd = async (transaction: CreateTransactionBody) => {
    if (editingTransaction) {
      await updateTransactionMutation.mutateAsync({
        id: editingTransaction.id,
        data: transaction,
      })
    } else {
      await createTransactionMutation.mutateAsync(transaction)
    }
  }

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setIsModalOpen(true)
  }

  const handleDelete = (transaction: Transaction) => {
    setDeletingTransaction(transaction)
  }

  const handleConfirmDelete = async () => {
    if (!deletingTransaction) return
    await deleteTransactionMutation.mutateAsync(deletingTransaction.id)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTransaction(null)
  }

  const transactions = transactionsQuery.data ?? []

  return (
    <DashboardLayout>
      {/* ── Header ── */}
      <div className="mb-6 lg:mb-8 flex flex-wrap justify-between items-end gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[#464255]">
            Despesas &amp; Receitas
          </h1>
          <p className="text-gray-400 text-sm">
            Acompanhe e gerencie todas as suas transações
          </p>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          {/* Period picker */}
          <div className="relative flex-1 lg:flex-none" ref={periodRef}>
            <button
              onClick={() => setIsPeriodOpen(!isPeriodOpen)}
              className="bg-white px-4 py-3.5 rounded-2xl w-full flex justify-between items-center gap-3 border border-gray-100 shadow-sm hover:border-[#00B074]/30 transition-all"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#00B074]/10 rounded-xl flex items-center justify-center shrink-0">
                  <Calendar size={16} className="text-[#00B074]" />
                </div>
                <span className="text-sm font-semibold text-[#464255]">
                  {selectedPeriod.label}
                </span>
              </div>
              <ChevronDown
                size={15}
                className={`text-gray-400 transition-transform duration-200 ${isPeriodOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {isPeriodOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
                >
                  {periodOptions.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => {
                        setSelectedPeriod(opt)
                        setIsPeriodOpen(false)
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                        opt.label === selectedPeriod.label
                          ? 'bg-[#00B074]/5 text-[#00B074]'
                          : 'text-[#464255] hover:bg-gray-50'
                      }`}
                    >
                      <span className="font-medium">{opt.label}</span>
                      {opt.label === selectedPeriod.label && (
                        <Check size={14} className="text-[#00B074]" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#00B074] text-white px-5 py-4.5 rounded-2xl font-bold text-sm hover:bg-[#009963] transition-all shadow-sm active:scale-95 group"
          >
            <div className="bg-white/20 p-1 rounded-lg group-hover:rotate-90 transition-transform duration-300">
              <Plus size={16} strokeWidth={3} />
            </div>
            <span>Nova Transação</span>
          </button>
        </div>
      </div>

      {transactionsQuery.isLoading ? (
        <div className="py-16 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <SummaryCards transactions={transactions} />

          <TransactionList
            transactions={transactions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}

      {transactionsQuery.isError && (
        <p className="text-sm text-[#FF5B5B] mt-4">
          Nao foi possivel carregar as transacoes agora. Tente novamente.
        </p>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <NovaTransacaoModal
            onClose={handleCloseModal}
            onAdd={handleAdd}
            isSubmitting={
              createTransactionMutation.isPending ||
              updateTransactionMutation.isPending
            }
            editingTransaction={editingTransaction}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deletingTransaction && (
          <DeleteModal
            onClose={() => setDeletingTransaction(null)}
            onConfirm={() => void handleConfirmDelete()}
            isDeleting={deleteTransactionMutation.isPending}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  )
}
