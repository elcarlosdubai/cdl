export default function Home() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-blue-500/30">
      
      {/* Navbar / Header (Minimalist) */}
      <nav className="fixed w-full z-50 top-0 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
            CDL<span className="text-zinc-500">Master</span>
          </div>
          <div className="text-sm font-medium text-zinc-400 hover:text-white transition cursor-pointer">
            Iniciar Sesión
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-32">
        
        {/* Hero Section */}
        <section className="text-center space-y-8 max-w-4xl mx-auto relative">
          {/* Luces de neón de fondo (Glow effects) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-zinc-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Plataforma 100% Gratuita
          </div>
          
          <h1 className="relative z-10 text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Aprueba tu CDL con <br className="hidden md:block"/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
              Confianza Absoluta
            </span>
          </h1>
          
          <p className="relative z-10 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Abandona los manuales aburridos. Prepárate con simuladores interactivos, retroalimentación instantánea y lecturas optimizadas para tu examen.
          </p>
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
              Comenzar Simulador
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-colors duration-300">
              Explorar Lecturas
            </button>
          </div>
        </section>

        {/* Bento Box Layout for Content */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          
          {/* Main Large Card (Bento span 2) */}
          <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-zinc-900/40 border border-white/10 p-8 hover:bg-zinc-900/60 transition-colors backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 transition-opacity group-hover:opacity-100 opacity-0 duration-500"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 border border-blue-500/30">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Lecturas Optimizadas</h3>
              <p className="text-zinc-400 max-w-md mb-8 leading-relaxed">
                Teoría estructurada y directa al grano. Conocimientos generales, frenos de aire y vehículos de combinación. Sin relleno.
              </p>
              <button className="flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-blue-300">
                Ver todos los módulos <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>

          {/* Small Card */}
          <div className="group relative overflow-hidden rounded-3xl bg-zinc-900/40 border border-white/10 p-8 hover:bg-zinc-900/60 transition-colors backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 transition-opacity group-hover:opacity-100 opacity-0 duration-500"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/30">
                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Simuladores Reales</h3>
              <p className="text-zinc-400 mb-8 flex-grow leading-relaxed">
                Exámenes interactivos diseñados con la misma estructura que pide el DMV.
              </p>
              <button className="flex items-center gap-2 text-sm font-semibold text-emerald-400 group-hover:text-emerald-300 mt-auto">
                Practicar ahora <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>

          {/* Test Categories (Bottom Row of Bento) */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            {[
              { title: "Test General", desc: "50 Preguntas" },
              { title: "Frenos de Aire", desc: "25 Preguntas" },
              { title: "Combinación", desc: "20 Preguntas" }
            ].map((test, i) => (
              <div key={i} className="group cursor-pointer rounded-3xl bg-white/[0.02] border border-white/5 p-6 hover:bg-white/[0.05] hover:border-white/15 transition-all">
                <div className="flex justify-between items-center mb-12">
                  <span className="text-xs font-mono font-medium text-zinc-500 uppercase tracking-wider">{test.desc}</span>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform bg-white/5">
                    <svg className="w-4 h-4 text-zinc-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-zinc-300 group-hover:text-white transition-colors">{test.title}</h4>
              </div>
            ))}
          </div>

        </section>
      </main>
    </div>
  );
}
