export type GoalStatus = 'active' | 'achieved' | 'cancelled'

export interface Goal {
  id: string
  userId: string
  name: string
  targetValue: number
  currentValue: number
  dueDate: string
  status: GoalStatus
  categoryId?: string | null
  note: string | null
  progress: number
  createdAt: string
  updatedAt: string
}

export type MissionDifficulty = 'easy' | 'medium' | 'hard'
export type MissionStatus = 'assigned' | 'in_progress' | 'completed' | 'failed'

export interface Mission {
  id: string
  title: string
  description: string | null
  difficulty: MissionDifficulty
  type: 'manual' | 'saving' | 'transaction_count' | 'category_limit'
  targetValue?: number
  targetCategory?: string | null
  xpReward: number
  isGlobal: boolean
  createdAt: string
  updatedAt: string
}

export interface UserMission {
  id: string
  userId: string
  missionId: string
  status: MissionStatus
  progress: number
  meta: string | null
  createdAt: string
  updatedAt: string
  mission?: Mission
}

export interface Reward {
  id: string
  name: string
  description: string
  cost: number | string
  icon: string | null
  imageUrl?: string | null
}

export interface UserReward {
  id: string
  userId: string
  rewardId: string
  acquiredAt: string
  reward?: Reward
}
