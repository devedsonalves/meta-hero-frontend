import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import AppLogo from '@/components/app-logo'

const NAV_ITEMS = [
  'Funcionalidades',
  'Como funciona',
  'Conquistas',
  'Depoimentos',
]

export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#inicio" className="select-none">
          <AppLogo />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-zinc-500">
          {NAV_ITEMS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s/g, '-')}`}
              className="hover:text-zinc-900 transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <Link
            to="/entrar"
            className="hidden sm:block font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            Entrar
          </Link>
          <Link
            to="/registro"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-900 text-white font-semibold text-sm hover:bg-zinc-700 transition-colors"
          >
            Começar grátis
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  )
}
