/* eslint-disable @typescript-eslint/unbound-method */
import { vi } from 'vitest'

import { getDashboardData } from '@/features/dashboard/services/dashboard.service'
import { api } from '@/lib/api'

vi.mock('@/lib/api', () => ({
  api: {
    get: vi.fn(),
  },
}))

describe('getDashboardData', () => {
  const params = {
    startDate: '2026-03-01T00:00:00.000Z',
    endDate: '2026-03-31T23:59:59.999Z',
  }

  const mockDashboardData = {
    summary: {
      userName: 'Alice',
      currentBalance: 1200,
      savingsGoal: 2000,
      monthlyCosts: 800,
      completedMissions: 4,
    },
    goalProgress: [{ name: 'Reserva', value: 60, color: '#00AA88' }],
    missionHistory: [{ name: 'Semana 1', value: 120 }],
    expensesSummary: [{ name: 'Mar/2026', revenue: 2200, expenses: 1000 }],
    byCategory: [{ name: 'Moradia', value: 500 }],
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call /dashboard/summary with params and return dashboard data', async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: {
        message: 'Dashboard loaded',
        data: mockDashboardData,
      },
    })

    const result = await getDashboardData(params)

    expect(result).toEqual(mockDashboardData)
    expect(api.get).toHaveBeenCalledWith('/dashboard/summary', {
      params,
    })
  })

  it('should support empty params object', async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: {
        message: 'Dashboard loaded',
        data: mockDashboardData,
      },
    })

    const result = await getDashboardData({})

    expect(result).toEqual(mockDashboardData)
    expect(api.get).toHaveBeenCalledWith('/dashboard/summary', {
      params: {},
    })
  })

  it('should throw an error when request fails', async () => {
    const mockError = new Error('Dashboard request failed')
    vi.mocked(api.get).mockRejectedValue(mockError)

    expect.assertions(1)
    await expect(getDashboardData(params)).rejects.toThrow(
      /dashboard request failed/i
    )
  })
})
