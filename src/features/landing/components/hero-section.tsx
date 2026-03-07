import { Link } from 'react-router-dom'
import { Zap, ArrowRight, CheckCircle2 } from 'lucide-react'
import { STATS } from '../data'

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-zinc-50 border-b border-zinc-100"
    >
      {/* dots grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #10b981 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* watermark text */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 overflow-hidden select-none">
        <p className="text-[clamp(80px,18vw,220px)] font-black text-zinc-900/4 leading-none tracking-tighter whitespace-nowrap">
          META HERO
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10 lg:pt-24 lg:pb-14 flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
        {/* copy */}
        <div className="flex-1 z-10 text-center lg:text-left space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
            Gamificação financeira pessoal
          </div>

          <h1 className="text-[clamp(36px,6vw,72px)] font-black leading-none tracking-tight text-zinc-900">
            FINANÇAS
            <br />
            <span className="text-emerald-500">TRANSFORMADAS</span>
            <br />
            EM EVOLUÇÃO.
          </h1>

          <p className="text-zinc-500 text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
            MetaHero não é só um app financeiro — é uma jornada. Defina metas,
            registre seu progresso, ganhe XP e descubra o que você é capaz de
            conquistar.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
            <Link
              to="/registro"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-zinc-900 text-white font-bold text-sm hover:bg-zinc-700 transition-colors shadow-lg"
            >
              Começar gratuitamente
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/entrar"
              className="w-full sm:w-auto flex items-center justify-center px-7 py-3.5 rounded-full border-2 border-zinc-200 text-zinc-600 font-medium text-sm hover:border-zinc-900 hover:text-zinc-900 transition-colors"
            >
              Já tenho conta
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-5 justify-center lg:justify-start text-xs text-zinc-400">
            {[
              'Sem cartão de crédito',
              'Dados 100% privados',
              'Grátis para começar',
            ].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {t}
              </span>
            ))}
          </div>
        </div>

        {/* mascot + floating cards */}
        <div className="relative flex-1 flex items-end justify-center lg:justify-end">
          {/* XP badge */}
          <div className="absolute top-0 right-4 sm:right-16 lg:right-8 z-20 bg-white rounded-2xl shadow-xl border border-zinc-100 px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <Zap className="w-4 h-4 text-emerald-600 fill-emerald-500" />
            </div>
            <div>
              <p className="text-xs text-zinc-400 font-normal">Nível atual</p>
              <p className="text-zinc-900 font-bold text-sm">Herói Iniciante</p>
            </div>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              +240 XP
            </span>
          </div>

          <img
            src="/logo.png"
            alt="MetaHero mascote"
            draggable={false}
            className="relative z-10 w-64 sm:w-80 lg:w-96 drop-shadow-[0_30px_50px_rgba(0,0,0,0.12)] select-none"
          />

          {/* meta progress card */}
          <div className="absolute bottom-4 left-4 sm:left-8 lg:left-2 z-20 bg-white rounded-2xl shadow-xl border border-zinc-100 p-4 w-52">
            <p className="text-[10px] text-zinc-400 font-medium mb-1.5">
              Meta ativa
            </p>
            <p className="font-bold text-sm text-zinc-900 mb-3">
              Reserva de emergência
            </p>
            <div className="w-full h-1.5 bg-zinc-100 rounded-full">
              <div className="h-1.5 w-[68%] rounded-full bg-emerald-500" />
            </div>
            <div className="flex justify-between mt-1.5 text-[10px] text-zinc-400">
              <span>R$ 6.800</span>
              <span className="text-emerald-600 font-bold">68%</span>
              <span>R$ 10.000</span>
            </div>
          </div>
        </div>
      </div>

      {/* stats strip */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm"
          >
            <p className="text-2xl font-black text-emerald-500">{s.value}</p>
            <p className="text-xs text-zinc-400 mt-0.5 font-medium">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
