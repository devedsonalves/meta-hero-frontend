import { api } from '@/lib/api'
import { Goal, UserMission, Reward, UserReward } from '../types'

export const getGoals = async (): Promise<{ data: Goal[] }> => {
  const response = await api.get<{ data: Goal[] }>('/goals')
  return response.data
}

export const createGoal = async (data: Partial<Goal>): Promise<Goal> => {
  const response = await api.post<{ data: Goal }>('/goals', data)
  return response.data.data
}

export const updateGoal = async (
  id: string,
  data: Partial<Goal>
): Promise<Goal> => {
  const response = await api.put<{ data: Goal }>(`/goals/${id}`, data)
  return response.data.data
}

export const deleteGoal = async (id: string): Promise<void> => {
  await api.delete(`/goals/${id}`)
}

export const getUserMissions = async (): Promise<{ data: UserMission[] }> => {
  const response = await api.get<{ data: UserMission[] }>('/missions')
  return response.data
}

export const completeMission = async (id: string): Promise<UserMission> => {
  const response = await api.post<{ data: UserMission }>(
    `/missions/${id}/complete`
  )
  return response.data.data
}

export const assignMission = async (
  missionId: string
): Promise<UserMission> => {
  const response = await api.post<{ data: UserMission }>('/missions/assign', {
    missionId,
  })
  return response.data.data
}

export const getRewards = async (): Promise<{ data: Reward[] }> => {
  const response = await api.get<{ data: Reward[] }>('/rewards')
  return response.data
}

export const purchaseReward = async (id: string): Promise<UserReward> => {
  const response = await api.post<{ data: UserReward }>(
    `/rewards/${id}/purchase`
  )
  return response.data.data
}

export const getMyRewards = async (): Promise<{ data: UserReward[] }> => {
  const response = await api.get<{ data: UserReward[] }>('/rewards/mine')
  return response.data
}
