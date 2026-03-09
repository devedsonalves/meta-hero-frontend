import { useState, useRef, useEffect } from 'react'
import { periodOptions } from '../utils'
import type { PeriodOption } from '../types/dashboard'
import { useDashboard } from './use-dashboard'

export function useDashboardData() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0])
  const filterRef = useRef<HTMLDivElement>(null)

  const range = selectedPeriod.getRange()

  const { data, isLoading } = useDashboard({
    startDate: range.start.toISOString(),
    endDate: range.end.toISOString(),
  })

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

  const summaryData = data?.goalProgress || []
  const lineData = data?.missionHistory || []
  const expensesData = data?.expensesSummary || []
  const barData = data?.byCategory || []
  const summary = data?.summary || {
    userName: 'Usuário',
    currentBalance: 0,
    savingsGoal: 0,
    monthlyCosts: 0,
    completedMissions: 0,
  }

  return {
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
  }
}
