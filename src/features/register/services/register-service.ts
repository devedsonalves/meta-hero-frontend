import { api } from '@/lib/api'
import { type RegisterBody } from '../types/register'
import { type User } from '@/features/login/types/auth'

export const registerUser = async (body: RegisterBody): Promise<User> => {
  // Evita duplicar "/api" quando baseURL já termina com /api
  const base = api.defaults.baseURL ?? ''
  const endpoint = base.endsWith('/api') ? '/users' : '/api/users'

  const response = await api.post<User>(endpoint, {
    name: body.name,
    email: body.email,
    password: body.password,
  })
  return response.data
}
