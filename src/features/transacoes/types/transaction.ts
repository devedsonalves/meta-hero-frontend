export type TransactionType = 'receita' | 'despesa'

export type Category =
  | 'Salário'
  | 'Alimentação'
  | 'Transporte'
  | 'Lazer'
  | 'Saúde'
  | 'Compras'
  | 'Moradia'
  | 'Outros'

export interface Transaction {
  id: string
  description: string
  category: string
  date: string
  amount: number
  type: TransactionType
}

export interface TransactionFilters {
  type?: TransactionType
  category?: string
  startDate?: string
  endDate?: string
}

export interface CreateTransactionBody {
  description: string
  category: string
  date: string
  amount: number
  type: TransactionType
}

export type UpdateTransactionBody = Partial<CreateTransactionBody>

export interface TransactionApiDTO {
  id: string
  userId: string
  type: TransactionType
  category: string
  value: string | number
  date: string
  description: string | null
}

export const categories: Category[] = [
  'Salário',
  'Alimentação',
  'Transporte',
  'Lazer',
  'Saúde',
  'Compras',
  'Moradia',
  'Outros',
]

export function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function formatDate(dateStr: string) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
