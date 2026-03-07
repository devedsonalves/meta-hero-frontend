import { api } from '@/lib/api'
import {
  type CreateTransactionBody,
  type Transaction,
  type TransactionApiDTO,
  type TransactionFilters,
} from '../types/transaction'

type TransactionResponse = {
  message: string
  data: TransactionApiDTO
}

type TransactionsResponse = {
  message: string
  data: TransactionApiDTO[]
}

const normalizeDate = (date: string) => date.split('T')[0]

const mapTransaction = (transaction: TransactionApiDTO): Transaction => ({
  id: transaction.id,
  description: transaction.description ?? 'Sem descrição',
  category: transaction.category,
  date: normalizeDate(transaction.date),
  amount: Number(transaction.value),
  type: transaction.type,
})

export const getTransactions = async (
  filters?: TransactionFilters
): Promise<Transaction[]> => {
  const response = await api.get<TransactionsResponse>('/transactions', {
    params: filters,
  })

  return response.data.data.map(mapTransaction)
}

export const createTransaction = async (
  body: CreateTransactionBody
): Promise<Transaction> => {
  const response = await api.post<TransactionResponse>('/transactions', {
    type: body.type,
    category: body.category,
    value: body.amount,
    date: body.date,
    description: body.description,
  })

  return mapTransaction(response.data.data)
}
