import { type SubmitHandler, useForm } from 'react-hook-form'

import AppLogo from '@/components/app-logo'
import { Mail, Lock, Chrome, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from '../validation/register-schema'
import { type RegisterFormBody, type RegisterBody } from '../types/register'
import { useRegisterMutation } from '../hooks/use-register-mutation'
import { useNavigate } from 'react-router-dom'
import { login } from '@/features/login/services/auth-service'
import { useQueryClient } from '@tanstack/react-query'

export default function RegisterPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormBody>({
    resolver: yupResolver(registerSchema),
    defaultValues: { name: '', email: '', confirmEmail: '', password: '' },
  })

  const email = watch('email')
  const confirmEmail = watch('confirmEmail')
  const confirmEmailMismatch = confirmEmail && email !== confirmEmail

  const mutation = useRegisterMutation()

  const onSubmit: SubmitHandler<RegisterFormBody> = async (data) => {
    const payload: RegisterBody = {
      name: data.name,
      email: data.email,
      password: data.password,
    }

    try {
      await mutation.mutateAsync(payload)

      await login({ email: data.email, password: data.password })

      await queryClient.invalidateQueries({ queryKey: ['me'] })

      void navigate('/dashboard')
    } catch (err) {
      const anyErr = err as {
        message?: string
        response?: { data?: { message?: string; error?: string } }
      }

      const message =
        anyErr?.response?.data?.message ||
        anyErr?.response?.data?.error ||
        anyErr?.message ||
        'Erro ao realizar cadastro'

      setError('email', { type: 'server', message })
    }
  }

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-sm flex flex-col items-center">
        <div className="mb-6 scale-90">
          <AppLogo />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            void handleSubmit(onSubmit)(e)
          }}
          className="w-full space-y-4"
        >
          <div className="space-y-3">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                {...register('name')}
                placeholder="Nome"
                className={cn(
                  'w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm',
                  !!errors.name && 'border-red-500 bg-red-50'
                )}
              />
            </div>
            {errors.name?.message && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                {...register('email')}
                placeholder="E-mail"
                className={cn(
                  'w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm',
                  !!errors.email && 'border-red-500 bg-red-50'
                )}
              />
            </div>
            {errors.email?.message && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                {...register('confirmEmail')}
                placeholder="Confirmar e-mail"
                className={cn(
                  'w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm',
                  (confirmEmailMismatch || !!errors.confirmEmail) &&
                    'border-red-500 bg-red-50'
                )}
              />
            </div>
            {errors.confirmEmail?.message && (
              <p className="mt-1 text-xs text-red-600">
                {errors.confirmEmail.message}
              </p>
            )}

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                {...register('password')}
                placeholder="Senha"
                className={cn(
                  'w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm',
                  !!errors.password && 'border-red-500 bg-red-50'
                )}
              />
            </div>
            {errors.password?.message && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {confirmEmailMismatch && (
            <p className="text-xs text-red-600">E-mails não coincidem.</p>
          )}

          <button
            type="submit"
            disabled={mutation.isPending || isSubmitting}
            className="w-full py-2.5 bg-zinc-900 text-white rounded-lg font-bold text-sm hover:bg-zinc-800 transition-colors disabled:opacity-70"
          >
            {mutation.isPending ? 'Cadastrando...' : 'Cadastrar'}
          </button>

          <div className="flex items-center gap-3 py-2">
            <div className="h-px bg-gray-100 flex-1" />
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              ou
            </span>
            <div className="h-px bg-gray-100 flex-1" />
          </div>

          <a
            href={`${import.meta.env.VITE_API_ENDPOINT}/auth/google`}
            className="flex items-center justify-center gap-2 w-full py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <Chrome className="w-4 h-4 text-[#4285F4]" />
            Google
          </a>
        </form>

        <p className="mt-6 text-xs text-gray-500">
          Já tem conta?{' '}
          <a href="/entrar" className="font-bold text-zinc-900 underline">
            Entrar
          </a>
        </p>
      </div>
    </div>
  )
}
