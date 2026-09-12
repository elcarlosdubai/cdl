import Link from 'next/link';
import lecturasData from '../../data/lecturas.json';

export default function LecturasMenuPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-blue-500/30">
      
      {/* Navbar Minimalista */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tighter flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400"></div>
            CDL<span className="text-zinc-500">Master</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-white transition flex items-center gap-2">
            <span>&larr;</span> Volver al inicio
          </Link>
        </div>
      </nav>

      <main className="py-20 px-6 max-w-6xl mx-auto space-y-16">
        
        {/* Encabezado */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Biblioteca de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Estudio</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Selecciona el módulo que deseas estudiar hoy. Todo el conocimiento necesario para tu CDL, optimizado para que lo memorices rápido.
          </p>
        </header>

        {/* Cuadrícula de Capítulos (Menu) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {lecturasData.map((capitulo) => (
            <Link key={capitulo.id} href={`/lecturas/${capitulo.id}`} className="group block">
              <div className="h-full rounded-3xl bg-zinc-900/40 border border-white/10 p-8 hover:bg-zinc-900/80 hover:border-white/20 transition-all duration-300 backdrop-blur-sm flex flex-col">
                
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl shadow-inner mb-6 group-hover:scale-110 transition-transform duration-300">
                  {capitulo.icono}
                </div>
                
                <h2 className="text-2xl font-bold text-white tracking-tight mb-3 group-hover:text-blue-400 transition-colors">
                  {capitulo.titulo}
                </h2>
                
                <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                  {capitulo.resumen}
                </p>

                <div className="flex items-center justify-between text-sm font-bold text-blue-500 mt-auto pt-4 border-t border-white/5">
                  <span>Entrar a leer</span>
                  <span className="text-xl group-hover:translate-x-2 transition-transform">&rarr;</span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </main>

      <footer className="border-t border-white/5 py-10 text-center">
        <p className="text-zinc-500 text-sm">© 2026 Preparación CDL Master.</p>
      </footer>
    </div>
  );
}
