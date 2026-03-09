import { api } from '@/lib/api'
import { GetDashboardParams, DashboardData } from '../types/dashboard'

export const getDashboardData = async (
  params: GetDashboardParams
): Promise<DashboardData> => {
  const { data } = await api.get<{ message: string; data: DashboardData }>(
    '/dashboard/summary',
    {
      params,
    }
  )
  return data.data
}
