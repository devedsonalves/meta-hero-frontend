import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import {
  type Transaction,
  type TransactionType,
  type Category,
  categories,
} from '../types/transaction'

interface NovaTransacaoModalProps {
  onClose: () => void
  onAdd: (t: Omit<Transaction, 'id'>) => Promise<void> | void
  isSubmitting?: boolean
  editingTransaction?: Transaction | null
}

export default function NovaTransacaoModal({
  onClose,
  onAdd,
  isSubmitting = false,
  editingTransaction = null,
}: NovaTransacaoModalProps) {
  const isEditing = !!editingTransaction
  const [type, setType] = useState<TransactionType>(
    editingTransaction?.type ?? 'despesa'
  )
  const [description, setDescription] = useState(
    editingTransaction?.description ?? ''
  )
  const [amount, setAmount] = useState(
    editingTransaction ? String(editingTransaction.amount) : ''
  )
  const [category, setCategory] = useState<Category>(
    (editingTransaction?.category as Category) ?? 'Outros'
  )
  const [date, setDate] = useState(
    editingTransaction?.date ?? new Date().toISOString().split('T')[0]
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim() || !amount) return

    try {
      await onAdd({
        description,
        category,
        date,
        amount: parseFloat(amount),
        type,
      })
      onClose()
    } catch {
      return
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* Panel */}
      <motion.div
        key="modal-panel"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 z-10"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#464255]">
            {isEditing ? 'Editar Transação' : 'Nova Transação'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
          {/* Type toggle */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
            {(['despesa', 'receita'] as TransactionType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                  type === t
                    ? t === 'despesa'
                      ? 'bg-[#FF5B5B] text-white shadow-sm'
                      : 'bg-[#00B074] text-white shadow-sm'
                    : 'text-gray-500'
                }`}
              >
                {t === 'despesa' ? 'Despesa' : 'Receita'}
              </button>
            ))}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="transaction-description"
              className="block text-xs font-semibold text-gray-500 mb-1.5"
            >
              Descrição
            </label>
            <input
              id="transaction-description"
              required
              disabled={isSubmitting}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Supermercado"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#464255] placeholder-gray-300 focus:outline-none focus:border-[#00B074] transition-colors"
            />
          </div>

          {/* Amount + Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="transaction-amount"
                className="block text-xs font-semibold text-gray-500 mb-1.5"
              >
                Valor (R$)
              </label>
              <input
                id="transaction-amount"
                required
                type="number"
                min="0.01"
                step="0.01"
                disabled={isSubmitting}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0,00"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#464255] placeholder-gray-300 focus:outline-none focus:border-[#00B074] transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="transaction-category"
                className="block text-xs font-semibold text-gray-500 mb-1.5"
              >
                Categoria
              </label>
              <select
                id="transaction-category"
                disabled={isSubmitting}
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#464255] focus:outline-none focus:border-[#00B074] transition-colors"
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="transaction-date"
              className="block text-xs font-semibold text-gray-500 mb-1.5"
            >
              Data
            </label>
            <input
              id="transaction-date"
              type="date"
              disabled={isSubmitting}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#464255] focus:outline-none focus:border-[#00B074] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#00B074] text-white py-3 rounded-2xl font-bold text-sm hover:bg-[#009963] transition-colors mt-2"
          >
            {isSubmitting
              ? isEditing
                ? 'Salvando...'
                : 'Adicionando...'
              : isEditing
                ? 'Salvar alterações'
                : 'Adicionar transação'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
