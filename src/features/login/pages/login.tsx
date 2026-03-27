import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../validation/login-schema'
import { type LoginBody } from '../types/auth'
import { useLoginMutation } from '../hooks/use-login-mutation'
import { useQueryClient } from '@tanstack/react-query'
import AppLogo from '@/components/app-logo'
import { Mail, Lock, Chrome } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginBody>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const mutation = useLoginMutation({
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['me'] })
    },
    onError: (err) => {
      toast.error(err.message || 'Erro ao realizar login', { theme: 'colored' })
    },
  })

  const onSubmit: SubmitHandler<LoginBody> = (data) => {
    mutation.mutate(data)
  }

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-sm flex flex-col items-center">
        <div className="mb-6 scale-90">
          <AppLogo />
        </div>

        <form
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e)
          }}
          className="w-full space-y-4"
        >
          <div className="space-y-3">
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

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                {...register('password')}
                placeholder="Senha"
                className={cn(
                  'w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm',
                  errors.password && 'border-red-500 bg-red-50'
                )}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending || isSubmitting}
            className="w-full py-2.5 bg-zinc-900 text-white rounded-lg font-bold text-sm hover:bg-zinc-800 transition-colors disabled:opacity-70"
          >
            {mutation.isPending ? 'Entrando...' : 'Entrar'}
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
          Não tem conta?{' '}
          <a href="/registro" className="font-bold text-zinc-900 underline">
            Cadastrar
          </a>
        </p>
      </div>
    </div>
  )
}
