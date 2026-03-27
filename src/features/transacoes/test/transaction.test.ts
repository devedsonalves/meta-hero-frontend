/* eslint-disable @typescript-eslint/unbound-method */
import { vi } from 'vitest'

import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from '@/features/transacoes/services/transaction-service'
import { api } from '@/lib/api'

vi.mock('@/lib/api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('transaction-service', () => {
  const apiTransaction = {
    id: 'tx-1',
    userId: 'user-1',
    type: 'receita' as const,
    category: 'Salário',
    value: '1500.5',
    date: '2026-03-20T10:00:00.000Z',
    description: 'Freela',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should get transactions with filters and map fields', async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: {
        message: 'ok',
        data: [apiTransaction],
      },
    })

    const filters = {
      type: 'receita' as const,
      startDate: '2026-03-01',
      endDate: '2026-03-31',
    }

    const result = await getTransactions(filters)

    expect(api.get).toHaveBeenCalledWith('/transactions', {
      params: filters,
    })
    expect(result).toEqual([
      {
        id: 'tx-1',
        description: 'Freela',
        category: 'Salário',
        date: '2026-03-20',
        amount: 1500.5,
        type: 'receita',
      },
    ])
  })

  it('should fallback description when API returns null', async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: {
        message: 'ok',
        data: [{ ...apiTransaction, description: null }],
      },
    })

    const result = await getTransactions()

    expect(result[0].description).toBe('Sem descrição')
  })

  it('should create transaction sending amount as value and map response', async () => {
    vi.mocked(api.post).mockResolvedValue({
      data: {
        message: 'created',
        data: apiTransaction,
      },
    })

    const body = {
      type: 'receita' as const,
      category: 'Salário',
      amount: 1500.5,
      date: '2026-03-20',
      description: 'Freela',
    }

    const result = await createTransaction(body)

    expect(api.post).toHaveBeenCalledWith('/transactions', {
      type: 'receita',
      category: 'Salário',
      value: 1500.5,
      date: '2026-03-20',
      description: 'Freela',
    })
    expect(result.amount).toBe(1500.5)
    expect(result.date).toBe('2026-03-20')
  })

  it('should update transaction sending only defined fields', async () => {
    vi.mocked(api.put).mockResolvedValue({
      data: {
        message: 'updated',
        data: apiTransaction,
      },
    })

    const result = await updateTransaction('tx-1', {
      amount: 200,
      description: 'Ajuste',
    })

    expect(api.put).toHaveBeenCalledWith('/transactions/tx-1', {
      value: 200,
      description: 'Ajuste',
    })
    expect(result).toMatchObject({
      id: 'tx-1',
      amount: 1500.5,
      type: 'receita',
    })
  })

  it('should delete transaction by id', async () => {
    vi.mocked(api.delete).mockResolvedValue({})

    await deleteTransaction('tx-1')

    expect(api.delete).toHaveBeenCalledWith('/transactions/tx-1')
  })

  it('should throw error when create request fails', async () => {
    vi.mocked(api.post).mockRejectedValue(new Error('Create failed'))

    expect.assertions(1)
    await expect(
      createTransaction({
        type: 'despesa',
        category: 'Alimentação',
        amount: 50,
        date: '2026-03-21',
        description: 'Mercado',
      })
    ).rejects.toThrow(/create failed/i)
  })
})
