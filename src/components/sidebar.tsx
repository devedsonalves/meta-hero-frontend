import {
  LayoutDashboard,
  ArrowLeftRight,
  Target,
  BarChart3,
  Store,
  Settings,
  X,
} from 'lucide-react'
import AppLogo from './app-logo'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: ArrowLeftRight, label: 'Despesas & Receitas', path: '/transacoes' },
  { icon: Target, label: 'Metas & Missões', path: '/metas' },
  { icon: BarChart3, label: 'Relatórios & Gráficos', path: '/relatorios' },
  { icon: Store, label: 'Loja/Recompensas', path: '/loja' },
  { icon: Settings, label: 'Configurações', path: '/configuracoes' },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigate = (path: string) => {
    void navigate(path)
    onClose?.()
  }

  const SidebarContent = () => (
    <div className="w-72 bg-white h-screen flex flex-col shadow-sm relative">
      <div className="p-6 flex items-center justify-between">
        <AppLogo />
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-6 space-y-4 mt-4 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <div key={item.label} className="relative">
              {isActive && (
                <span className="absolute -left-7 top-1/2 -translate-y-1/2 w-2 h-8 bg-[#00B074] rounded-full" />
              )}
              <button
                onClick={() => handleNavigate(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#00B074]/10 text-[#00B074]'
                    : 'text-zinc-700 hover:bg-gray-50'
                }`}
              >
                <item.icon size={22} color={isActive ? '#00B074' : '#3f3f46'} />
                <span className={isActive ? 'font-bold' : 'font-medium'}>
                  {item.label}
                </span>
              </button>
            </div>
          )
        })}
      </nav>

      <div className="p-6 mt-auto">
        <div className="bg-[#00B074] rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-sm opacity-90">Seja um herói também, apoie o</p>
            <p className="font-bold mb-4">MetaHero</p>
            <button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm">
              Doar Energia
            </button>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] w-32 h-32 opacity-40 transform rotate-12">
            <img
              src="/logo.png"
              alt="Mascot"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className="hidden lg:block fixed left-0 top-0 h-screen z-30">
        <SidebarContent />
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed left-0 top-0 h-screen z-50 lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
