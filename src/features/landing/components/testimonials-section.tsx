import { Star } from 'lucide-react'
import { TESTIMONIALS } from '../data'

export default function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-24 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Depoimentos
          </span>
          <h2 className="mt-2 text-4xl sm:text-5xl font-black leading-tight">
            CONFIADO POR
            <br />
            QUEM EVOLUIU
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7 space-y-4 hover:border-emerald-500/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
