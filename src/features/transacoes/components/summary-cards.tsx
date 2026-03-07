import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'
import { type Transaction, formatCurrency } from '../types/transaction'

interface SummaryCardsProps {
  transactions: Transaction[]
}

export default function SummaryCards({ transactions }: SummaryCardsProps) {
  const totalReceitas = transactions
    .filter((t) => t.type === 'receita')
    .reduce((s, t) => s + t.amount, 0)

  const totalDespesas = transactions
    .filter((t) => t.type === 'despesa')
    .reduce((s, t) => s + t.amount, 0)

  const saldo = totalReceitas - totalDespesas

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
      {/* Saldo */}
      <div className="bg-white p-6 rounded-[20px] flex items-center gap-5 shadow-sm">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: '#00B07415' }}
        >
          <Wallet size={28} color="#00B074" />
        </div>
        <div>
          <p className="text-[#464255] font-bold text-xl">
            {formatCurrency(saldo)}
          </p>
          <p className="text-gray-400 text-sm">Saldo atual</p>
          <p className="text-[10px] mt-1">
            <span
              className={`font-bold ${saldo >= 0 ? 'text-[#00B074]' : 'text-[#FF5B5B]'}`}
            >
              {saldo >= 0 ? 'Positivo' : 'Negativo'}
            </span>{' '}
            <span className="text-gray-300">no período</span>
          </p>
        </div>
      </div>

      {/* Receitas */}
      <div className="bg-white p-6 rounded-[20px] flex items-center gap-5 shadow-sm">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: '#2D9CDB15' }}
        >
          <TrendingUp size={28} color="#2D9CDB" />
        </div>
        <div>
          <p className="text-[#464255] font-bold text-xl">
            {formatCurrency(totalReceitas)}
          </p>
          <p className="text-gray-400 text-sm">Total receitas</p>
          <p className="text-[10px] mt-1">
            <span className="text-[#00B074] font-bold">
              {transactions.filter((t) => t.type === 'receita').length}{' '}
              transações
            </span>{' '}
            <span className="text-gray-300">no período</span>
          </p>
        </div>
      </div>

      {/* Despesas */}
      <div className="bg-white p-6 rounded-[20px] flex items-center gap-5 shadow-sm">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: '#FF5B5B15' }}
        >
          <TrendingDown size={28} color="#FF5B5B" />
        </div>
        <div>
          <p className="text-[#464255] font-bold text-xl">
            {formatCurrency(totalDespesas)}
          </p>
          <p className="text-gray-400 text-sm">Total despesas</p>
          <p className="text-[10px] mt-1">
            <span className="text-[#FF5B5B] font-bold">
              {transactions.filter((t) => t.type === 'despesa').length}{' '}
              transações
            </span>{' '}
            <span className="text-gray-300">no período</span>
          </p>
        </div>
      </div>
    </div>
  )
}
