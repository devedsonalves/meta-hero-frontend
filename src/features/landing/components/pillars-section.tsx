import { Flame, Shield, Coins, Swords, Target, Lock } from 'lucide-react'

const PILLARS = [
  {
    icon: <Flame className="w-5 h-5" />,
    title: 'Gamificação real',
    desc: 'XP, níveis e conquistas integrados ao seu progresso financeiro.',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Privacidade total',
    desc: 'Sem acesso bancário. Você registra manualmente e controla tudo.',
  },
  {
    icon: <Coins className="w-5 h-5" />,
    title: 'Moedas virtuais',
    desc: 'Acumule MetaCoins e troque por recompensas exclusivas.',
  },
  {
    icon: <Swords className="w-5 h-5" />,
    title: 'Missões diárias',
    desc: 'Desafios que constroem hábitos financeiros de forma natural.',
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: 'Metas visuais',
    desc: 'Barras, gráficos e marcos claros para cada objetivo definido.',
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: 'Conquistas exclusivas',
    desc: 'Badges desbloqueáveis que celebram cada vitória da sua jornada.',
  },
]

export default function PillarsSection() {
  return (
    <section className="py-20 bg-zinc-50 border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">
            Por que MetaHero
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black text-zinc-900">
            POTENCIAL TOTAL DO SEU DINHEIRO
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="group flex items-start gap-4 bg-white rounded-2xl p-5 border border-zinc-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50 transition-all"
            >
              <div className="mt-0.5 w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 group-hover:bg-emerald-100 transition-colors">
                {p.icon}
              </div>
              <div>
                <p className="font-bold text-sm text-zinc-900">{p.title}</p>
                <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
