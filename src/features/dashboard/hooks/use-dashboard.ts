import { useQuery } from '@tanstack/react-query'
import { getDashboardData } from '../services/dashboard.service'
import type { GetDashboardParams } from '../types/dashboard'

export const useDashboard = (params: GetDashboardParams) => {
  return useQuery({
    queryKey: ['dashboard', params],
    queryFn: () => getDashboardData(params),
  })
}
