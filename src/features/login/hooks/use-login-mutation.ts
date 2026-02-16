import { type LoginBody, type LoginResponse } from '../types/auth'
import { login } from '../services/auth-service'
import { type MutationHandler } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'

export const useLoginMutation: MutationHandler<LoginResponse, LoginBody> = (
  options
) => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (body) => login(body),
    ...options,
  })
}
