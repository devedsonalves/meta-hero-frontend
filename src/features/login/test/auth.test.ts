/* eslint-disable @typescript-eslint/unbound-method */
import { vi } from 'vitest'
import { login } from '@/features/login/services/auth-service'
import { api } from '@/lib/api'

// Mockamos o módulo da API para não depender do servidor real
vi.mock('@/lib/api', () => ({
  api: {
    post: vi.fn(),
  },
}))

describe('login', () => {
  it('should return user and token on successful login', async () => {
    const mockResponse = {
      data: {
        user: { id: '1', email: 'user@example.com' },
        token: 'fake-token',
      },
    }
    vi.mocked(api.post).mockResolvedValue(mockResponse)

    const body = { email: 'user@example.com', password: 'password123' }
    const res = await login(body)

    expect(res).toHaveProperty('user')
    expect(res).toHaveProperty('token')
    expect(api.post).toHaveBeenCalledWith('/auth/login', body)
  })

  it('should throw error message on failed login', async () => {
    const mockError = new Error('Invalid credentials')
    vi.mocked(api.post).mockRejectedValue(mockError)

    expect.assertions(1)
    try {
      const body = { email: 'user@example.com', password: 'wrongpassword' }
      await login(body)
    } catch (err) {
      expect((err as Error).message).toMatch(/invalid/i)
    }
  })
})
