import { motion } from 'framer-motion'
import {
  Target,
  Clock,
  ChevronRight,
  Plus,
  Box,
  Zap,
  TrendingUp,
} from 'lucide-react'
import { toBRL, formatDate } from '@/features/dashboard/utils'
import { Goal } from '../types'

interface GoalListProps {
  goals: Goal[]
  onEdit?: (goal: Goal) => void
  onAddClick: () => void
}

export default function GoalList({ goals, onEdit, onAddClick }: GoalListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  if (goals.length === 0) {
    return (
      <div className="bg-white p-12 rounded-[20px] border border-gray-100 flex flex-col items-center text-center shadow-sm">
        <Target size={40} className="mb-4 opacity-20 text-[#2D9CDB]" />
        <h3 className="text-lg font-bold text-[#464255]">
          Sua primeira meta espera por você
        </h3>
        <p className="text-xs text-gray-400 max-w-sm mt-2 leading-relaxed">
          Defina um objetivo financeiro e transforme seus sonhos em realidade
          com o MetaHero.
        </p>
        <button
          onClick={onAddClick}
          className="mt-6 bg-[#2D9CDB] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#1B8BCA] transition-all active:scale-95 text-xs"
        >
          <Plus size={16} /> Criar Meta
        </button>
      </div>
    )
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      {goals.map((goal) => {
        const isAchieved = goal.status === 'achieved'
        const progress = Math.min(goal.progress, 100)

        return (
          <motion.div
            key={goal.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className={`bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col group ${
              isAchieved ? 'bg-linear-to-br from-white to-[#00B074]/5' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isAchieved
                    ? 'bg-[#00B074]/10 text-[#00B074]'
                    : 'bg-[#2D9CDB]/10 text-[#2D9CDB]'
                }`}
              >
                {goal.categoryId ? <Zap size={22} /> : <Target size={22} />}
              </div>

              {isAchieved ? (
                <div className="bg-[#00B074] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                  Concluída
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-300 uppercase">
                  <Box size={12} /> {goal.categoryId || 'Meta Direta'}
                </div>
              )}
            </div>

            <h3 className="text-base font-bold text-[#464255] mb-2 truncate">
              {goal.name}
            </h3>

            <div className="flex flex-col gap-1 mb-6">
              <div className="flex justify-between items-end">
                <span
                  className={`text-xl font-black ${isAchieved ? 'text-[#00B074]' : 'text-[#464255]'}`}
                >
                  {toBRL(Number(goal.currentValue))}
                </span>
                <span className="text-[10px] font-bold text-gray-400">
                  de {toBRL(Number(goal.targetValue))}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 mb-8">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                <div className="flex items-center gap-1">
                  <TrendingUp size={10} /> Progresso
                </div>
                <span style={{ color: isAchieved ? '#00B074' : '#2D9CDB' }}>
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100/50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: isAchieved ? '#00B074' : '#2D9CDB',
                  }}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                <Clock size={12} className="text-gray-300" />
                Vence em {formatDate(goal.dueDate)}
              </div>

              {!isAchieved && (
                <button
                  onClick={() => onEdit?.(goal)}
                  className="w-10 h-10 bg-[#F8F9FA] text-[#464255] rounded-xl hover:bg-[#2D9CDB] hover:text-white transition-all flex items-center justify-center active:scale-95 group/btn"
                >
                  <ChevronRight
                    size={18}
                    className="group-hover/btn:translate-x-0.5 transition-transform"
                  />
                </button>
              )}
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
