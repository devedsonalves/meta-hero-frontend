import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Goal } from '../types'

interface GoalModalProps {
  onClose: () => void
  onSave: (data: Partial<Goal>) => Promise<void> | void
  isSubmitting?: boolean
  editingGoal?: Goal | null
}

export default function GoalModal({
  onClose,
  onSave,
  isSubmitting = false,
  editingGoal = null,
}: GoalModalProps) {
  const isEditing = !!editingGoal
  const [name, setName] = useState(editingGoal?.name ?? '')
  const [targetValue, setTargetValue] = useState(
    editingGoal ? String(editingGoal.targetValue) : ''
  )
  const [currentValue, setCurrentValue] = useState(
    editingGoal ? String(editingGoal.currentValue) : '0'
  )
  const [dueDate, setDueDate] = useState(
    editingGoal?.dueDate ?? new Date().toISOString().split('T')[0]
  )
  const [categoryId, setCategoryId] = useState(editingGoal?.categoryId ?? '')
  const [note, setNote] = useState(editingGoal?.note ?? '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !targetValue) return

    try {
      await onSave({
        name,
        targetValue: parseFloat(targetValue),
        currentValue: parseFloat(currentValue),
        dueDate,
        categoryId: categoryId || null,
        note,
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
        key="goal-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* Panel */}
      <motion.div
        key="goal-modal-panel"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 z-10"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#464255]">
            {isEditing ? 'Atualizar Meta' : 'Nova Meta'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
          {/* Goal Name */}
          <div>
            <label
              htmlFor="goal-name"
              className="block text-xs font-semibold text-gray-500 mb-1.5"
            >
              Nome da Meta
            </label>
            <input
              id="goal-name"
              required
              disabled={isSubmitting}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Reserva de Emergência"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#464255] placeholder-gray-300 focus:outline-none focus:border-[#00B074] transition-colors"
            />
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="goal-target"
                className="block text-xs font-semibold text-gray-500 mb-1.5"
              >
                Alvo (R$)
              </label>
              <input
                id="goal-target"
                required
                type="number"
                min="0.01"
                step="0.01"
                disabled={isSubmitting}
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                placeholder="0,00"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#464255] placeholder-gray-300 focus:outline-none focus:border-[#00B074] transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="goal-current"
                className="block text-xs font-semibold text-gray-500 mb-1.5"
              >
                Atual (R$)
              </label>
              <input
                id="goal-current"
                required
                type="number"
                min="0"
                step="0.01"
                disabled={isSubmitting}
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                placeholder="0,00"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#464255] placeholder-gray-300 focus:outline-none focus:border-[#00B074] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Due Date */}
            <div>
              <label
                htmlFor="goal-date"
                className="block text-xs font-semibold text-gray-500 mb-1.5"
              >
                Vencimento
              </label>
              <input
                id="goal-date"
                type="date"
                required
                disabled={isSubmitting}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#464255] focus:outline-none focus:border-[#00B074] transition-colors"
              />
            </div>
            {/* Category/Automation */}
            <div>
              <label
                htmlFor="goal-category"
                className="block text-xs font-semibold text-gray-500 mb-1.5"
              >
                Automação 🤖
              </label>
              <select
                id="goal-category"
                disabled={isSubmitting}
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#464255] focus:outline-none focus:border-[#00B074] transition-colors"
              >
                <option value="">Manual</option>
                <option value="Salário">Salário</option>
                <option value="Freelance">Freelance</option>
                <option value="Investimentos">Investimentos</option>
                <option value="Reserva">Reserva</option>
              </select>
            </div>
          </div>

          {/* Note */}
          <div>
            <label
              htmlFor="goal-note"
              className="block text-xs font-semibold text-gray-500 mb-1.5"
            >
              Motivação (opcional)
            </label>
            <textarea
              id="goal-note"
              disabled={isSubmitting}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Por que esta meta é importante?"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#464255] placeholder-gray-300 focus:outline-none focus:border-[#00B074] transition-colors resize-none h-20"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#00B074] text-white py-3 rounded-2xl font-bold text-sm hover:bg-[#009963] transition-colors mt-2 active:scale-95 shadow-lg shadow-[#00B074]/10"
          >
            {isSubmitting
              ? 'Processando...'
              : isEditing
                ? 'Salvar Alterações'
                : 'Criar Meta'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
