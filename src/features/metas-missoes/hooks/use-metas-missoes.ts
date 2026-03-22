import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../services/metas-missoes.service'
import { Goal } from '../types'

export const useMetasMissoes = () => {
  const queryClient = useQueryClient()

  const goalsQuery = useQuery({
    queryKey: ['goals'],
    queryFn: api.getGoals,
  })

  const missionsQuery = useQuery({
    queryKey: ['missions'],
    queryFn: api.getUserMissions,
  })

  const completeMissionMutation = useMutation({
    mutationFn: api.completeMission,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['missions'] })
      void queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })

  const createGoalMutation = useMutation({
    mutationFn: api.createGoal,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['goals'] })
    },
  })

  const updateGoalMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Goal> }) =>
      api.updateGoal(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['goals'] })
    },
  })

  const deleteGoalMutation = useMutation({
    mutationFn: api.deleteGoal,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['goals'] })
    },
  })

  return {
    goals: goalsQuery.data?.data || [],
    missions: missionsQuery.data?.data || [],
    isLoading: goalsQuery.isLoading || missionsQuery.isLoading,
    completeMission: completeMissionMutation.mutate,
    isCompletingMission: completeMissionMutation.isPending,
    createGoal: createGoalMutation.mutate,
    updateGoal: updateGoalMutation.mutate,
    deleteGoal: deleteGoalMutation.mutate,
  }
}
