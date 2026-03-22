/* eslint-disable @typescript-eslint/unbound-method */
import { vi } from 'vitest'

import {
  assignMission,
  completeMission,
  createGoal,
  deleteGoal,
  getGoals,
  getMyRewards,
  getRewards,
  getUserMissions,
  purchaseReward,
  updateGoal,
} from '@/features/metas-missoes/services/metas-missoes.service'
import { api } from '@/lib/api'

vi.mock('@/lib/api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('metas-missoes.service', () => {
  const goal = {
    id: 'goal-1',
    userId: 'user-1',
    name: 'Reserva de emergência',
    targetValue: 5000,
    currentValue: 1500,
    dueDate: '2026-12-31',
    status: 'active' as const,
    note: null,
    progress: 30,
    createdAt: '2026-03-01T00:00:00.000Z',
    updatedAt: '2026-03-01T00:00:00.000Z',
  }

  const userMission = {
    id: 'um-1',
    userId: 'user-1',
    missionId: 'mission-1',
    status: 'assigned' as const,
    progress: 0,
    meta: null,
    createdAt: '2026-03-01T00:00:00.000Z',
    updatedAt: '2026-03-01T00:00:00.000Z',
  }

  const reward = {
    id: 'reward-1',
    name: 'Skin lendária',
    description: 'Visual exclusivo',
    cost: 100,
    icon: 'star',
  }

  const userReward = {
    id: 'ur-1',
    userId: 'user-1',
    rewardId: 'reward-1',
    acquiredAt: '2026-03-20T00:00:00.000Z',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should get goals', async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: { data: [goal] },
    })

    const result = await getGoals()

    expect(api.get).toHaveBeenCalledWith('/goals')
    expect(result).toEqual({ data: [goal] })
  })

  it('should create goal and return nested data', async () => {
    const payload = { name: 'Nova meta', targetValue: 2000 }
    vi.mocked(api.post).mockResolvedValue({
      data: { data: goal },
    })

    const result = await createGoal(payload)

    expect(api.post).toHaveBeenCalledWith('/goals', payload)
    expect(result).toEqual(goal)
  })

  it('should update goal by id', async () => {
    const payload = { currentValue: 1700 }
    vi.mocked(api.put).mockResolvedValue({
      data: { data: { ...goal, currentValue: 1700, progress: 34 } },
    })

    const result = await updateGoal('goal-1', payload)

    expect(api.put).toHaveBeenCalledWith('/goals/goal-1', payload)
    expect(result.currentValue).toBe(1700)
  })

  it('should delete goal by id', async () => {
    vi.mocked(api.delete).mockResolvedValue({})

    await deleteGoal('goal-1')

    expect(api.delete).toHaveBeenCalledWith('/goals/goal-1')
  })

  it('should get user missions', async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: { data: [userMission] },
    })

    const result = await getUserMissions()

    expect(api.get).toHaveBeenCalledWith('/missions')
    expect(result).toEqual({ data: [userMission] })
  })

  it('should complete mission by id', async () => {
    vi.mocked(api.post).mockResolvedValue({
      data: { data: { ...userMission, status: 'completed' } },
    })

    const result = await completeMission('mission-1')

    expect(api.post).toHaveBeenCalledWith('/missions/mission-1/complete')
    expect(result.status).toBe('completed')
  })

  it('should assign mission with missionId payload', async () => {
    vi.mocked(api.post).mockResolvedValue({
      data: { data: userMission },
    })

    const result = await assignMission('mission-1')

    expect(api.post).toHaveBeenCalledWith('/missions/assign', {
      missionId: 'mission-1',
    })
    expect(result).toEqual(userMission)
  })

  it('should get rewards and my rewards', async () => {
    vi.mocked(api.get)
      .mockResolvedValueOnce({ data: { data: [reward] } })
      .mockResolvedValueOnce({ data: { data: [userReward] } })

    const rewards = await getRewards()
    const myRewards = await getMyRewards()

    expect(api.get).toHaveBeenNthCalledWith(1, '/rewards')
    expect(api.get).toHaveBeenNthCalledWith(2, '/rewards/mine')
    expect(rewards).toEqual({ data: [reward] })
    expect(myRewards).toEqual({ data: [userReward] })
  })

  it('should purchase reward by id', async () => {
    vi.mocked(api.post).mockResolvedValue({
      data: { data: userReward },
    })

    const result = await purchaseReward('reward-1')

    expect(api.post).toHaveBeenCalledWith('/rewards/reward-1/purchase')
    expect(result).toEqual(userReward)
  })

  it('should throw error when complete mission fails', async () => {
    vi.mocked(api.post).mockRejectedValue(new Error('Complete mission failed'))

    expect.assertions(1)
    await expect(completeMission('mission-1')).rejects.toThrow(
      /complete mission failed/i
    )
  })
})
