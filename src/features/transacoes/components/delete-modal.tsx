import { motion } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'

interface DeleteModalProps {
  onClose: () => void
  onConfirm: () => void
  isDeleting?: boolean
}

export default function DeleteModal({
  onClose,
  onConfirm,
  isDeleting = false,
}: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <motion.div
        key="delete-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <motion.div
        key="delete-panel"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="relative w-full sm:max-w-sm bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 z-10"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#464255]">
            Excluir transação
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-3 py-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FF5B5B]/10 flex items-center justify-center">
            <AlertTriangle size={28} color="#FF5B5B" />
          </div>
          <p className="text-sm text-[#464255] text-center font-medium">
            Tem certeza que deseja excluir esta transação?
          </p>
          <p className="text-xs text-gray-400 text-center">
            Essa ação não pode ser desfeita.
          </p>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-bold text-[#464255] hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-3 rounded-2xl bg-[#FF5B5B] text-white text-sm font-bold hover:bg-[#e04e4e] transition-colors disabled:opacity-60"
          >
            {isDeleting ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
