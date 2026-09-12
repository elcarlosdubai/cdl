"use client";

import { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import lecturasData from '../../../data/lecturas.json';

export default function LecturaDetalle({ params }: { params: Promise<{ id: string }> }) {
  // En Next.js 15+ necesitamos "desempacar" los params con use()
  const resolvedParams = use(params);
  const capitulo = lecturasData.find((c) => c.id === resolvedParams.id);

  // Estado para saber qué unidad está activa
  const [unidadActiva, setUnidadActiva] = useState(0);

  if (!capitulo) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-blue-500/30 flex flex-col">
      
      {/* Navbar Superior */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl shrink-0">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/lecturas" className="text-sm font-medium text-zinc-400 hover:text-white transition flex items-center gap-2">
            <span>&larr;</span> Volver a la Biblioteca
          </Link>
          <div className="font-bold tracking-tighter text-zinc-500 hidden sm:block">
            Módulo: <span className="text-white">{capitulo.titulo}</span>
          </div>
        </div>
      </nav>

      {/* Diseño de 2 Columnas (Sidebar y Contenido) */}
      <div className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full">
        
        {/* SIDEBAR: Menú de Unidades (Solo Desktop) */}
        <aside className="hidden md:block w-80 shrink-0 border-r border-white/5 py-8 pr-8">
          <div className="sticky top-24">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-4xl">{capitulo.icono}</span>
              <h2 className="text-xl font-bold text-white leading-tight">{capitulo.titulo}</h2>
            </div>
            
            <nav className="space-y-2">
              {capitulo.secciones.map((seccion, index) => {
                const isActive = index === unidadActiva;
                return (
                  <button
                    key={index}
                    onClick={() => setUnidadActiva(index)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium ${
                      isActive 
                        ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                        : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200 border border-transparent'
                    }`}
                  >
                    {seccion.subtitulo}
                  </button>
                );
              })}
            </nav>

            <div className="mt-12 pt-8 border-t border-white/5">
              <Link href="/test" className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-colors text-sm font-bold">
                Ir al Simulador &rarr;
              </Link>
            </div>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-grow py-6 px-4 md:py-8 md:px-12 w-full">
          
          {/* Menú móvil (Dropdown Nativo) */}
          <div className="md:hidden mb-8 sticky top-16 z-40 bg-black/90 pb-4 pt-2 border-b border-white/5">
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
              Seleccionar Unidad:
            </label>
            <div className="relative">
              <select 
                value={unidadActiva}
                onChange={(e) => setUnidadActiva(Number(e.target.value))}
                className="w-full appearance-none bg-zinc-900 border border-white/10 text-white py-3 px-4 rounded-xl font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                {capitulo.secciones.map((seccion, index) => (
                  <option key={index} value={index}>
                    {seccion.subtitulo}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <article className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500" key={unidadActiva}>
            <h1 className="text-2xl md:text-5xl font-extrabold text-white mb-6 md:mb-8 tracking-tight leading-tight">
              {capitulo.secciones[unidadActiva].subtitulo}
            </h1>
            
            <div 
              className="prose prose-invert prose-blue prose-lg max-w-none text-zinc-300 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: capitulo.secciones[unidadActiva].contenido }}
            />

            <div className="mt-12 bg-emerald-900/20 border border-emerald-500/30 p-8 rounded-2xl text-center">
              <h3 className="text-xl font-bold text-white mb-2">¿Entendiste bien esta unidad?</h3>
              <p className="text-zinc-400 mb-6">Pon a prueba tu conocimiento con un Mini-Test de 5 preguntas exclusivamente sobre la Unidad {unidadActiva + 1}.</p>
              <Link href={`/test/${capitulo.id}?unidad=${unidadActiva}`} className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-900/50">
                📝 Tomar Mini-Test de la Unidad {unidadActiva + 1}
              </Link>
            </div>

            {/* Controles de Navegación Abajo */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-8 pt-8 border-t border-white/10">
              <button 
                onClick={() => {
                  setUnidadActiva(Math.max(0, unidadActiva - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={unidadActiva === 0}
                className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-medium text-zinc-400 border border-white/5 hover:text-white disabled:opacity-30 disabled:border-transparent transition-colors"
              >
                &larr; Anterior
              </button>
              <button 
                onClick={() => {
                  setUnidadActiva(Math.min(capitulo.secciones.length - 1, unidadActiva + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={unidadActiva === capitulo.secciones.length - 1}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors disabled:opacity-30 disabled:bg-white/5"
              >
                Siguiente Unidad &rarr;
              </button>
            </div>
          </article>
        </main>

      </div>
    </div>
  );
}
