import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { BADGES } from '../data'

const BENEFITS = [
  'Ganhe XP a cada meta alcançada',
  'Desbloqueie badges pelo seu progresso',
  'Suba de nível e receba recompensas',
  'Missões diárias para manter o ritmo',
]

export default function AchievementsSection() {
  return (
    <section id="conquistas" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        {/* copy */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">
            Sistema de conquistas
          </span>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-zinc-900">
            CADA META
            <br />
            CUMPRIDA,
            <br />
            <span className="text-emerald-500">UMA VITÓRIA</span>
            <br />
            REAL.
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
            O MetaHero reconhece cada avanço da sua jornada. Ganhe badges
            exclusivos, acumule XP e construa um histórico de disciplina
            financeira que você vai querer mostrar.
          </p>
          <ul className="space-y-2 text-sm text-zinc-600">
            {BENEFITS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 justify-center lg:justify-start"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{' '}
                {item}
              </li>
            ))}
          </ul>
          <Link
            to="/registro"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white font-bold text-sm hover:bg-zinc-700 transition-colors"
          >
            Começar minha jornada <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* badges grid */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {BADGES.map((b) => (
            <div
              key={b.label}
              className={`flex flex-col items-center text-center gap-2 p-5 rounded-2xl border ${b.bg} ${b.border} hover:-translate-y-1 transition-transform`}
            >
              <span className="text-3xl">{b.icon}</span>
              <p className={`text-xs font-bold ${b.text}`}>{b.label}</p>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                {b.xp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
