import { motion } from 'framer-motion'
import {
  Sword,
  Star,
  CheckCircle,
  Flame,
  Shield,
  Zap,
  TrendingUp,
} from 'lucide-react'
import { UserMission } from '../types'

interface MissionListProps {
  missions: UserMission[]
  onComplete: (id: string) => void
  isCompleting: boolean
}

export default function MissionList({
  missions,
  onComplete,
  isCompleting,
}: MissionListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  const difficultyStyles = {
    easy: {
      accent: '#00B074',
      light: '#E6F7F1',
      icon: Shield,
    },
    medium: {
      accent: '#2D9CDB',
      light: '#EAF5FB',
      icon: Zap,
    },
    hard: {
      accent: '#F2994A',
      light: '#FEF5ED',
      icon: Flame,
    },
  }

  if (missions.length === 0) {
    return (
      <div className="bg-white p-12 rounded-[20px] border border-gray-100 flex flex-col items-center text-center shadow-sm text-gray-400">
        <Sword size={40} className="mb-4 opacity-20" />
        <p className="font-medium">Nenhuma missão disponível no momento.</p>
      </div>
    )
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col gap-3"
    >
      {missions.map((userMission) => {
        const { mission } = userMission
        if (!mission) return null
        const isCompleted = userMission.status === 'completed'
        const style =
          difficultyStyles[
            mission.difficulty as keyof typeof difficultyStyles
          ] || difficultyStyles.easy
        const Icon = style.icon

        return (
          <motion.div
            key={userMission.id}
            variants={itemVariants}
            className={`bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center gap-4 transition-all hover:shadow-md ${
              isCompleted ? 'opacity-60 bg-gray-50/30' : ''
            }`}
          >
            {/* Left side: Icon and Info */}
            <div className="flex items-center gap-4 flex-1">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-white"
                style={{ backgroundColor: style.light }}
              >
                <Icon size={28} color={style.accent} strokeWidth={2.5} />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-sm md:text-base font-black text-[#464255] truncate uppercase tracking-tight">
                    {mission.title}
                  </h3>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-lg uppercase"
                    style={{
                      backgroundColor: style.light,
                      color: style.accent,
                    }}
                  >
                    {mission.difficulty}
                  </span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-1">
                  {mission.description}
                </p>
              </div>
            </div>

            {/* Right side: Rewards and CTA */}
            <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-gray-50 md:min-w-[360px]">
              {/* Progress for automatic missions */}
              {mission.type !== 'manual' && !isCompleted && (
                <div className="flex flex-col items-end gap-1.5 flex-1 max-w-[120px]">
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-300 uppercase tracking-widest">
                    <TrendingUp size={10} /> Progress
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${userMission.progress}%` }}
                      className="h-full"
                      style={{ backgroundColor: style.accent }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-xl border border-amber-100/50">
                <Star
                  size={16}
                  className="text-amber-500"
                  fill="currentColor"
                />
                <span className="text-sm font-black text-amber-700">
                  +{mission.xpReward} XP
                </span>
              </div>

              <div className="min-w-[140px]">
                {!isCompleted ? (
                  mission.type === 'manual' ? (
                    <button
                      onClick={() => onComplete(userMission.id)}
                      disabled={isCompleting}
                      className="w-full bg-[#464255] text-white py-2.5 px-4 rounded-xl font-bold text-xs hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/5"
                    >
                      {isCompleting ? '...' : 'Coletar XP'}
                    </button>
                  ) : (
                    <div className="text-[10px] font-bold text-gray-300 text-center uppercase tracking-widest px-4">
                      Automática
                    </div>
                  )
                ) : (
                  <div className="text-emerald-500 flex items-center justify-center gap-1.5 font-black text-xs px-4">
                    <CheckCircle size={18} /> CUMPRIDA
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
