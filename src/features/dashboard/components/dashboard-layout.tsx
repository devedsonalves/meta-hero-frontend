import useAuthStore from '@/store/auth-store'
import Sidebar from '../../../components/sidebar'
import { Search, Bell, User, ChevronDown, LogOut, Menu } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/features/login/services/auth-service'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuthStore()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await logout()
    window.location.href = '/entrar'
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main content — offset on desktop to account for fixed sidebar */}
      <main className="flex-1 lg:ml-72 min-w-0">
        <header className="h-16 lg:h-20 bg-white w-full flex items-center justify-between px-4 lg:px-8 shadow-sm sticky top-0 z-20">
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors mr-2"
            aria-label="Abrir menu"
          >
            <Menu size={22} />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-xs lg:max-w-xl">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="O que busca?"
                className="w-full bg-[#F8F9FA] rounded-xl py-2 lg:py-2.5 pl-9 pr-4 outline-none border border-transparent focus:border-[#00B074]/30 transition-all text-sm"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 lg:gap-6 ml-2 lg:ml-0">
            {/* XP / Coins — hidden on small screens */}
            <div className="hidden md:flex items-center gap-4 bg-[#F8F9FA] px-4 py-2 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                  XP
                </div>
                <span className="text-sm font-bold text-[#464255]">9/1000</span>
              </div>
              <div className="w-px h-4 bg-gray-300" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                  $
                </div>
                <span className="text-sm font-bold text-[#464255]">215</span>
              </div>
            </div>

            {/* Bell */}
            <button className="relative w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center bg-white rounded-xl border border-gray-100 text-gray-400">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>

            {/* User menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 lg:gap-3 p-1.5 rounded-2xl transition-all cursor-pointer border border-transparent"
              >
                <div className="text-right hidden xl:block">
                  <p className="text-sm font-bold text-[#464255]">
                    {user?.name}
                  </p>
                  <p className="text-[10px] text-gray-400">{user?.email}</p>
                </div>
                <div className="w-9 h-9 lg:w-10 lg:h-10 bg-[#00B074]/10 rounded-xl flex items-center justify-center text-[#00B074]">
                  <User size={20} />
                </div>
                <ChevronDown
                  size={14}
                  className={`text-gray-400 transition-transform duration-200 hidden sm:block ${
                    isUserMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-50 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                        <User size={20} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-[#464255] truncate">
                          {user?.name}
                        </p>
                        <p className="text-[10px] text-gray-400 truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    <div className="p-1">
                      <button
                        onClick={() => void navigate('/perfil')}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#464255] hover:bg-[#00B074]/5 hover:text-[#00B074] rounded-lg transition-colors group"
                      >
                        <User
                          size={18}
                          className="text-gray-400 group-hover:text-[#00B074]"
                        />
                        <span>Ver Perfil</span>
                      </button>

                      <button
                        onClick={() => void handleLogout()}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors group"
                      >
                        <LogOut
                          size={18}
                          className="text-red-400 group-hover:text-red-500"
                        />
                        <span>Sair da conta</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
