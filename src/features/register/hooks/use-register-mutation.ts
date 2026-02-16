import { type MutationHandler } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'
import { registerUser } from '../services/register-service'
import { type RegisterBody } from '../types/register'
import { type User } from '@/features/login/types/auth'

export const useRegisterMutation: MutationHandler<User, RegisterBody> = (
  options
) => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: (body) => registerUser(body),
    ...options,
  })
}
