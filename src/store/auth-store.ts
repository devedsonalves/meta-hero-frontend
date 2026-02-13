import { create } from 'zustand'
import { logger } from './logger'

type AuthState = {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

const useAuthStore = create<AuthState>()(
  logger<AuthState>(
    (set) => ({
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated) => {
        set({ isAuthenticated })
      },
    }),
    'authStore'
  )
)

export default useAuthStore
