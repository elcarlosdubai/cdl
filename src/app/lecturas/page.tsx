import Link from 'next/link';
import lecturasData from '../../data/lecturas.json';

export default function LecturasPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-blue-500/30">
      
      {/* Navbar Minimalista */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tighter flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400"></div>
            CDL<span className="text-zinc-500">Master</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-white transition flex items-center gap-2">
            <span>&larr;</span> Volver al inicio
          </Link>
        </div>
      </nav>

      <main className="py-16 px-6 max-w-4xl mx-auto space-y-16">
        
        {/* Encabezado */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Lecturas <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Optimizadas</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Hemos resumido los manuales oficiales utilizando Inteligencia Artificial. Lee la información exacta que necesitas saber para aprobar, sin rellenos.
          </p>
        </header>

        {/* Lista de Capítulos */}
        <div className="space-y-12">
          {lecturasData.map((capitulo) => (
            <section key={capitulo.id} className="relative group">
              {/* Tarjeta contenedora del capítulo */}
              <div className="rounded-3xl bg-zinc-900/40 border border-white/10 p-6 md:p-10 backdrop-blur-sm relative z-10 overflow-hidden">
                
                {/* Cabecera del capítulo */}
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/5">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl shadow-inner">
                    {capitulo.icono}
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{capitulo.titulo}</h2>
                    <p className="text-zinc-400 text-sm md:text-base mt-1">{capitulo.resumen}</p>
                  </div>
                </div>

                {/* Secciones internas */}
                <div className="space-y-8">
                  {capitulo.secciones.map((seccion, index) => (
                    <article key={index} className="pl-4 border-l-2 border-blue-500/30 group-hover:border-blue-500/60 transition-colors">
                      <h3 className="text-xl font-bold text-zinc-200 mb-3">{seccion.subtitulo}</h3>
                      <p className="text-zinc-400 leading-relaxed text-lg">
                        {seccion.contenido}
                      </p>
                    </article>
                  ))}
                </div>

                {/* Botón simular test al final del capítulo */}
                <div className="mt-10 pt-6 flex justify-end">
                  <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold rounded-xl transition-all flex items-center gap-2 text-sm">
                    Practicar este módulo <span>&rarr;</span>
                  </button>
                </div>

              </div>
            </section>
          ))}
        </div>

      </main>

      <footer className="border-t border-white/5 py-10 text-center">
        <p className="text-zinc-500 text-sm">© 2026 Preparación CDL Master.</p>
      </footer>
    </div>
  );
}
