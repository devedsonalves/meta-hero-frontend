import { type LucideIcon } from 'lucide-react'

interface SummaryCardProps {
  icon: LucideIcon
  label: string
  value: string
  trend: string
  color: string
}

export function SummaryCard({
  icon: Icon,
  label,
  value,
  trend,
  color,
}: SummaryCardProps) {
  return (
    <div className="bg-white p-6 rounded-[20px] flex items-center gap-5 shadow-sm">
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center`}
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon size={28} color={color} />
      </div>
      <div>
        <p className="text-[#464255] font-bold text-xl">{value}</p>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-[10px] mt-1">
          <span className="text-[#00B074] font-bold">{trend}</span>{' '}
          <span className="text-gray-300">(30 days)</span>
        </p>
      </div>
    </div>
  )
}
