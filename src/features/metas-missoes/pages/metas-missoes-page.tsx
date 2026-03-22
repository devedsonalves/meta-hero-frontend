import { useState } from 'react'
import { Plus, Flame, Target } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardLayout from '@/features/dashboard/components/dashboard-layout'
import Spinner from '@/components/ui/spinner'
import { useMetasMissoes } from '../hooks/use-metas-missoes'
import MetasSummary from '../components/metas-summary'
import MissionList from '../components/mission-list'
import GoalList from '../components/goal-list'
import GoalModal from '../components/goal-modal'
import type { Goal } from '../types'

export default function MetasMissoesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)

  const {
    goals,
    missions,
    isLoading,
    completeMission,
    isCompletingMission,
    createGoal,
    updateGoal,
  } = useMetasMissoes()

  const handleAddGoal = (data: Partial<Goal>) => {
    if (editingGoal) {
      updateGoal({ id: editingGoal.id, data })
    } else {
      createGoal(data)
    }
    setIsModalOpen(false)
    setEditingGoal(null)
  }

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingGoal(null)
  }

  return (
    <DashboardLayout>
      {/* ── Header ── */}
      <div className="mb-6 lg:mb-8 flex flex-wrap justify-between items-end gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[#464255]">
            Metas &amp; Missões
          </h1>
          <p className="text-gray-400 text-sm">
            Acompanhe e gerencie todas as suas metas e missões
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#00B074] text-white px-5 py-4 rounded-2xl font-bold text-sm hover:bg-[#009963] transition-all shadow-sm active:scale-95 group"
        >
          <div className="bg-white/20 p-1 rounded-lg group-hover:rotate-90 transition-transform duration-300">
            <Plus size={16} strokeWidth={3} />
          </div>
          <span>Nova Meta</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col h-[60vh] items-center justify-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-[#00B074]/20 blur-3xl rounded-full animate-pulse" />
            <Spinner />
          </div>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] animate-pulse">
            Sincronizando dados heroicos...
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12 pb-20"
        >
          {/* 📊 Summary Cards */}
          <MetasSummary goals={goals} missions={missions} />

          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-500/5">
                <Target size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-black text-[#464255] tracking-tight">
                  Jornada Heroica
                </h1>
                <p className="text-gray-400 text-sm">
                  Seu mapa estratégico para evolução e conquistas de longo prazo
                </p>
              </div>
            </div>

            <GoalList
              goals={goals}
              onEdit={handleEditGoal}
              onAddClick={() => setIsModalOpen(true)}
            />
          </section>

          {/* ⚔️ Missions Section */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-500/5">
                <Flame size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-black text-[#464255] tracking-tight">
                  Arsenal de Missões
                </h1>
                <p className="text-gray-400 text-sm">
                  Desafios táticos para acumular XP e recompensas valiosas
                </p>
              </div>
            </div>

            <MissionList
              missions={missions}
              onComplete={(id) => void completeMission(id)}
              isCompleting={isCompletingMission}
            />
          </section>

          {/* 🎯 Goals Section */}
        </motion.div>
      )}

      {/* ── Modals ── */}
      <AnimatePresence>
        {isModalOpen && (
          <GoalModal
            onClose={handleCloseModal}
            onSave={handleAddGoal}
            editingGoal={editingGoal}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  )
}
