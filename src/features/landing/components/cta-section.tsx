import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function CtaSection() {
  return (
    <section className="py-28 bg-emerald-500 relative overflow-hidden">
      {/* watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden">
        <p className="text-[clamp(60px,16vw,180px)] font-black text-white/10 leading-none tracking-tighter whitespace-nowrap">
          META HERO
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center space-y-6">
        <img
          src="/logo.png"
          alt=""
          className="h-24 mx-auto select-none drop-shadow-xl"
          draggable={false}
        />

        <h2 className="text-4xl sm:text-5xl font-black text-zinc-900 leading-tight">
          SUA JORNADA
          <br />
          FINANCEIRA
          <br />
          COMEÇA AGORA.
        </h2>

        <p className="text-zinc-800 text-sm max-w-md mx-auto leading-relaxed">
          Crie sua conta gratuitamente, defina sua primeira meta e comece a
          transformar disciplina financeira em evolução pessoal.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/registro"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-zinc-900 text-white font-bold text-sm hover:bg-zinc-700 transition-colors shadow-lg"
          >
            Criar conta grátis <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/entrar"
            className="w-full sm:w-auto flex items-center justify-center px-7 py-3.5 rounded-full border-2 border-zinc-900/30 text-zinc-800 font-medium text-sm hover:bg-zinc-900/10 transition-colors"
          >
            Já tenho uma conta
          </Link>
        </div>
      </div>
    </section>
  )
}
