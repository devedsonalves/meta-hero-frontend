import { QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { queryClient } from './lib/react-query'
import { AuthGuard } from './components/auth-guard'

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthGuard>{children}</AuthGuard>
    </QueryClientProvider>
  )
}
