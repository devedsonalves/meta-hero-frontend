import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import useAuthStore from '@/store/auth-store'
import { useEffect } from 'react'
import { User } from '@/features/login/types/auth'

export const useUser = () => {
  const { setUser, isAuthenticated } = useAuthStore()

  const query = useQuery({
    queryKey: ['me'],
    queryFn: async (): Promise<User> => {
      const response = await api.get<{ data: User }>('/users/me')
      return response.data.data
    },
    enabled: isAuthenticated,
    refetchInterval: 30000,
  })

  useEffect(() => {
    if (query.data) {
      setUser(query.data)
    }
  }, [query.data, setUser])

  return query
}
