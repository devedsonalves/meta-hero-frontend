import { PeriodOption } from '../types/dashboard'

export const periodOptions: PeriodOption[] = [
  {
    label: 'Este mês',
    getRange: () => {
      const now = new Date()
      return {
        start: new Date(now.getFullYear(), now.getMonth(), 1),
        end: new Date(now.getFullYear(), now.getMonth() + 1, 0),
      }
    },
  },
  {
    label: 'Últimos 30 dias',
    getRange: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 30)
      return { start, end }
    },
  },
  {
    label: 'Últimos 3 meses',
    getRange: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 3)
      return { start, end }
    },
  },
  {
    label: 'Últimos 6 meses',
    getRange: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 6)
      return { start, end }
    },
  },
  {
    label: 'Este ano',
    getRange: () => {
      const now = new Date()
      return {
        start: new Date(now.getFullYear(), 0, 1),
        end: new Date(now.getFullYear(), 11, 31),
      }
    },
  },
]
