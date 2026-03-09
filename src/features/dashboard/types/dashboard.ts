export type DashboardSummary = {
  userName: string
  currentBalance: number
  savingsGoal: number
  monthlyCosts: number
  completedMissions: number
}

export type DashboardChartItem = {
  name: string
  value: number
}

export type GoalProgressItem = {
  name: string
  value: number
  color: string
}

export type ExpensesSummaryItem = {
  name: string
  revenue: number
  expenses: number
}

export type DashboardData = {
  summary: DashboardSummary
  goalProgress: GoalProgressItem[]
  missionHistory: DashboardChartItem[]
  expensesSummary: ExpensesSummaryItem[]
  byCategory: DashboardChartItem[]
}

export type GetDashboardParams = {
  startDate?: string
  endDate?: string
}

export type PeriodOption = {
  label: string
  getRange: () => { start: Date; end: Date }
}
