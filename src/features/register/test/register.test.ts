/* eslint-disable @typescript-eslint/unbound-method */
import { vi } from 'vitest'

import { registerUser } from '@/features/register/services/register-service'
import { api } from '@/lib/api'

vi.mock('@/lib/api', () => ({
  api: {
    post: vi.fn(),
    defaults: {
      baseURL: '',
    },
  },
}))

describe('registerUser', () => {
  const body = {
    name: 'Alice',
    email: 'alice@example.com',
    password: 'secret123',
  }

  const mockUser = {
    id: '1',
    name: 'Alice',
    email: 'alice@example.com',
    authProvider: 'local',
    xp: 0,
    level: 1,
    heroCoins: 0,
    createdAt: '2026-03-22T00:00:00.000Z',
    updatedAt: '2026-03-22T00:00:00.000Z',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    api.defaults.baseURL = ''
  })

  it('should call /api/users when baseURL does not end with /api', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: mockUser })

    const result = await registerUser(body)

    expect(result).toEqual(mockUser)
    expect(api.post).toHaveBeenCalledWith('/api/users', body)
  })

  it('should call /users when baseURL already ends with /api', async () => {
    api.defaults.baseURL = 'http://localhost:3333/api'
    vi.mocked(api.post).mockResolvedValue({ data: mockUser })

    const result = await registerUser(body)

    expect(result).toEqual(mockUser)
    expect(api.post).toHaveBeenCalledWith('/users', body)
  })

  it('should throw an error when request fails', async () => {
    const mockError = new Error('Registration failed')
    vi.mocked(api.post).mockRejectedValue(mockError)

    expect.assertions(1)
    await expect(registerUser(body)).rejects.toThrow(/registration failed/i)
  })
})
