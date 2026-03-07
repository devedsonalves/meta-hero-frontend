import { Link } from 'react-router-dom'

const PLATFORM_LINKS = [
  'Funcionalidades',
  'Como funciona',
  'Conquistas',
  'Missões diárias',
]
const LEGAL_LINKS = ['Privacidade', 'Termos de uso', 'Contato']
const ACCOUNT_LINKS = [
  { label: 'Criar conta', to: '/registro' },
  { label: 'Entrar', to: '/entrar' },
]

export default function LandingFooter() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        <div className="space-y-3 lg:col-span-1">
          <div className="flex items-center gap-2 select-none">
            <img
              src="/logo.png"
              alt="MetaHero"
              className="h-9"
              draggable={false}
            />
            <span className="logo font-extrabold text-base text-white">
              Meta Hero<span className="text-emerald-500">.</span>
            </span>
          </div>
          <p className="text-zinc-500 text-xs leading-relaxed">
            Organizando finanças e transformando disciplina em uma jornada
            gamificada de evolução pessoal.
          </p>
        </div>

        <div>
          <p className="font-bold text-white mb-3 text-xs uppercase tracking-wider">
            Plataforma
          </p>
          <ul className="space-y-2 text-zinc-500 text-xs">
            {PLATFORM_LINKS.map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-zinc-200 transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-bold text-white mb-3 text-xs uppercase tracking-wider">
            Conta
          </p>
          <ul className="space-y-2 text-zinc-500 text-xs">
            {ACCOUNT_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="hover:text-zinc-200 transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-bold text-white mb-3 text-xs uppercase tracking-wider">
            Legal
          </p>
          <ul className="space-y-2 text-zinc-500 text-xs">
            {LEGAL_LINKS.map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-zinc-200 transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-5 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-600">
        <p>
          © {new Date().getFullYear()} MetaHero. Todos os direitos reservados.
        </p>
        <p>Feito com 💚 para heróis financeiros</p>
      </div>
    </footer>
  )
}
