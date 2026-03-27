import { Trophy } from 'lucide-react'
import { STEPS } from '../data'

export default function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      className="py-24 bg-zinc-950 text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        {/* UI mock card */}
        <div className="flex-1 relative">
          <div className="relative w-full max-w-sm mx-auto">
            <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-400">Olá, Edson 👋</p>
                  <p className="text-xl font-bold mt-0.5">Nível 7 · Herói</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <img
                    src="/logo.png"
                    alt=""
                    className="h-9"
                    draggable={false}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Progresso de nível</span>
                  <span className="text-emerald-400 font-bold">
                    2.340 / 3.000 XP
                  </span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full">
                  <div className="h-2 w-[78%] rounded-full bg-emerald-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-800 rounded-2xl p-3">
                  <p className="text-[10px] text-zinc-400 mb-0.5">
                    Meta do mês
                  </p>
                  <p className="font-bold text-sm text-emerald-400">
                    R$ 800 / 1.000
                  </p>
                  <div className="h-1 bg-zinc-700 rounded-full mt-2">
                    <div className="h-1 w-4/5 bg-emerald-500 rounded-full" />
                  </div>
                </div>
                <div className="bg-zinc-800 rounded-2xl p-3">
                  <p className="text-[10px] text-zinc-400 mb-0.5">MetaCoins</p>
                  <p className="font-bold text-sm text-amber-400">⚡ 1.250</p>
                  <p className="text-[10px] text-zinc-500 mt-1">+120 hoje</p>
                </div>
              </div>

              <div className="bg-zinc-800 rounded-2xl p-3">
                <p className="text-xs text-zinc-400 mb-2">
                  Conquistas recentes
                </p>
                <div className="flex gap-2 text-lg">
                  {['🏆', '⚡', '🎯', '💰', '🔥'].map((b) => (
                    <span key={b}>{b}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -top-5 -right-5 bg-emerald-500 text-zinc-950 text-xs font-bold px-3 py-2 rounded-xl shadow-lg flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" /> Meta alcançada!
            </div>
          </div>
        </div>

        {/* copy */}
        <div className="flex-1 space-y-8">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Como funciona
          </span>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight">
            SISTEMA PARA
            <br />
            <span className="text-emerald-400">EVOLUÇÃO</span>
            <br />
            FINANCEIRA
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
            MetaHero entrega a base completa para construir disciplina
            financeira de forma natural e motivadora — sem a frieza dos
            aplicativos tradicionais.
          </p>

          <div className="space-y-4">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-4 items-start">
                <span className="text-3xl font-black text-emerald-500/30 leading-none tabular-nums w-10 shrink-0">
                  {s.n}
                </span>
                <div>
                  <p className="font-bold text-white">{s.t}</p>
                  <p className="text-zinc-400 text-sm mt-0.5">{s.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-6">
            <div>
              <p className="text-3xl font-black text-emerald-400">35+</p>
              <p className="text-xs text-zinc-400">Conquistas desbloqueáveis</p>
            </div>
            <div className="w-px bg-zinc-700" />
            <div>
              <p className="text-3xl font-black text-emerald-400">2M+</p>
              <p className="text-xs text-zinc-400">
                Metas criadas na plataforma
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
