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
import { motion, AnimatePresence } from 'framer-motion'
import { formatDate, toBRL, periodOptions } from '../utils'
import { useDashboardData } from '../hooks/use-dashboard-data'
import { useNavigate } from 'react-router-dom'

function DashboardPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate()
  const {
    isFilterOpen,
    setIsFilterOpen,
    selectedPeriod,
    filterRef,
    range,
    isLoading,
    handleSelectPeriod,
    summaryData,
    lineData,
    expensesData,
    barData,
    summary,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    goals,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    missions,
  } = useDashboardData()

  return (
    <DashboardLayout>
      <div className="mb-6 lg:mb-8 flex flex-wrap justify-between items-end gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[#464255]">
            Dashboard
          </h1>
          <p className="text-gray-400 text-sm">
            Oi, {summary.userName}. Bem vindo de volta!
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

      {isLoading ? (
        <div className="flex h-64 items-center justify-center text-gray-400">
          Carregando dashboard...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <SummaryCard
              icon={Wallet}
              label="Saldo Atual"
              value={toBRL(summary.currentBalance)}
              trend=""
              color="#00B074"
            />
            <SummaryCard
              icon={TargetIcon}
              label="Meta de economia"
              value={`${summary.savingsGoal}%`}
              trend=""
              color="#2D9CDB"
            />
            <SummaryCard
              icon={CreditCard}
              label="Custos do mês"
              value={toBRL(summary.monthlyCosts)}
              trend=""
              color="#FF5B5B"
            />
            <SummaryCard
              icon={CheckCircle}
              label="Missões concluídas"
              value={String(summary.completedMissions)}
              trend=""
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
                  <div
                    key={item.name}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="relative w-20 h-20">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { value: item.value },
                              {
                                value:
                                  100 - item.value > 0 ? 100 - item.value : 0,
                              },
                            ]}
                            innerRadius={30}
                            outerRadius={40}
                            startAngle={90}
                            endAngle={-270}
                            dataKey="value"
                            stroke="none"
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
                  <LineChart data={expensesData}>
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
                      name="Receitas"
                      stroke="#00B074"
                      strokeWidth={3}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      name="Gastos"
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
                    <Tooltip />
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
        </>
      )}
    </DashboardLayout>
  )
}

export default DashboardPage
