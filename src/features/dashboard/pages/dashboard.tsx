import DashboardLayout from '@/features/dashboard/components/dashboard-layout'
import { SummaryCard } from '@/components/summary-card'
import {
  Wallet,
  Target as TargetIcon,
  CreditCard,
  CheckCircle,
  Calendar,
  ChevronDown,
  Check,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const lineData = [
  { name: 'Sunday', value: 20 },
  { name: 'Monday', value: 35 },
  { name: 'Tuesday', value: 25 },
  { name: 'Wednesday', value: 45 },
  { name: 'Thursday', value: 30 },
  { name: 'Friday', value: 60 },
  { name: 'Saturday', value: 40 },
]

const barData = [
  { name: 'A', value: 60 },
  { name: 'T', value: 80 },
  { name: 'L', value: 45 },
  { name: 'E', value: 90 },
  { name: 'S', value: 55 },
  { name: 'C', value: 75 },
  { name: 'S', value: 65 },
]

const summaryData = [
  { name: 'Fracassadas', value: 40, color: '#FF5B5B' },
  { name: 'Concluídas', value: 35, color: '#00B074' },
  { name: 'Restantes', value: 25, color: '#2D9CDB' },
]

function formatDate(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

type PeriodOption = {
  label: string
  getRange: () => { start: Date; end: Date }
}

const periodOptions: PeriodOption[] = [
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

function DashboardPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0])
  const filterRef = useRef<HTMLDivElement>(null)

  const range = selectedPeriod.getRange()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectPeriod = (option: PeriodOption) => {
    setSelectedPeriod(option)
    setIsFilterOpen(false)
  }

  return (
    <DashboardLayout>
      <div className="mb-6 lg:mb-8 flex flex-wrap justify-between items-end gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[#464255]">
            Dashboard
          </h1>
          <p className="text-gray-400 text-sm">
            Oi, Edson. Bem vindo de volta!
          </p>
        </div>

        <div className="relative w-full lg:w-auto" ref={filterRef}>
          <button
            id="period-filter-btn"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="bg-white px-5 py-5 rounded-2xl w-full flex justify-between items-center gap-3 border border-gray-100 shadow-sm cursor-pointer hover:border-[#00B074]/30 transition-all group"
          >
            <div className="flex justify-between items-center gap-2">
              <div className="w-9 h-9 bg-[#00B074]/10 rounded-xl flex items-center justify-center shrink-0">
                <Calendar size={18} className="text-[#00B074]" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-[#464255] leading-tight">
                  {selectedPeriod.label}
                </p>
                <p className="text-[11px] text-gray-400 leading-tight mt-0.5">
                  {formatDate(range.start)} &ndash; {formatDate(range.end)}
                </p>
              </div>
            </div>
            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform duration-200 ml-1 ${
                isFilterOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
              >
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-4 py-2">
                  Selecionar período
                </p>
                {periodOptions.map((option) => {
                  const isSelected = option.label === selectedPeriod.label
                  const optRange = option.getRange()
                  return (
                    <button
                      key={option.label}
                      onClick={() => handleSelectPeriod(option)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                        isSelected
                          ? 'bg-[#00B074]/5 text-[#00B074]'
                          : 'text-[#464255] hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-left">
                        <p className="font-medium">{option.label}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {formatDate(optRange.start)} &ndash;{' '}
                          {formatDate(optRange.end)}
                        </p>
                      </div>
                      {isSelected && (
                        <Check size={15} className="text-[#00B074] shrink-0" />
                      )}
                    </button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <SummaryCard
          icon={Wallet}
          label="Saldo Atual"
          value="1,200 R$"
          trend="4% (30 days)"
          color="#00B074"
        />
        <SummaryCard
          icon={TargetIcon}
          label="Meta de economia"
          value="61%"
          trend="4% (30 days)"
          color="#2D9CDB"
        />
        <SummaryCard
          icon={CreditCard}
          label="Custos do mês"
          value="623,00 R$"
          trend="4% (30 days)"
          color="#FF5B5B"
        />
        <SummaryCard
          icon={CheckCircle}
          label="Missões concluídas"
          value="12"
          trend="4% (30 days)"
          color="#F2994A"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
        <div className="lg:col-span-4 bg-white p-6 rounded-[20px] shadow-sm">
          <h3 className="text-lg font-bold text-[#464255] mb-6">
            Progresso da Meta
          </h3>
          <div className="flex justify-between items-center px-4">
            {summaryData.map((item) => (
              <div key={item.name} className="flex flex-col items-center gap-2">
                <div className="relative w-20 h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { value: item.value },
                          { value: 100 - item.value },
                        ]}
                        innerRadius={30}
                        outerRadius={40}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                      >
                        <Cell fill={item.color} />
                        <Cell fill="#F8F9FA" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                    {item.value}%
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 uppercase tracking-tight">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 bg-white p-6 rounded-[20px] shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#464255]">
              Histórico de missões
            </h3>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#B9BBBD', fontSize: 10 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#00B074"
                  strokeWidth={4}
                  dot={{
                    r: 4,
                    fill: '#00B074',
                    strokeWidth: 2,
                    stroke: '#fff',
                  }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white p-6 rounded-[20px] shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#464255]">
              Resumo dos gastos
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00B074]" />
                <span className="text-xs text-gray-400">Receitas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FF5B5B]" />
                <span className="text-xs text-gray-400">Gastos</span>
              </div>
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { name: 'Jan', revenue: 100, expenses: 80 },
                  { name: 'Fev', revenue: 150, expenses: 90 },
                  { name: 'Mar', revenue: 120, expenses: 140 },
                  { name: 'Abr', revenue: 180, expenses: 100 },
                  { name: 'Mai', revenue: 200, expenses: 150 },
                  { name: 'Jun', revenue: 180, expenses: 130 },
                  { name: 'Jul', revenue: 250, expenses: 160 },
                  { name: 'Ago', revenue: 220, expenses: 180 },
                  { name: 'Set', revenue: 300, expenses: 200 },
                  { name: 'Out', revenue: 280, expenses: 220 },
                  { name: 'Nov', revenue: 350, expenses: 250 },
                  { name: 'Dez', revenue: 380, expenses: 280 },
                ]}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#B9BBBD', fontSize: 10 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#B9BBBD', fontSize: 10 }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#00B074"
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#FF5B5B"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-6 rounded-[20px] shadow-sm">
          <h3 className="text-lg font-bold text-[#464255] mb-6">
            Por categoria
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#B9BBBD', fontSize: 10 }}
                  dy={10}
                />
                <YAxis hide />
                <Bar
                  dataKey="value"
                  fill="#00B074"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardPage
