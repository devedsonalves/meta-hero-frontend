import { login } from '@/features/login/services/auth-service'

describe('login', () => {
  it('should return user and token on successful login', async () => {
    const body = { email: 'user@example.com', password: 'user' }
    const res = await login(body)
    expect(res).toHaveProperty('user')
    expect(res).toHaveProperty('token')
  })

  it('should throw error message on failed login', async () => {
    expect.assertions(1)
    try {
      const body = { email: 'user@example.com', password: 'wrong' }
      await login(body)
    } catch (err) {
      expect((err as Error).message).toMatch(/invalid/i)
    }
  })
})
