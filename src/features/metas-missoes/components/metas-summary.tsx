import { motion } from 'framer-motion'
import { Target, CheckCircle, Award, Zap } from 'lucide-react'
import { Goal, UserMission } from '../types'
import { useUser } from '@/hooks/use-user'

interface MetasSummaryProps {
  goals: Goal[]
  missions: UserMission[]
}

export default function MetasSummary({ goals, missions }: MetasSummaryProps) {
  const { data: user } = useUser()

  const activeMetas = goals.filter((g) => g.status === 'active').length
  const completedMetas = goals.filter((g) => g.status === 'achieved').length
  const activeMissions = missions.filter((m) => m.status !== 'completed').length
  const completedMissions = missions.filter(
    (m) => m.status === 'completed'
  ).length

  const currentXp = user?.xp || 0
  const currentLevel = user?.level || 1

  const summaryItems = [
    {
      label: 'Metas Ativas',
      value: String(activeMetas),
      icon: Target,
      color: '#2D9CDB',
      trend: `${completedMetas} concluídas`,
    },
    {
      label: 'Concluídas',
      value: String(completedMetas),
      icon: CheckCircle,
      color: '#00B074',
      trend: 'Sucesso total',
    },
    {
      label: 'Missões',
      value: String(activeMissions),
      icon: Award,
      color: '#F2994A',
      trend: `${completedMissions} concluídas`,
    },
    {
      label: 'Nível Heroico',
      value: `Lvl ${currentLevel}`,
      icon: Zap,
      color: '#9B51E0',
      trend: `${currentXp} total XP`,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6"
    >
      {summaryItems.map((item, idx) => {
        const Icon = item.icon
        return (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="bg-white p-6 rounded-[20px] flex items-center gap-5 shadow-sm border border-gray-100 group"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${item.color}15` }}
            >
              <Icon size={28} color={item.color} />
            </div>
            <div className="overflow-hidden">
              <p className="text-[#464255] font-bold text-xl truncate">
                {item.value}
              </p>
              <p className="text-gray-400 text-sm truncate">{item.label}</p>
              <p
                className="text-[10px] mt-1 font-bold"
                style={{ color: item.color }}
              >
                {item.trend}
              </p>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
