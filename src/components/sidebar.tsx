import { useState } from 'react'
import {
  LayoutDashboard,
  ArrowLeftRight,
  Target,
  Store,
  Settings,
  X,
  DollarSign,
  Copy,
  Check,
} from 'lucide-react'
import AppLogo from './app-logo'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: ArrowLeftRight, label: 'Despesas & Receitas', path: '/transacoes' },
  { icon: Target, label: 'Metas & Missões', path: '/metas-missoes' },
  { icon: Store, label: 'Loja & Recompensas', path: '/loja' },
  { icon: Settings, label: 'Configurações', path: '/configuracoes' },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [showQr, setShowQr] = useState(false)

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
            <button
              onClick={() => setShowQr(true)}
              className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors shadow-sm"
            >
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

      {/* QR Code Donation Modal */}
      <AnimatePresence>
        {showQr && <DonationModal onClose={() => setShowQr(false)} />}
      </AnimatePresence>
    </>
  )
}

function DonationModal({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  const pixCode = (import.meta.env.VITE_PIX_CODE as string) || ''

  const handleCopy = () => {
    if (!pixCode) return
    void navigator.clipboard.writeText(pixCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 40 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white rounded-2xl p-10 md:p-12 max-w-md w-full relative z-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] text-center border border-gray-100"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-2xl text-gray-400 hover:bg-gray-100 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="w-16 h-16 bg-gradient-to-br from-[#00B074] to-[#05CD99] rounded-[24px] flex items-center justify-center text-white mx-auto mb-2 shadow-lg shadow-[#00B074]/20 rotate-8">
          <DollarSign size={40} />
        </div>

        <h2 className="text-3xl font-black text-[#464255] mb-3 tracking-tight">
          Energia Extra!
        </h2>
        <p className="text-gray-400 text-sm mb-4 font-medium leading-relaxed">
          Sua doação mantém o MetaHero voando. Aponte a câmera ou copie o código
          abaixo!
        </p>

        <div className="bg-[#F8F9FA] mb-4 flex items-center justify-center relative">
          <img
            src="/qr-code.png"
            alt="QR Code Pix"
            className="w-full aspect-square object-contain relative z-10 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-[#00B074]/5 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="mb-4 text-left">
          <div className="relative flex items-center">
            <input
              readOnly
              value={pixCode}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-md py-4 pl-4 pr-12 text-xs text-[#464255] font-medium focus:outline-none truncate"
            />
            <button
              onClick={handleCopy}
              className={`absolute right-2 p-2.5 rounded-md transition-all ${
                copied
                  ? 'bg-[#00B074] text-white shadow-lg shadow-[#00B074]/30'
                  : 'bg-white text-gray-400 hover:text-[#00B074] border border-gray-100'
              }`}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
          <AnimatePresence>
            {copied && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-[10px] font-bold text-[#00B074] mt-2"
              >
                Código copiado com sucesso!
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#00B074] text-white p-3 rounded-sm font-bold text-lg hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-95"
        >
          Missão Cumprida!
        </button>
      </motion.div>
    </div>
  )
}
