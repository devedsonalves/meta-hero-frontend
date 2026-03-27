import { Target, TrendingUp, Trophy, Zap } from 'lucide-react'
import { FEATURES } from '../data'

const ICONS = [
  <Target key="target" className="w-5 h-5 text-emerald-600" />,
  <TrendingUp key="trending" className="w-5 h-5 text-emerald-600" />,
  <Trophy key="trophy" className="w-5 h-5 text-emerald-600" />,
  <Zap key="zap" className="w-5 h-5 text-emerald-600" />,
]

export default function FeaturesSection() {
  return (
    <section id="funcionalidades" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">
            Funcionalidades
          </span>
          <h2 className="mt-2 text-4xl sm:text-5xl font-black leading-tight text-zinc-900">
            IMPULSIONANDO A<br />
            PRÓXIMA VERSÃO DE VOCÊ
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={f.num}
              className={`group relative rounded-3xl border border-zinc-100 p-8 overflow-hidden hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-50/60 transition-all duration-300 ${
                i % 2 === 0 ? 'bg-zinc-50' : 'bg-emerald-600 text-white'
              }`}
            >
              <span
                className={`absolute bottom-3 right-6 text-8xl font-black select-none leading-none ${
                  i % 2 === 0 ? 'text-zinc-900/5' : 'text-white/10'
                }`}
              >
                {f.num}
              </span>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${
                  i % 2 === 0 ? 'bg-emerald-100' : 'bg-white/10'
                }`}
              >
                {ICONS[i]}
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${i % 2 === 0 ? 'text-zinc-900' : 'text-white'}`}
              >
                {f.title}
              </h3>
              <p
                className={`text-sm leading-relaxed max-w-xs ${i % 2 === 0 ? 'text-zinc-500' : 'text-emerald-100'}`}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
